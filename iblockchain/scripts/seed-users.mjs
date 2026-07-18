import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hyrodmaqgtsxdkmxjypa.supabase.co";
const serviceKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cm9kbWFxZ3RzeGRrbXhqeXBhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDM0MjAwMCwiZXhwIjoyMDk5OTE4MDAwfQ.EP8MkFdASRKmuOZuLZNvHfXOUEgHjmhLjS9ooP2OK_k";
const supabase = createClient(supabaseUrl, serviceKey);

const users = [
  { email: "super@iblockone.com", password: "Test@123456", fullName: "Super Admin", role: "super_admin" },
  { email: "admin1@iblockone.com", password: "Test@123456", fullName: "Admin One", role: "admin" },
  { email: "admin2@iblockone.com", password: "Test@123456", fullName: "Admin Two", role: "admin" },
  { email: "user.full@iblockone.com", password: "Test@123456", fullName: "User Full Access", role: "user" },
  { email: "user.kyc@iblockone.com", password: "Test@123456", fullName: "User KYC Pending", role: "user" },
  { email: "user.locked@iblockone.com", password: "Test@123456", fullName: "User Withdrawal Locked", role: "user" },
  { email: "user.premium@iblockone.com", password: "Test@123456", fullName: "User Premium", role: "user" },
  { email: "user.basic@iblockone.com", password: "Test@123456", fullName: "User Basic", role: "user" },
  { email: "user.new@iblockone.com", password: "Test@123456", fullName: "User New", role: "user" },
  { email: "user.vip@iblockone.com", password: "Test@123456", fullName: "User VIP", role: "user" },
];

async function seed() {
  console.log("Creating users...\n");
  for (const u of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: { full_name: u.fullName, phone: "+1234567890" },
    });
    if (error) {
      console.error(`✗ ${u.email}: ${error.message}`);
      continue;
    }
    console.log(`✓ Created: ${u.email} (${u.fullName})`);
    if (u.role !== "user") {
      await supabase.from("user_roles").update({ role: u.role }).eq("user_id", data.user.id);
      console.log(`  → Role set to: ${u.role}`);
    }
  }
  console.log("\nConfiguring test data...\n");
  const adminUsers = users.filter(u => u.role !== "user");
  for (const u of adminUsers) {
    const { data: prof } = await supabase.from("profiles").select("user_id").eq("email", u.email).single();
    if (prof) {
      await supabase.from("client_finances").update({ capital: 500000, profits: 125000, total_recovered: 50000 }).eq("user_id", prof.user_id);
      console.log(`  → Finances seeded for ${u.email}`);
    }
  }
  const regularUsers = users.filter(u => u.role === "user");
  for (let i = 0; i < regularUsers.length; i++) {
    const u = regularUsers[i];
    const { data: prof } = await supabase.from("profiles").select("user_id").eq("email", u.email).single();
    if (prof) {
      const capital = [10000, 5000, 25000, 100000, 500, 1000000, 250000][i] || 1000;
      const profits = capital * [0.05, 0.02, 0.08, 0.12, 0, 0.15, 0.07][i] || 0;
      const recovered = capital * [0, 0, 5000, 25000, 0, 100000, 50000][i] || 0;
      await supabase.from("client_finances").update({
        capital, profits, total_recovered: recovered,
        amount_due: i === 3 ? 15000 : 0,
        payment_status: i === 3 ? "pending" : "none",
        payment_due_message: i === 3 ? "Please complete your payment by the deadline" : null,
        payment_deadline: i === 3 ? new Date(Date.now() + 7*86400000).toISOString() : null,
        withdrawal_locked: i === 2 ? true : false,
        withdrawal_lock_message: i === 2 ? "Withdrawals temporarily suspended - contact support" : null,
      }).eq("user_id", prof.user_id);
      console.log(`  → Finances seeded for ${u.email}: $${capital.toLocaleString()}`);
      if (i === 1) {
        await supabase.from("kyc_documents").upsert({
          user_id: prof.user_id, status: "pending", submitted_at: new Date().toISOString()
        }).eq("user_id", prof.user_id);
        console.log(`  → KYC set to pending for ${u.email}`);
      }
      if (i === 0) {
        await supabase.from("kyc_documents").upsert({
          user_id: prof.user_id, status: "approved", submitted_at: new Date(Date.now() - 86400000).toISOString(), reviewed_at: new Date().toISOString()
        }).eq("user_id", prof.user_id);
        console.log(`  → KYC approved for ${u.email}`);
      }
    }
  }
  console.log("\nDone! 10 users created with varying profiles.");
}
seed().catch(console.error);
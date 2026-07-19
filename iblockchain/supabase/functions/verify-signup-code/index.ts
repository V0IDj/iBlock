import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { email, code } = await req.json();

    // Verify code
    const { data, error } = await supabase
      .from("verification_codes")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return new Response(JSON.stringify({ error: "No verification code found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
      });
    }

    if (data.code !== code) {
      return new Response(JSON.stringify({ error: "Invalid code" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
      });
    }

    if (new Date(data.expires_at) < new Date()) {
      return new Response(JSON.stringify({ error: "Code expired" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
      });
    }

    // Create user
    const { data: authData, error: signUpError } = await supabase.auth.admin.createUser({
      email,
      password: data.password,
      email_confirm: true,
      user_metadata: { full_name: data.full_name, phone: data.phone },
    });

    if (signUpError) throw signUpError;

    // Clean up
    await supabase.from("verification_codes").delete().eq("email", email);

    return new Response(JSON.stringify({ success: true, user: authData.user }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
    });
  }
});

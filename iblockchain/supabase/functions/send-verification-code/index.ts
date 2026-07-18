// Follow the setup instructions at:
// https://supabase.com/docs/guides/functions/quickstart

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const { email, code, password, fullName, phone, language } = await req.json();

    // Send verification code via Resend or SMTP
    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: "noreply@iblock-chain.com",
          to: email,
          subject: language === "ar" ? "رمز التحقق من iBlockchain" : "Your iBlockchain Verification Code",
          html: language === "ar"
            ? `<p>مرحباً!</p><p>رمز التحقق الخاص بك هو: <strong>${code}</strong></p><p>هذا الرقم صالح لمدة 10 دقائق.</p>`
            : `<p>Hello!</p><p>Your verification code is: <strong>${code}</strong></p><p>This code expires in 10 minutes.</p>`,
        }),
      });
    }

    // Store pending user data
    await supabase.from("verification_codes").upsert(
      { email, code, password, fullName, phone, expires_at: new Date(Date.now() + 600000).toISOString() },
      { onConflict: "email" }
    );

    return new Response(JSON.stringify({ success: true, code: RESEND_API_KEY ? null : code }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

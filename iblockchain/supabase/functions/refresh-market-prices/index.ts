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
    const symbols = ["bitcoin", "ethereum", "tether"];
    const ids = ["bitcoin", "ethereum", "tether"];
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(",")}&vs_currencies=usd`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("CoinGecko API error");
    const prices = await res.json();

    const updated = [];
    for (const [id, symbol] of [["bitcoin", "BTC"], ["ethereum", "ETH"], ["tether", "USDT"]]) {
      const price = prices[id]?.usd;
      if (price) {
        await supabase.from("market_assets").update({ current_price: price, updated_at: new Date().toISOString() }).eq("symbol", symbol);
        updated.push({ symbol, price, source: "coingecko" });
      }
    }

    return new Response(JSON.stringify({ success: true, updated, updated_at: new Date().toISOString() }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400,
    });
  }
});

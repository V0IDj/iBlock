import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://rblxvbaucarrvlfosorz.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJibHh2YmF1Y2FycnZsZm9zb3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODI0OTcsImV4cCI6MjA4NDU1ODQ5N30.AceD70uP9b-k9Ltr-Bd_0Gfi5BX7sP8BavlWVs4tO68";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});

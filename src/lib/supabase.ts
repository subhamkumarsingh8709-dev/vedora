import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

function getConfigError(): string {
  if (!url || !/^https:\/\/.+\.supabase\.co\/?$/.test(url.trim())) {
    return "Supabase URL is missing or invalid. Set VITE_SUPABASE_URL in .env, then restart the dev server.";
  }
  if (!key || !(key.trim().startsWith("sb_publishable_") || key.trim().startsWith("eyJ"))) {
    return "Supabase API key format is invalid. Set VITE_SUPABASE_ANON_KEY in .env to your project's publishable key or legacy anon key, then restart the dev server.";
  }
  return "";
}

export const supabaseConfigError = getConfigError();

// createClient throws on empty values, so use placeholders when the config is bad.
// AuthModal checks supabaseConfigError before making any request.
export const supabase = createClient(
  supabaseConfigError ? "https://placeholder.supabase.co" : url!.trim(),
  supabaseConfigError ? "placeholder-key" : key!.trim(),
);
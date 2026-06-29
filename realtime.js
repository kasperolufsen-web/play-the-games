import { createClient } from "@supabase/supabase-js";

// Public anon key is safe to expose in the browser — it only allows
// what your Supabase RLS / Realtime settings allow. We only use Realtime
// broadcast here, so no database tables or auth are required.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let _client = null;
export function getSupabase() {
  if (!url || !anon) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Add them in Vercel project settings (see README)."
    );
  }
  if (!_client) {
    _client = createClient(url, anon, {
      realtime: { params: { eventsPerSecond: 20 } },
    });
  }
  return _client;
}

// One broadcast channel per room. self:true so host hears its own echoes
// (simplifies host = single source of truth).
export function joinRoom(code) {
  const supabase = getSupabase();
  return supabase.channel(`ptg-${code}`, {
    config: { broadcast: { self: true, ack: false } },
  });
}

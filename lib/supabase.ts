import { createClient } from '@/lib/supabase/client';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//@ts-ignore
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;


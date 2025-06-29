import { createClient } from "@/lib/supabase/client";

export async function isSignedIn() {
    const supabase = createClient();

    const session = await supabase.auth.getSession();

    return !!session.data.session;
}

export async function getUser() {
    return createClient()?.auth.getUser().then(x => x.error ? null : x.data).then(x => x?.user);
}

export async function getSessionUser() {
    return createClient()?.auth.getSession().then(x => x?.data?.session?.user);
}
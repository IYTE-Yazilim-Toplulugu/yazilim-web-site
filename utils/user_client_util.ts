import { createClient } from "@/lib/supabase/client";
import { UserInfo } from "@/types/types_user";

export async function isSignedIn() {
    const supabase = createClient();

    const session = await supabase.auth.getSession();

    return !!session.data.session;
}

export async function getUser() {
    return createClient()?.auth.getUser().then(x => x.error ? null : x.data).then(x => x?.user);
}

export async function getUserInfo(id: string) {
    const { data, error } = await createClient()
        .from('user_infos')
        .select('*')
        .eq('id', id)
        .single();

    return { data: data, error: error };

}

export async function getSessionUser() {
    return createClient()?.auth.getSession().then(x => x?.data?.session?.user);
}

export async function getUserIp(): Promise<string> {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    return data.ip;
}

export async function getDepartments() {
    const { data, error } = await createClient()
        .from('departments')
        .select('id, name');

    return { data: data, error: error };

}

export async function updateUser(user: UserInfo) {

    const { data, error } = await createClient()
        .from('user_infos')
        .update({
            full_name: user.full_name,
            place: user.place,
            phone: user.phone,
            school_number: user.school_number,
            department: user.department
        })
        .eq('id', user.id)
        .select()
        .single()



    return { data: data, error: error };
}


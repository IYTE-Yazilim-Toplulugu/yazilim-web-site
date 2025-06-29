import {createServer} from "@/lib/supabase/server";
import supabase from "@/lib/supabase/supabase";

const pageSize = 50;

export type UserInfo = {
    id: string,
    full_name: string,
    place: string | undefined,
    email: string | undefined,
    phone: string,
    school_number: string | undefined,
    department: number | undefined,
    updated_at: string | undefined,
    created_at: string,
    receives_emails: boolean,
    is_admin: boolean,
    is_special: boolean,
    is_student: boolean,
    from_iztech: boolean
};

export async function register(data: any) {
    const supabase = await createServer();

    if (!await supabase.auth.getSession() && await supabase.auth.signOut()) {
        console.log("register could not be completed: error while signing out");
        return "sign out error";
    }

    const toSend = {
        email: data.email,
        password: data.password,
        options: {}
    };

    delete data.password;

    toSend.options = {
        data: data
        // sending email password and phone does not affect the security
        // since supabase trigger ignoring them
    }

    const response = await supabase.auth.signUp(toSend);

    if (response.error) {
        if (response.error.code === "user_already_exists")
            console.log("error while registering user: user already exists");
        else
            console.log("error while registering user: %s", JSON.stringify(response.error));
        return response.error.message;
    }

    //await supabase.auth.setSession(response.data.session!);
    return null;
}

export async function login(data: any) {
    const supabase = await createServer();

    if (!await supabase.auth.getSession() && await supabase.auth.signOut()) {
        console.log("sign in could not be completed: error while signing out");
        return "sign out error";
    }

    const response = await supabase.auth.signInWithPassword({
        email: data.email,
        phone: data.phone,
        password: data.password,
    });

    if (response.error) {
        console.log("error while signing in: %s", JSON.stringify(response.error));
        return response.error.message;
    }

    return null;
}

export async function signOut() {
    const supabase = await createServer();
    await supabase?.auth.signOut();
}

export async function getUsers(page: number, query?: string) {
    page--;

    if (page < 0)
        page = 0;

    const index = page * pageSize;

    let q = supabase
        .from("full_users")
        .select<"*", UserInfo>("*", {
            count: "exact"
        });

    if (query && query.length > 0) {
        if (!query.startsWith("%") && !query.endsWith("%"))
            query = `%${query}%`;
        q = q.ilike('search_impl', query);
    }

    const {data, error, count} = await q
        .order("created_at", {
            ascending: false
        })
        .range(index, index + pageSize - 1);

    if (error)
        console.log(error);

    return {
        data: data,
        pageCount: !count ? 1 : Math.ceil(count / pageSize)
    };
}

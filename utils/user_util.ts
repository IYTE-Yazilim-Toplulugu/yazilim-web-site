import {createClient} from "@/lib/supabase/client";
import {createServer} from "@/lib/supabase/server";

export async function getUsers() {
    const supabase = await createServer();
    const all = await supabase.from("departments").select();
    return all.data;
}

export async function register(data: any) {
    const supabase = await createServer();

    if (!await supabase.auth.getSession() && await supabase.auth.signOut()) {
        console.log("register could not be completed: error while signing out");
        return "sign out error";
    }

    const response = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        phone: data.phone,
        options: {
            data: data
            // sending email password and phone does not affect the security
            // since supabase trigger ignoring them
        }
    });



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

export async function signOut(){
    const supabase = await createServer();
    await supabase?.auth.signOut();
}
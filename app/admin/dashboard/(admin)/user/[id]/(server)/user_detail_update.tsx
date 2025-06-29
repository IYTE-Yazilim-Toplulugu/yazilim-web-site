'use server'

import supabase from "@/lib/supabase/supabase";

export default async function UserDetailUpdateServer(user: any){
    delete user.email;

    const id = user.id;
    if (!id || typeof id !== "string")
        return "Invalid user id.";

    const {error} = await supabase
        .from("user_infos")
        .update(user)
        .filter("id", "eq", id);

    return error;
}
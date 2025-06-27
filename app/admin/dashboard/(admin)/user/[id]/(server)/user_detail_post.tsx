'use server'

import supabase from "@/lib/supabase/supabase";

export default async function UserDetailUpdatePost(user: any){
    delete user.email;

    const id = user.id;
    console.log("USER");
    console.log(user);
    if (!id || typeof id !== "string")
        return "Invalid user id.";

    const {error} = await supabase
        .from("user_infos")
        .update(user)
        .filter("id", "eq", id);

    return error;
}
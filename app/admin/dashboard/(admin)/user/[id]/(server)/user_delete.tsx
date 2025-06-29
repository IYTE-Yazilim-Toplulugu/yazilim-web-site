'use server'

import supabase from "@/lib/supabase/supabase";
import {AuthError} from "@supabase/auth-js";

export default async function UserDeleteServer(id: string){
    try{
        const { error } = await supabase.auth.admin.deleteUser(id, false);

        return error;
    }
    catch (err){
        if (err instanceof Error && !err.message.includes("UUID")){ // Except Invalid UUID Error
            console.log(err);
        }

        return new AuthError("UUID was invalid.");
    }
}
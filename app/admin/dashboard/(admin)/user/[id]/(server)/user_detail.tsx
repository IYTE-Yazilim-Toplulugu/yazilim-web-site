'use server'

import supabase from "@/lib/supabase/supabase"
import {UserInfo} from "@/utils/user_server_util";

export type Department = {
    id: number,
    name: string
};

async function fetchUser(id: string){
    try {
        const { data: { user }, error: errUser } = await supabase
            .auth.admin
            .getUserById(id);
        if (errUser){
            console.log(errUser);
            return undefined;
        }
        const { data, error: errInfo } = await supabase
            .from<any, UserInfo>("user_infos")
            .select("*")
            .filter("id", "eq", id);

        if (errInfo){
            console.log(errInfo);
            return undefined;
        }

        if (user === null || data === null || data.length === 0)
            return undefined;

        const g: UserInfo = data.at(0);
        g.email = user.email;
        return g;
    }
    catch (err){
        if (err instanceof Error && !err.message.includes("UUID")){ // Except Invalid UUID Error
            console.log(err);
        }

        return undefined;
    }
}

async function fetchDepartments(): Promise<Department[] | undefined>{
    const {data, error} = await supabase
        .from<any, Department>("departments")
        .select("id,name");

    if (!error)
        console.log(error);

    return !!data ? data : undefined;
}

export default async function UserDetailServer(id: string){
    const userDetail = await fetchUser(id);
    const departments = await fetchDepartments();
    return {
        user: userDetail,
        departments: departments
    };
}
'use server'

import supabase from "@/lib/supabase/supabase"
import { getUser } from "@/utils/user_server_util";

export type Department = {
    id: number,
    name: string
};

async function fetchDepartments(): Promise<Department[] | undefined>{
    const {data, error} = await supabase
        .from<any, Department>("departments")
        .select("id,name");

    if (!error)
        console.log(error);

    return !!data ? data : undefined;
}

export default async function UserDetailServer(id: string){
    const userDetail = await getUser(id);
    const departments = await fetchDepartments();
    return {
        user: userDetail,
        departments: departments
    };
}
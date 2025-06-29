'use server'

import {getUsers} from "@/utils/user_server_util";

export default async function UsersAllServer(page: number, query?: string){
    return getUsers(page, query);
}
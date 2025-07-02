'use server'

import { deleteUser } from "@/utils/user_server_util";

export default async function UserDeleteServer(id: string){
    return deleteUser(id);
}
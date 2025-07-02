'use server'

import { updateUser } from "@/utils/user_server_util";

export default async function UserDetailUpdateServer(user: any){
    return updateUser(user);
}
'use server'

import {register} from "@/utils/user_server_util";

export default async function Register(data: any) {
    return register(data);
}
'use server'

import {login} from "@/utils/user_server_util";

export default async function Login(data: { email: string | null, phone: string | null, password: string }) {
    return login(data);
}
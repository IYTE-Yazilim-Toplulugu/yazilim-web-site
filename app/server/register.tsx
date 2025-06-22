'use server'

import {register} from "@/utils/user_util";

export default async function Register(data: any) {
    return register(data);
}
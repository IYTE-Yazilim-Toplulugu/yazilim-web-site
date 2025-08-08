'use server'
import { getContactAdmin } from "@/utils/contact_server_util"

export default async function ContactGet(id: number) {
    return getContactAdmin(id)
}

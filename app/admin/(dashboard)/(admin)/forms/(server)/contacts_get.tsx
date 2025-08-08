'use server'

import { getContactsAdmin } from "@/utils/contact_server_util"

export default async function ContactsAll(page: number, query?: string) {
    return getContactsAdmin(page, query)
}

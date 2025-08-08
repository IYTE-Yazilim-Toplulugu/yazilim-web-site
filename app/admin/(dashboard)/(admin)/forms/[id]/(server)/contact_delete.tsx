'use server'
import { deleteContact } from "@/utils/contact_server_util"


export default async function ContactDelete(id: number) {
    return deleteContact(id)
}

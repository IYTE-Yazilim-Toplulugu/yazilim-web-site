'use server'
import { Contact } from "@/types/types_contact";
import { updateContact } from "@/utils/contact_server_util";

export default async function ContactUpdate(contact: Contact) {
    return updateContact(contact);
}

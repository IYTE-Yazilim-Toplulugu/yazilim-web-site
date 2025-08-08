'use server'
import { Contact } from "@/types/types_contact";
import { createContact } from "@/utils/contact_server_util";

export default async function ContactCreate(contact: Contact) {
    return createContact(contact);
}

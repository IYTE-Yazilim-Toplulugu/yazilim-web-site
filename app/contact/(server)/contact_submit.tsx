import { Contact } from "@/types/types_contact";
import { submitForm } from "@/utils/contact_client_util";

export default async function ContactSubmitServer(form: Contact) {
    return submitForm(form);
}

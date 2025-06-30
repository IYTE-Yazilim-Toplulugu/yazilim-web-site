import { Contact } from "@/types/types_contact";
import { createClient } from "@/lib/supabase/client";

export async function submitForm(form: Contact) {
    delete form.id;
    delete form.created_at;

    const { error } = await createClient()
        .from("contacts")
        .insert(form);

    return error;
}

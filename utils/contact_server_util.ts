'use server'
import supabase from "@/lib/supabase/supabase";
import { Contact } from "@/types/types_contact";


export async function getContactsAdmin(page: number, query?: string) {
    page--;
    if (page < 0) page = 0;

    let q = supabase
        .from("contacts")
        .select<"*", Contact>("*", {
            count: "exact"
        });

    if (query && query.length > 0) {
        if (!query.startsWith("%") && !query.endsWith("%"))
            query = `%${query}%`;
        q = q.ilike('name', query);
    }

    const { data, error, count } = await q
        .order("name", {
            ascending: true,
        })
        .range(page * 10, (page + 1) * 10 - 1);

    if (error) {
        return { data: null, pageCount: null, error: error };
    }
    return {
        data: data || [],
        pageCount: !count ? 1 : Math.ceil(count / 10),
        error: null
    };
}

export async function getContactAdmin(id: number) {
    try {
        const { data, error } = await supabase
            .from("contacts")
            .select<"*", Contact>()
            .eq("id", id)

        if (error) {
            return { "data": null, "error": error };
        }
        return { "data": data && data.length >= 1 ? data[0] : null, "error": null };
    } catch (error) {
        return { "data": null, "error": error };
    }
}

export async function updateContact(contact: Contact) {
    const id = contact.id;
    if (!id || typeof id !== "number") {
        return { "data": null, "error": { code: '23503', message: "Invalid contact form id" } };
    }

    const { data, error } = await supabase
        .from("contacts")
        .update(contact)
        .eq("id", id)
        .select()

    if (data && data.length > 0) {
        return { "data": data[0], "error": null };
    }
    return { "data": null, "error": error || { code: null, message: "Unknown error occurred" } };
}

export async function createContact(contact: Contact) {

    const { data, error } = await supabase
        .from("contacts")
        .insert(contact)
        .select();

    if (data && data.length > 0) {
        return { "data": data[0], "error": null };
    }
    return { "data": null, "error": error || { code: null, message: "Unknown error occurred" } };
}

export async function deleteContact(id: number) {
    const { data, error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", id)
        .select("*");

    if (error) {
        return { data, error };
    }
    return { data: data || [], error: null };
}

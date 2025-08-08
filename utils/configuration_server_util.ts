'use server'
import supabase from "@/lib/supabase/supabase";
import { Configuration } from "@/types/types_config";


export async function getConfigurationsAdmin(page: number, query?: string) {
    page--;
    if (page < 0) page = 0;

    let q = supabase
        .from("configuration")
        .select<"*", Configuration>("*", {
            count: "exact"
        });

    if (query && query.length > 0) {
        if (!query.startsWith("%") && !query.endsWith("%"))
            query = `%${query}%`;
        q = q.ilike('key', query);
    }

    const { data, error, count } = await q
        .order("key", {
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

export async function getConfigurationAdmin(id: number) {
    try {
        const { data, error } = await supabase
            .from("configuration")
            .select<"*", Configuration>()
            .eq("id", id)

        if (error) {
            return { "data": null, "error": error };
        }
        return { "data": data && data.length >= 1 ? data[0] : null, "error": null };
    } catch (error) {
        return { "data": null, "error": error };
    }
}

export async function updateConfiguration(configuration: Configuration) {
    const id = configuration.id;
    if (!id || typeof id !== "number") {
        return { "data": null, "error": { code: '23503', message: "Invalid configuration id" } };
    }

    const { data, error } = await supabase
        .from("configuration")
        .update(configuration)
        .eq("id", id)
        .select()

    if (data && data.length > 0) {
        return { "data": data[0], "error": null };
    }
    return { "data": null, "error": error || { code: null, message: "Unknown error occurred" } };
}

export async function createConfiguration(configuration: Configuration) {

    const { data, error } = await supabase
        .from("configuration")
        .insert(configuration)
        .select();

    if (data && data.length > 0) {
        return { "data": data[0], "error": null };
    }
    return { "data": null, "error": error || { code: null, message: "Unknown error occurred" } };
}

export async function deleteConfiguration(id: number) {
    const { data, error } = await supabase
        .from("configuration")
        .delete()
        .eq("id", id)
        .select("*");

    if (error) {
        return { data, error };
    }
    return { data: data || [], error: null };
}

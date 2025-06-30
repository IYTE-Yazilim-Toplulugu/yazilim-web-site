import { createClient } from "@/lib/supabase/client";
import { Survey } from "@/types/types";

export async function getSurveys(page: number, query?: string) {
    page--;

    if (page < 0) page = 0;



    let q = createClient()
        .from("surveys")
        .select<"*", Survey>("*", {
            count: "exact"
        });
    if (query && query.length > 0) {
        if (!query.startsWith("%") && !query.endsWith("%"))
            query = `%${query}%`;
        q = q.ilike('search_impl', query);
    }


    const { data, error, count } = await q
        .order("created_at", {
            ascending: false,
        })
        .range(page * 10, (page + 1) * 10 - 1);
    if (error) {
        console.error(error);
    }

    return {
        data: data || [],
        pageCount: !count ? 1 : Math.ceil(count / 10)
    };
}

export async function deleteSurvey(id: number) {
    const error = createClient()
        .from("surveys")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        return { "success": false, error };
    }
    return { "success": true };
}





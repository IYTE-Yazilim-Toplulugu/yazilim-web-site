import { createClient } from "@/lib/supabase/client";

export async function getDiscounts() {
    const { data, error } = await createClient()
        .from("discounts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
    return {
        data: data || [],
        error: error
    }
}

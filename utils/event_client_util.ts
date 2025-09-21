import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";


export async function getEvents() {
    const { data, error } = await createClient()
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
    return {
        data: data || [],
        error: error
    }
}

export async function getEvent(id: number) {
    const { data, error } = await createClient()
        .from("events")
        .select("*")
        .eq("id", id)
        .single();

    return {
        data: data || null,
        error: error
    }
}

export function getEventImagePath(image_path: string | null) {
    if (!image_path) return "";
    return createClient().storage
        .from('event-images')
        .getPublicUrl(image_path)
        .data.publicUrl;
}

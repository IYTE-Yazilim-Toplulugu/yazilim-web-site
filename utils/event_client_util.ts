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
    const client = createClient();

    const [current, prev, next] = await Promise.all([
        client.from("blogs")
            .select("*")
            .eq("id", id)
            .eq("is_published", true)
            .maybeSingle(),

        client.from("blogs")
            .select("*")
            .lt("id", id)
            .eq("is_published", true)
            .order("id", { ascending: false })
            .limit(1)
            .maybeSingle(),

        client.from("blogs")
            .select("*")
            .gt("id", id)
            .eq("is_published", true)
            .order("id", { ascending: true })
            .limit(1)
            .maybeSingle(),
    ]);

    return {
        current: current.data,
        prev: prev.data,
        next: next.data,
        error: current.error || prev.error || next.error,
    };
}

export function getEventImagePath(image_path: string | null) {
    if (!image_path) return "";
    return createClient().storage
        .from('event-images')
        .getPublicUrl(image_path)
        .data.publicUrl;
}

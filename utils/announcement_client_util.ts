import { createClient } from "@/lib/supabase/client";

export async function getAnnouncements() {
    const { data, error } = await createClient()
        .from("announcements")
        .select("*")

    if (error) {
        console.error("Error fetching announcements:", error);
        return { data: [], error: error };
    }
    return {
        data: data || [],
        error: null
    }
}

export function getAnnouncementImagePath(image_path: string) {
    return createClient().storage
        .from('announcement-images')
        .getPublicUrl(image_path)
        .data.publicUrl;
}

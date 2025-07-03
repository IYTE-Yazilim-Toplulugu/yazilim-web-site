'use server'
import supabase from "@/lib/supabase/supabase";
import { Announcement } from "@/types/types_announcement";


export async function getAnnouncementsAdmin(page: number, query?: string) {
    page--;
    if (page < 0) page = 0;

    let q = supabase
        .from("announcements")
        .select<"*", Announcement>("*", {
            count: "exact"
        });

    if (query && query.length > 0) {
        if (!query.startsWith("%") && !query.endsWith("%"))
            query = `%${query}%`;
        q = q.ilike('title', query);
    }

    const { data, error, count } = await q
        .order("id", {
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

export async function getAnnouncement(id: number) {
    try {
        const { data, error } = await supabase
            .from("announcements")
            .select<"*", Announcement>()
            .eq("id", id)

        if (error) {
            return { "data": null, "error": error };
        }
        return { "data": data && data.length >= 1 ? data[0] : null, "error": null };
    } catch (error) {
        return { "data": null, "error": error };
    }
}

export async function updateAnnouncement(announcement: Announcement) {
    const id = announcement.id;
    if (!id || typeof id !== "number") {
        return { "data": null, "error": { code: '23503', message: "Invalid survey ID" } };
    }

    const { data, error } = await supabase
        .from("announcements")
        .update(announcement)
        .eq("id", id)
        .select()

    if (data && data.length > 0) {
        return { "data": data[0], "error": null };
    }
    return { "data": null, "error": error || { code: null, message: "Unknown error occurred" } };
}

export async function createAnnouncement(announcement: Announcement) {

    const { data, error } = await supabase
        .from("announcements")
        .insert(announcement)
        .select();

    if (data && data.length > 0) {
        return { "data": data[0], "error": null };
    }
    return { "data": null, "error": error || { code: null, message: "Unknown error occurred" } };
}

export async function deleteAnnouncement(id: number) {
    const { data, error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id)
        .select("*");

    if (error) {
        return { data, error };
    }
    return { data: data || [], error: null };
}

export async function uploadAnnouncementImage(file: File) {
    const ext = file.name.split('.').pop();
    const fileName = `${(Math.random() + 1) * (10 ** 16)}.${ext}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
        .from("announcement-images")
        .upload(filePath, file);

    if (error) {
        return { "filepath": null, "error": error };
    }
    return {
        "filepath": filePath,
        "error": null,
    }
}

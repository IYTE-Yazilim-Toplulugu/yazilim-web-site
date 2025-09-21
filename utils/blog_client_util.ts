import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";


export async function getBlogs() {
    const { data, error } = await createClient()
        .from("blogs")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
    return {
        data: data || [],
        error: error
    }
}

export async function getBlog(id: number) {
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

export async function createBlog(
    author: User,
    title: string,
    content: string,
    tags: string[],
    cover_image_url: string,
    is_published: boolean
) {
    is_published && console.log("Creating blog with is_published set to true");
    const { data, error } = await createClient()
        .from("blogs")
        .insert({
            author_id: author.id,
            author_name: author.user_metadata.fullName,
            title: title,
            content: content,
            tags: tags,
            cover_image_url: cover_image_url,
            is_published: false,
        })
        .select("*");

    return {
        data: data || [],
        error
    };
}

export function getBlogImagePath(image_path: string | null) {
    if (!image_path) return "";
    return createClient().storage
        .from('blog-images')
        .getPublicUrl(image_path)
        .data.publicUrl;
}

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";


export async function getBlogs(is_published: boolean, query?: string) {

    const { data, error } = await createClient()
        .from("blogs")
        .select("*")
        .eq("is_published", is_published)
        .order("published_at", { ascending: false });
    return {
        data: data || [],
        error: error
    }
}

export async function getBlog(id: number) {
    const ids = [id - 1, id, id + 1];
    const { data, error } = await createClient()
        .from("blogs")
        .select("*")
        .in("id", ids)
        .eq("is_published", true);

    return {
        data: data || [],
        error
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
            title: title,
            content: content,
            tags: tags,
            cover_image_url: cover_image_url,
            is_published: true,
            published_at: new Date().toISOString()
        })
        .select("*");

    return {
        data: data || [],
        error
    };
}

export function getBlogImagePath(image_path: string) {
    return createClient().storage
        .from('blog-images')
        .getPublicUrl(image_path)
        .data.publicUrl;
}

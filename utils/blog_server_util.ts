'use server';
import supabase from "@/lib/supabase/supabase";
import { Blog } from "@/types/types_blog";
import { getUser } from "./user_client_util";
import { getUser as getUserById } from "./user_server_util";

export async function getBlogsAdmin(page: number, query?: string) {
    page--;
    if (page < 0) page = 0;

    let q = supabase
        .from("blogs")
        .select<"*", Blog>("*", {
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

export async function getBlog(id: number) {
    try {
        const { data, error } = await supabase
            .from("blogs")
            .select<"*", Blog>()
            .eq("id", id)

        if (error) {
            return { "data": null, "error": error };
        }
        return { "data": data && data.length >= 1 ? data[0] : null, "error": null };
    } catch (error) {
        return { "data": null, "error": error };
    }
}

export async function updateBlog(blogData: Blog) {
    const id = blogData.id;
    if (!id || typeof id !== "number") {
        return { "data": null, "error": { code: '23503', message: "Invalid blog ID" } };
    }

    const { data, error } = await supabase
        .from("blogs")
        .update(blogData)
        .eq("id", id)
        .select()

    if (data && data.length > 0) {
        return { "data": data[0], "error": null };
    }
    return { "data": null, "error": error || { code: null, message: "Unknown error occurred" } };
}

export async function createBlog(blogData: Blog) {

    const { data, error } = await supabase
        .from("blogs")
        .insert(blogData)
        .select();

    if (data && data.length > 0) {
        return { "data": data[0], "error": null };
    }
    return { "data": null, "error": error || { code: null, message: "Unknown error occurred" } };
}


export async function deleteBlog(id: number) {
    const { data, error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", id)
        .select("*");

    if (error) {
        return { data: null, error };
    }
    return { data: data || [], error: null };
}

export async function getBlogAuthor(id: string) {
    let data;
    if (id === undefined) {
        data = await getUser()
    } else {
        data = await getUserById(id)
    }

    if (data) {
        return { data: data.id, error: null };
    }
    return { data: null, error: "Author not found" };
}

export async function imageUploadBlog(file: File) {
    const ext = file.name.split('.').pop();
    const fileName = `${(Math.random() + 1) * (10 ** 16)}.${ext}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file);

    if (error) {
        return { "filepath": null, "error": error };
    }
    return {
        "filepath": filePath,
        "error": null,
    }
}

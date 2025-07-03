'use server';

import { deleteBlog } from "@/utils/blog_server_util";

export default async function BlogDelete(id: number) {
    return await deleteBlog(id);
}

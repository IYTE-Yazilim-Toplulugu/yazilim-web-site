'use server';

import { getBlogsAdmin } from "@/utils/blog_server_util";

export default async function BlogsAll(page: number, query?: string) {
    return await getBlogsAdmin(page, query)
}

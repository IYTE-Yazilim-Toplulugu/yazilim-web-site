'use server';
import { Blog } from "@/types/types_blog";
import { createBlog } from "@/utils/blog_server_util";


export default async function BlogCreate(blogData: Blog) {
    return createBlog(blogData);
}

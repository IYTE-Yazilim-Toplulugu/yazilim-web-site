'use server';
import { Blog } from "@/types/types_blog";
import { updateBlog } from "@/utils/blog_server_util";

export default async function BlogUpdate(blogData: Blog) {
    return updateBlog(blogData);
}

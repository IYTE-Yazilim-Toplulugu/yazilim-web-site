'use server';

import { imageUploadBlog } from "@/utils/blog_server_util";

export default async function BlogImageUpload(file: File) {
    return imageUploadBlog(file);
}

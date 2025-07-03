'use server'
import { getBlog } from "@/utils/blog_server_util";


export default async function BlogGet(id: number) {
    return await getBlog(id);
}

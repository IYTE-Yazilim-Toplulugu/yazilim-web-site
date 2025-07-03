'use server'
import { getBlogAuthor } from "@/utils/blog_server_util";


export default async function blogAuthorGet(id: string) {
    const { data, error } = await getBlogAuthor(id);
    if (error) {
        console.error("Error fetching blog author:", error);
        return null;
    }
    return data?.toString();

}

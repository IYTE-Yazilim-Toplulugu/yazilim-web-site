'use server'
import { deleteImage } from "@/utils/gallery_server_util";

export default async function GalleryDeleteServer(id: number) {
    return deleteImage(id);
}

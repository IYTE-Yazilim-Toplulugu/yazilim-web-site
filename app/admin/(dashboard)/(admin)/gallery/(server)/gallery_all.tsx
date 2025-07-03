'use server'
import {getGalleryImages} from "@/utils/gallery_server_util";

export default async function GalleryAllServer(page: number, query?: string){
    return getGalleryImages(page, query);
}
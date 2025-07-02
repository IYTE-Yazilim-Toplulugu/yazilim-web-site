'use server'

import {ImageUploadInfo, uploadImage} from "@/utils/gallery_server_util";

export default async function GalleryUploadServer(info: ImageUploadInfo){
    return uploadImage(info);
}
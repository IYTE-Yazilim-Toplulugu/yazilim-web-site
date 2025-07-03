"use server";
import { uploadAnnouncementImage } from "@/utils/announcement_server_util";

export default async function AnnouncementImageUpload(file: File) {
    return uploadAnnouncementImage(file)

}

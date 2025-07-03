'use server'
import { Announcement } from "@/types/types_announcement"
import { createAnnouncement } from "@/utils/announcement_server_util";

export default async function AnnouncementCreate(announcement: Announcement) {
    return createAnnouncement(announcement);
}

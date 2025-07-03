'use server'
import { updateAnnouncement } from "@/utils/announcement_server_util"
import { Announcement } from "@/types/types_announcement"

export default async function AnnouncementUpdate(announcement: Announcement) {
    return updateAnnouncement(announcement);
}

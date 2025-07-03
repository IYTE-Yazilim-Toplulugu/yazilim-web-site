'use server'
import { getAnnouncement } from "@/utils/announcement_server_util"

export default async function AnnouncementGet(id: number) {
    return getAnnouncement(id)
}




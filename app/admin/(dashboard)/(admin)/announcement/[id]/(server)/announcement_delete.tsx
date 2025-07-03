'use server'

import { deleteAnnouncement } from "@/utils/announcement_server_util"


export default async function AnnouncementDelete(id: number) {
    return deleteAnnouncement(id)
}

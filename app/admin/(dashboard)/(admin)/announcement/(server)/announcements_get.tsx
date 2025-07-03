'use server'
import { getAnnouncementsAdmin } from "@/utils/announcement_server_util"

export default async function AnnouncementsAll(page: number, query?: string) {
    return getAnnouncementsAdmin(page, query)
}

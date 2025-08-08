'use server'
import { getConfigurationsAdmin } from "@/utils/configuration_server_util"

export default async function ConfigurationsAll(page: number, query?: string) {
    return getConfigurationsAdmin(page, query)
}

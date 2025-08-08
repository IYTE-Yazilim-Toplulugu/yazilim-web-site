'use server'
import { getConfigurationAdmin } from "@/utils/configuration_server_util"

export default async function ConfigurationGet(id: number) {
    return getConfigurationAdmin(id)
}

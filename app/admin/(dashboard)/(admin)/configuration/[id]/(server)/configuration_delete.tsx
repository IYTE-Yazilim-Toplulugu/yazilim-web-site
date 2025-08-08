'use server'
import { deleteConfiguration } from "@/utils/configuration_server_util"


export default async function ConfigurationDelete(id: number) {
    return deleteConfiguration(id)
}

'use server'
import { Configuration } from "@/types/types_config";
import { updateConfiguration } from "@/utils/configuration_server_util";

export default async function ConfigurationUpdate(configuuration: Configuration) {
    return updateConfiguration(configuuration);
}

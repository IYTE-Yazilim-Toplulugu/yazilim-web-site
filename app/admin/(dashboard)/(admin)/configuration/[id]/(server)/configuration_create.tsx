'use server'
import { Configuration } from "@/types/types_config";
import { createConfiguration } from "@/utils/configuration_server_util";

export default async function ConfigurationCreate(configuration: Configuration) {
    return createConfiguration(configuration);
}

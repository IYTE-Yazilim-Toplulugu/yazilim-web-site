import { createClient } from "@/lib/supabase/client";

import { Objects } from "@/types/types_config";

export async function getConfiguration<T>(key: string){
    const { data, error } = await createClient()
        .from("configuration")
        .select<"value", T>()
        .filter("key", "eq", key);

    return {
        data: data && data.length > 0 ? data.at(0) : undefined,
        error
    };
}

export async function getConfigurations(keys: string[]){
    const { data, error } = await createClient()
        .from("configuration")
        .select<"*", Objects>()
        .or(keys.map(a => "key.eq." + a).join(","));

    return {
        data,
        error
    };
}
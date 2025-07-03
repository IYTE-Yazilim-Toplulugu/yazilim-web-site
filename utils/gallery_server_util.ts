import supabase from "@/lib/supabase/supabase";
import { GalleryImage } from "@/types/types_gallery";

const bucketId = 'gallery-images';
const pageSize = 10;

export type ImageUploadInfo = {
    file: File,
    title: string,
    description: string | undefined,
    uploaderId: string
};

export type ImageUploadResult = {
    errorType: 'upload' | 'insert' | undefined,
    error: Error | undefined,
    data: any | undefined
};

export async function uploadImage({ file, title, description, uploaderId }: ImageUploadInfo): Promise<ImageUploadResult> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${(Math.random() + 1) * (10 ** 10)}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload file to storage
    const { error: uploadError } = await supabase.storage
        .from(bucketId)
        .upload(filePath, file);

    if (uploadError) return { errorType: "upload", error: uploadError, data: undefined };

    const data: GalleryImage = {
        title: title,
        description: description,
        file_path: filePath,
        uploader_id: uploaderId,
        id: undefined,
        uploaded_at: undefined,
        uploader_name: undefined
    };

    // Create gallery entry
    const { error: insertError } = await supabase
        .from('gallery')
        .insert(data);

    if (insertError) return { errorType: "upload", error: insertError, data: undefined };

    data.uploaded_at = new Date(Date.now()).toISOString();

    return { error: undefined, errorType: undefined, data: data };
}

export async function getGalleryImages(page: number, query?: string){
    page--; if (page < 0) page = 0; const index = pageSize * page;

    let q = supabase
        .from("full_gallery")
        .select<"*", GalleryImage>("*", {
            count: "exact"
        });

    if (query && query.length > 0) {
        if (!query.startsWith("%") && !query.endsWith("%"))
            query = `%${query}%`;
        q = q.ilike('search_impl', query);
    }

    const { data, error, count } = await q
        .order("uploaded_at", {
            ascending: false
        })
        .range(index, index + pageSize - 1);

    if (error)
        console.error(error);

    return {
        data: data,
        pageCount: !count ? 1 : Math.ceil(count / pageSize)
    };
}

export type ImageDeleteErrorResult = {
    errorType: 'get' | 'storage' | 'table' | undefined,
    error: Error | undefined
};

export async function deleteImage(id: number): Promise<ImageDeleteErrorResult | undefined> {
    const { data, error: errorGetImage } = await supabase
        .from('gallery')
        .select<"file_path", { file_path: string }>()
        .filter('id', 'eq', id);

    if (errorGetImage) return { errorType: 'get', error: errorGetImage };

    if (!data || data.length === 0) return undefined;

    const filePath = data.at(0)!.file_path;

    const { error: errorStorageRemove } = await supabase.storage
        .from(bucketId)
        .remove([filePath]);

    if (errorStorageRemove) return { errorType: 'storage', error: errorStorageRemove };

    const { error: errorDelete } = await supabase.from('gallery')
        .delete()
        .filter('id', 'eq', id);

    return errorDelete ? { errorType: 'table', error: errorDelete } : undefined;
}

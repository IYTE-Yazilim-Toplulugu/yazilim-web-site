import {GalleryImage} from "@/types/types_gallery";
import {createClient} from "@/lib/supabase/client";

const pageSize = 6;

export async function getGalleryImages(page: number){
    page--; if (page < 0) page = 0; const index = pageSize * page;

    const { data, error } = await createClient()
        .from('gallery')
        .select<"*", GalleryImage>()
        .order('uploaded_at', { ascending: false })
        .range(index, index + pageSize - 1);

    return {
        data,
        error
    };
}

export function getImagePath(image: GalleryImage){
    return createClient().storage
        .from('gallery-images')
        .getPublicUrl(image.file_path)
        .data.publicUrl
}
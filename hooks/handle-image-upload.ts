import heic2any from "heic2any";

export async function handleImageUpload(selected: File | null): Promise<File | null> {
    if (!selected) return null;

    if (
        selected.type === "image/heic" ||
        selected.type === "image/heif" ||
        selected.name.toLowerCase().endsWith(".heic") ||
        selected.name.toLowerCase().endsWith(".heif")
    ) {
        try {
            const convertedBlob = await heic2any({
                blob: selected,
                toType: "image/jpeg",
                quality: 0.9,
            });

            const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
            return new File([blob], selected.name.replace(/\.(heic|heif)$/i, ".jpg"), {
                type: "image/jpeg",
            });
        } catch (err) {
            console.error("HEIC conversion failed:", err);
            return null;
        }
    }

    return selected;
}

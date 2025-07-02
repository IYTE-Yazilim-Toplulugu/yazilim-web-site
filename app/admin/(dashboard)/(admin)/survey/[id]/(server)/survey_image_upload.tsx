import { uploadImage } from "@/utils/survey_server_util";



export default async function imageUpload(file: File) {
    return uploadImage(file)

}

import { getUserCount } from "@/utils/user_server_util";
import { getFormCount } from "@/utils/survey_server_util";



export default async function getCounts() {
    const userCount = await getUserCount()
    const formCount = await getFormCount();

    return {
        userCount: userCount,
        formCount: formCount
    }
}

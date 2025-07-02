'use server'
import { getSurvey } from "@/utils/survey_server_util";


export default async function SurveyGet(id: number) {
    return await getSurvey(id);
}

'use server';
import { hasSubmittedCheck } from "@/utils/survey_server_util";

export default async function checkHasSubmitted(surveyId: number | null, ip: string,) {
    return await hasSubmittedCheck(surveyId, ip);
}

'use server';
import { hasSubmittedCheck } from "@/utils/survey_server_util";

export default async function checkHasSubmitted(surveyId: number | null, cookieId: string) {
    return await hasSubmittedCheck(surveyId, cookieId);
}

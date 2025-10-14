'use server';

import { getAnsweredSurveys } from "@/utils/survey_server_util";

export default async function answeredSurveysGet(userId: string | null, cookieId: string | null = null) {
    return await getAnsweredSurveys(userId, cookieId);
}

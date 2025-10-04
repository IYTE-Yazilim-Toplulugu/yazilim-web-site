'use server';

import { getAnsweredSurveys } from "@/utils/survey_server_util";

export default async function answeredSurveysGet(userId: string | null, ip: string,) {
    return await getAnsweredSurveys(userId, ip);
}

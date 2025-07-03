'use server'
import { Survey } from "@/types/types";
import { getSurveyAnswers, getSurveysAdmin } from "@/utils/survey_server_util";

export default async function SurveysAll(page: number, query?: string) {
    return getSurveysAdmin(page, query)
}

export async function SurveyAnswersAll(surveys: Survey[]) {
    return getSurveyAnswers(surveys);
}

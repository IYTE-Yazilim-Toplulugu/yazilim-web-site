'use server'
import { getSurveys } from "@/utils/survey_server_util";

export default async function SurveysAll(page: number, query?: string) {
    return getSurveys(page, query)
}

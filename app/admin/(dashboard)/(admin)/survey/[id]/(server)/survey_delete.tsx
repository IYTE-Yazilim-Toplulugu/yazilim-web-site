'use server';
import { deleteSurvey } from '@/utils/survey_server_util';

export default async function SurveyDelete(id: number) {
    return await deleteSurvey(id);
}

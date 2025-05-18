"use client";
import { SectionHeader } from '@/components/ui/section-container';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { SurveyData } from '@/lib/pseudo';

export default function Survey() {
    const [surveyData, setSurveyData] = useState(SurveyData);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mt-16'
        >
            <SectionHeader title='Surveys' titleClassName='mt-4' />
            <section className='container flex flex-wrap gap-4 justify-center items-center'>
                {surveyData?.surveys?.map((survey: any) => (
                    <div key={survey.slug} className="items-center justify-center p-4 border border-gray-300 rounded-lg shadow-md mb-4">
                        {survey.title}
                    </div>
                ))}

            </section>


        </motion.div>
    )
}

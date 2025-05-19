"use client";
import { SectionHeader } from '@/components/ui/section-container';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Circle, Code, Scroll, Ticket, User } from 'lucide-react';

import { SurveyData } from '@/lib/pseudo';
import axios from 'axios';

export default function Survey() {
    const [surveyData, setSurveyData] = useState(SurveyData);
    const [expandedSurveys, setExpandedSurveys] = useState<number[]>([]);
    const [_activeOptions, _setActiveOptions] = useState([]);

    const HandleIcon = (icon: string) => {
        switch (icon) {
            case "user":
                return <User />
            case "feature":
                return <Code />

            case "event":
                return <Ticket />
            default:
                return <Scroll />
        }
    }

    const HandleExpandedSurveys = (id: number) => {
        if (expandedSurveys.includes(id)) {
            setExpandedSurveys(expandedSurveys.filter((surveyId) => surveyId !== id));
        } else {
            setExpandedSurveys([...expandedSurveys, id]);
        }
    }

    // Surely there is better way to handle this, but I am not sure how to do that
    // I didnt finish the work there
    const HandleQuestions = (type: string, options?: number[], scale?: number) => {
        switch (type) {
            case "yes_no":
                return (
                    <section className='flex flex-row gap-4'>
                        <p>Yes/No Question</p>
                    </section>
                )
            case "dropdown":
                return (
                    <section>
                        {options?.map((option) => (
                            <div key={option} className='pt-4'>
                                <p>{option}</p>
                            </div>
                        ))}
                    </section>
                )
            case "number":
                return (
                    <section className=''>
                        <input placeholder='Number' type="number" className='border border-border rounded-lg p-2' />
                    </section>
                )
            case "text":
                return (
                    <section className=''>
                        <input placeholder='Text' type="text" className='border border-border rounded-lg p-2' />
                    </section>
                )
            case "multiple_choice":
                return (
                    <section>
                        {options?.map((option) => (
                            <div key={option} className='pt-4'>
                                <p>{option}</p>
                            </div>
                        ))}
                    </section>
                )
            case "rating":
                return (
                    <section className='flex flex-row items-center justify-start gap-4'>
                        {/* @ts-ignore */}
                        {Array.from({ length: scale }, (_, index) => (
                            <div key={index} className='pt-4 flex flex-col gap-2 items-center' onClick={() => HandleRateClick(index)}>
                                <Circle className=' cursor-pointer animate-click-scale' /> {/* use click animation */}
                                {index + 1}
                            </div>
                        ))}
                    </section>
                )
            case "checkbox":
                return (
                    <section>


                    </section>
                )
        }
    }

    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                // Is token a identicator for user?
                const response = await axios.get('/api/surveys', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`,
                        "Content-Type": "application/json",
                    }
                })
                setSurveyData(response.data);
                console.log("Survey data fetched successfully:", response.data);
            } catch (error) {
                console.error("Error fetching survey data:", error);
            }
        }

        fetchSurveyData();
    }, [])

    const HandleRateClick = (_index: number) => {


    }

    // move the selected survey to center of screen and focus that survey is current idea for survey system
    // might be there is better options for that
    // I want to gameify the survey system, so that user can have fun while filling the survey
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mt-16'
        >
            <SectionHeader title='Surveys' titleClassName='mt-4' />
            <section className='flex flex-wrap justify-center items-center'>
                {surveyData?.surveys?.map((survey: any) => (
                    <div key={survey.id} className="container m-4 w-2/5 min-w-96 items-center justify-center border border-gray-300 rounded-lg shadow-md overflow-hidden">
                        <section className={`p-4 flex flex-row gap-4 items-center bg-copper-coin/50 justify-between cursor-pointer ${expandedSurveys.includes(survey.id) ? "border-b-2 border-border" : ""}`} onClick={() => HandleExpandedSurveys(survey.id)}>
                            <div className='flex flex-row gap-4 items-center'>
                                {HandleIcon(survey.icon)}
                                <p className='text-lg font-semibold'>{survey.title}</p>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedSurveys.includes(survey.id) ? -90 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronLeft className='h-5 w-5' />
                            </motion.div>
                        </section>
                        <AnimatePresence>
                            {expandedSurveys.includes(survey.id) && (
                                <motion.section
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className='px-6 pt-0 overflow-hidden'
                                >
                                    <p className='pt-4'>{survey.description}</p>
                                    {survey.questions.map((question: any) => (
                                        <div key={question.id} className='p-4'>
                                            <p className='font-semibold'>{question.question}</p>
                                            {HandleQuestions(question.type, question.options, question.scale)}
                                        </div>
                                    ))}
                                </motion.section>
                            )}
                        </AnimatePresence>
                    </div>
                ))
                }

            </section >


        </motion.div >
    )
}

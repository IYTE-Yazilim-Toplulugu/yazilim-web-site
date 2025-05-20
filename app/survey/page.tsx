"use client";
import { SectionHeader } from '@/components/ui/section-container';
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, Circle, Code, Scroll, Ticket, User, X } from 'lucide-react';

import { SurveyData } from '@/lib/pseudo';
import axios from 'axios';
import API from '@/lib/api';
import { Button } from '@/components/ui/button';

export default function Survey() {
    const containerRef = useRef(null);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [surveyData, setSurveyData] = useState(SurveyData);
    const [focusedId, setFocusedId] = useState<number | null>();
    const [activeOptions, setActiveOptions] = useState([]);
    const api = API

    // Form Handling
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

    // there will be some emojis or icons for each survey
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

    const HandleRateClick = (_index: number) => {


    }

    // Data fetching
    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const response = await axios.get(`${api}/surveys`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "application/json",
                    }
                })
                setSurveyData(response.data);
                console.log("Response: ", response.data);
            } catch (error) {
                console.error("Error fetching survey data:", error);
            }
        }

        fetchSurveyData();
    }, [])


    // I can use this to get the mouse position and animate the surveys around
    useEffect(() => {
        const handleMouseMove = (e: any) => {
            // @ts-ignore
            const { left, top } = containerRef.current.getBoundingClientRect();
            setMouse({ x: e.clientX - left, y: e.clientY - top });
        };

        const container = containerRef.current;
        // @ts-ignore
        container.addEventListener("mousemove", handleMouseMove);
        // @ts-ignore
        return () => container.removeEventListener("mousemove", handleMouseMove);
    }, []);
    {/* animate={{ */ }
    {/*     x: (-mouse.x + 60 - index * 20) * 0.05, */ }
    {/*     y: (-mouse.y + 60 - index * 10) * 0.05, */ }
    {/* }} */ }
    {/* transition={{ type: "spring", stiffness: 80, damping: 10 }} */ }


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

            <section ref={containerRef} className={`flex flex-wrap justify-center items-center ${focusedId ? "blur-sm pointer-events-none" : ""}`}>
                {surveyData.surveys.map((survey: any) => (
                    <motion.div key={survey.id}
                        layoutId={`survey-${survey.id}`}
                        onClick={() => setFocusedId(survey.id)}
                        className="container m-4 w-2/5 min-w-96 items-center justify-center border border-border rounded-lg shadow-md overflow-hidden"
                    >
                        <section className='p-4 flex flex-row gap-4 items-center bg-copper-coin/50 justify-between cursor-pointer' onClick={() => setFocusedId(survey.id)}>
                            <div className='flex flex-row gap-4 items-center'>
                                {HandleIcon(survey.icon)}
                                <p className='text-lg font-semibold'>{survey.title}</p>
                            </div>
                        </section>
                    </motion.div>
                ))}
            </section >
            <AnimatePresence>
                {focusedId && (
                    <motion.section
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50"
                        onClick={() => setFocusedId(null)}
                    >
                        <motion.section
                            layoutId={`survey-${focusedId}`}
                            // I will customize scrollbar
                            className="relative m-4 bg-muted p-10 rounded-2xl shadow-2xl max-w-2xl w-full max-h-3/4 overflow-y-auto overflow-x-hidden scrollbar scrollbar-track-bite-tongue scrollbar-thumb-bite-tongue z-50"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Button variant="outline"
                                size="icon"
                                onClick={() => setFocusedId(null)}
                                aria-label="Close preview"
                                className="absolute top-4 right-4 text-muted-foreground hover:text-primary hover:bg-bite-tongue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-bite-tongue rounded-full"
                            >
                                <X />
                            </Button>

                            <h2 className="text-bite-tongue text-2xl font-bold">
                                {surveyData.surveys.find((s) => s.id === focusedId)?.title}
                            </h2>
                            <p className=" mt-4 text-lg">
                                {surveyData.surveys.find((s) => s.id === focusedId)?.description}
                            </p>
                            {surveyData.surveys.find((s) => s.id === focusedId)?.questions.map((question: any) => (
                                <div key={question.id} className='p-4'>
                                    <p className='font-semibold'>{question.question}</p>
                                    {HandleQuestions(question.type, question.options, question.scale)}
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                onClick={() => setFocusedId(null)}
                                className="mt-6 px-4 py-2 bg-bite-tongue text-white rounded hover:bg-bite-tongue/80 transition duration-200"
                            >
                                Submit
                            </Button>
                        </motion.section>
                    </motion.section>
                )}
            </AnimatePresence>

        </motion.div >
    )
}

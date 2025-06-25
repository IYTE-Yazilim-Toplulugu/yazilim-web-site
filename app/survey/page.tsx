"use client";
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Circle, X } from 'lucide-react';
import Image from 'next/image';

import { SurveyData } from '@/lib/pseudo';
import API from '@/lib/api';
import supabase from '@/lib/supabase';
import { SectionHeader } from '@/components/ui/section-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Slider } from '@/components/ui/slider';
import Loading from '@/components/loading';
import { QuestionFill } from '@/types/types';

export default function Survey() {
    const containerRef = useRef(null);
    // const [mouse, setMouse] = useState({ x: 0, y: 0 });

    const [surveyData, setSurveyData] = useState(SurveyData); // Survey GET Response
    const [surveyFill, setSurveyFill] = useState<QuestionFill[]>([]); // Survey Request array

    // Handler variables
    const [focusedId, setFocusedId] = useState<number | null>();
    const currentSurvey = surveyData.surveys.find((s) => s.id === focusedId);
    const [rating, setRating] = useState();
    const [loading, setLoading] = useState(true);

    const api = API


    useEffect(() => {
        if (!focusedId) {
            setSurveyFill([]);
        }
    }, [focusedId])

    const addAnswer = (survey_id: number, question_id: string, type: string, answer: string | number | boolean | null) => {
        try {
            if (surveyFill.some((item) => item.question_id === question_id)) { // might be there is more efficient solution for that
                setSurveyFill((prevState) => [...prevState.filter((item) => item.question_id !== question_id)]);
            }
            setSurveyFill((prevState) => [
                ...prevState,
                {
                    survey_id: survey_id,
                    question_id: question_id,
                    type: type,
                    answer: answer,
                },
            ])
        } catch (error) {
            console.error("Error adding answer:", error);
        }
    }

    const isAnswered = (question_id: string, answer: string | number | boolean | null) => {
        return surveyFill.find((item) => item.question_id === question_id)?.answer === answer
    };

    // Form Handling
    const HandleQuestions = (survey_id: number, question_id: string, type: string, options?: number[] | string[], placeholder?: string) => {
        switch (type) {
            case "yes_no":
                return (
                    <section className="flex flex-row gap-8">
                        <Button variant="outline"
                            onClick={() => addAnswer(survey_id, question_id, type, true)}
                            disabled={isAnswered(question_id, true)}
                            className='group p-2 m-2 flex flex-row space-x-4
                            rounded-lg bg-succulent/40 hover:bg-succulent/80
                            disabled:bg-succulent disabled:opacity-100 disabled:text-background
                            dark:disabled:text-primary cursor-pointer'>
                            <p>Yes</p>
                            <Check className="text-succulent transition-colors dark:group-hover:text-primary group-disabled:text-background dark:group-disabled:text-primary" />
                        </Button >
                        <Button variant="outline"
                            onClick={() => addAnswer(survey_id, question_id, type, false)}
                            disabled={isAnswered(question_id, false)}
                            className="group p-2 m-2 flex flex-row space-x-4
                            rounded-lg bg-destructive/40 hover:bg-destructive/80 
                            disabled:bg-destructive disabled:opacity-100 disabled:text-background 
                            dark:disabled:text-primary cursor-pointer">
                            <p>No</p>
                            <X className="text-destructive-foreground transition-colors group-hover:text-background dark:group-hover:text-primary group-disabled:text-background dark:group-disabled:text-primary" />
                        </Button>
                    </section >
                )
            case "single_choice":
                return (
                    <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {options?.map((option) => {
                            const isSelected = isAnswered(question_id, option);
                            return (
                                <div
                                    key={option}
                                    onClick={() => { !isSelected && addAnswer(survey_id, question_id, type, option) }}
                                    className={`pt-4 flex flex-row gap-4 w-fit items-center rounded-md transition-colors cursor-pointer ${isSelected ? "pointer-events-none" : ""}`}
                                >
                                    <Circle className={`w-6 h-6 transition-all ${isSelected ? "bg-muted-foreground rounded-full" : ""}`} />
                                    <Button variant="outline" disabled={isSelected} className='cursor-pointer disabled:opacity-100'>
                                        {option}
                                    </Button>
                                </div>
                            )
                        })}
                    </section>
                )
            case "number":
                return (
                    <section className='p-2'>
                        <Input placeholder={placeholder} type="number" className='border border-border rounded-lg p-2' />
                    </section>
                )
            case "text":
                return (
                    <section className='p-2'>
                        <Input placeholder={placeholder} type="text" className='border border-border rounded-lg p-2' />
                    </section>
                )
            case "multiple_choice":
                return (
                    <section>
                        {options?.map((option) => {
                            const isSelected = isAnswered(question_id, option);
                            return (
                                <div
                                    key={option}
                                    onClick={() => { !isSelected && addAnswer(survey_id, question_id, type, option) }}
                                    className={`pt-4 flex flex-row gap-4
                                w-fit items-center rounded-md
                                transition-colors cursor-pointer
                                ${isSelected ? "pointer-events-none" : ""}`}
                                >
                                    <Circle className={`w-6 h-6 transition-all ${isSelected ? "bg-muted-foreground rounded-full" : ""}`} />
                                    <Button variant="outline" disabled={isSelected} className='cursor-pointer disabled:opacity-100'>
                                        {option}
                                    </Button>
                                </div>
                            )
                        })}

                    </section>
                )
            case "rating":
                return (
                    <section className='flex flex-wrap items-center justify-start gap-4'>
                        {options?.map((option) => {
                            const isSelected = isAnswered(question_id, option);
                            return (
                                <div
                                    key={option}
                                    onClick={() => { !isSelected && addAnswer(survey_id, question_id, type, option) }}
                                    className={`pt-4 flex flex-row gap-4
                                w-fit items-center rounded-md
                                transition-colors cursor-pointer
                                ${isSelected ? "pointer-events-none" : ""}`}
                                >
                                    <Circle className={`w-6 h-6 transition-all ${isSelected ? "bg-muted-foreground rounded-full" : ""}`} />
                                    <Button variant="outline" disabled={isSelected} className='cursor-pointer disabled:opacity-100'>
                                        {option}
                                    </Button>
                                </div>
                            )
                        })}

                        {/* broken for now. I can create a new slider for this */}
                        {/* <Slider */}
                        {/*     // @ts-ignore */}
                        {/*     min={1} */}
                        {/*     max={5} */}
                        {/*     step={1} */}
                        {/*     onValueChange={(v) => setRating(v[0])} */}
                        {/*     // @ts-ignore */}
                        {/*     value={options} */}
                        {/* /> */}
                    </section>
                )
            //     case "checkbox":
            //         return (
            //             <section>
            //
            //
            //             </section>
            //         )
            //     case "date":
            //         return (
            //             <section>
            //             </section>
            //         )
            //     case "dropdown":
            //         return (
            //              <section></section>
            //         )
        }
    }

    // there will be some emojis or icons for each survey
    const HandleIcon = (icon: string) => {
        switch (icon) {
            case "user":
                return <p className='text-xl'>👨</p>
            case "feature":
                return <p className='text-xl'>🧠</p>
            case "event":
                return <p className='text-xl'>🎫</p>
            case "feedback":
                return <p className='text-xl'>📝</p>
            case "design":
                return <p className='text-xl'>🎨</p>
            case "code":
                return <p className='text-xl'>💻</p>
            default:
                return <p ><Image className="font-bold text-xl bg-gradient-to-r from-happy-hearts to-golden-nugget text-transparent bg-clip-text z-20" src="/images/yazilim.png" alt="yazilim" width={16} height={16} />
                </p>
        }
    }

    // const HandleRateClick = (_index: number) => {
    //
    //
    // }

    // Data fetching
    useEffect(() => {
        const fetchSurveyData = async () => {
            try {
                const { data, error } = await supabase
                    .from("surveys")
                    .select("*")
                    .eq("is_active", true);

                if (error) {
                    console.error("Error fetching survey data:", error);
                    throw error;
                }
                // @ts-ignore
                setSurveyData(data);
                console.log("Response: ", data);

            } catch (error) {
                console.error("Error fetching survey data:", error);
            } finally {
                setLoading(false)
            }
        }

        fetchSurveyData();
    }, [])

    // I can use this to get the mouse position and animate the surveys around
    // useEffect(() => {
    //     const handleMouseMove = (e: any) => {
    //         // @ts-ignore
    //         const { left, top } = containerRef.current.getBoundingClientRect();
    //         setMouse({ x: e.clientX - left, y: e.clientY - top });
    //     };
    //
    //     const container = containerRef.current;
    //     // @ts-ignore
    //     container.addEventListener("mousemove", handleMouseMove);
    //     // @ts-ignore
    //     return () => container.removeEventListener("mousemove", handleMouseMove);
    // }, []);
    {/* animate={{ */ }
    {/*     x: (-mouse.x + 60 - index * 20) * 0.05, */ }
    {/*     y: (-mouse.y + 60 - index * 10) * 0.05, */ }
    {/* }} */ }
    {/* transition={{ type: "spring", stiffness: 80, damping: 10 }} */ }

    if (loading) {
        return (
            <Loading />
        )
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
            <SectionHeader title='Surveys' titleClassName='mt-4 bg-clip-text text-transparent bg-gradient-to-r from-happy-hearts to-golden-nugget' decorative={false} >
                <motion.span
                    className="absolute -bottom-2 left-2 h-1 bg-primary rounded-l-full bg-gradient-to-r from-golden-nugget to-background to-99%"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.6 }}
                />
            </SectionHeader>

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
                {focusedId && currentSurvey && (
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
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setFocusedId(null)}
                                aria-label="Close preview"
                                className="group absolute top-4 right-4 text-muted-foreground hover:text-primary hover:bg-bite-tongue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-bite-tongue rounded-full"
                            >
                                <X className="transition-transform duration-800 group-hover:rotate-[180deg]" />
                            </Button>

                            <h2 className="text-bite-tongue text-2xl font-bold">
                                {currentSurvey.title}
                            </h2>
                            <p className=" mt-4 text-lg">
                                {currentSurvey.description}
                            </p>
                            {currentSurvey.questions.map((question: any) => (
                                <div key={question.id} className='py-4 sm:p-4'>
                                    <p className='font-semibold'>{question.question}</p>
                                    {HandleQuestions(currentSurvey.id,
                                        question.id,
                                        question.type,
                                        question.options,
                                        question.placeholder
                                    )}
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

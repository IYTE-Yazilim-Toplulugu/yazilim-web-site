"use client";
import { ErrorBoundary } from '@/components/error-boundary';
import RedesignedHero from '@/components/redesigned-hero';
import { SectionFallback } from '@/components/section-fallback';
import EnhancedFooter from '@/components/enhanced-footer';
import { ArrowDown, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import FreeSwiper from '@/components/freeSwiper';
import { SwiperData } from '@/lib/pseudo';
import Image from 'next/image';
import Link from 'next/link';
import AboutSection from '@/components/about-section';
import { SectionContainer } from '@/components/ui/section-container';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { motion } from 'framer-motion';
import { useIsClient } from '@/hooks/use-is-client';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading';
import ConfigurationDefaults from './conf-defaults';
import { getConfigurations } from "@/utils/config_client_util";
import { Configuration } from "@/types/types_config";
import { Announcement } from '@/types/types_announcement';
import { getAnnouncementImagePath, getAnnouncements } from '@/utils/announcement_client_util';
import handleErrorCode from '@/components/handle-error-code';


// Simple loading component
function LoadingSection({ name }: { name: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading {name} section...</p>
        </div>
    )
}

export default function Home() {
    const isClient = useIsClient()
    const [loading, setLoading] = useState(true);

    const [homeData, setHomeData] = useState<Configuration[]>(ConfigurationDefaults);
    const [announcementData, setAnnouncementData] = useState<Announcement[]>();

    // Data fetching
    useEffect(() => {
        getConfigurations(["home_hero", "home_about_us", "home_footer"]).then(x => {
            if (x.data && x.data.length > 0) {
                setHomeData(x.data);
            }
            else {
                console.error("Error fetching Home page data:", x.error);
                handleErrorCode(x.error?.code || null);
            }
            setLoading(false);
        });

        getAnnouncements().then(x => {
            if (x.data && x.data.length > 0) {
                setAnnouncementData(x.data);
            } else {
                console.error("Error fetching announcements:", x.error);
                handleErrorCode(x.error?.code || null);
            }
            setLoading(false);
        })
    }, [])

    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            setTimeout(() => {
                const el = document.querySelector(window.location.hash);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }, 300); // Delay to wait for DOM load
        }
    }, []);


    if (loading) {
        return <Loading />
    }

    return (
        <div className="min-h-screen">

            <ErrorBoundary fallback={<SectionFallback title="Hero" />}>
                <Suspense fallback={<LoadingSection name="Hero" />}>
                    <RedesignedHero home_hero={homeData.find(item => item.key === "home_hero")?.value} />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<SectionFallback title="Announcements" />}>
                <Suspense fallback={<LoadingSection name="Announcements" />}>
                    <SectionContainer id="announcements" className="relative overflow-hidden">
                        <ScrollReveal delay={0.2} >
                            <h1 className='m-12 text-2xl text-primary w-fit font-bold border-b-4 border-bite-tongue'>Announcements</h1>
                            <div className='m-8 md:m-24'>
                                {announcementData && (
                                    <FreeSwiper mode="snap" viewCount={1} spaceBetween={32} freeWidth='auto'>
                                        {announcementData.map((announcement, index) => (
                                            <div key={index} className="keen-slider__slide rounded-2xl
                                            h-fit bg-bite-tongue dark:bg-card transition-colors
                                            border-2 border-border
                                            duration-300 ease-in-out text-background dark:text-primary">
                                                <Image
                                                    src={getAnnouncementImagePath(announcement.image_path) || "/images/yazilim.png"}
                                                    alt={`${announcement.title}`}
                                                    width={1000} height={500}
                                                    className="rounded-lg object-cover aspect-video w-full h-full"
                                                />
                                                <div className='m-8  flex flex-col text-center items-center space-y-4'>
                                                    <p className='text-2xl font-bold'>{announcement.title}</p>
                                                    <p className='text-lg font-semibold'>{announcement.description}</p>
                                                </div>
                                            </div>
                                        ))}


                                        {/*     <div className="text-center space-y-4"> */}
                                        {/* <div className="keen-slider__slide rounded-2xl aspect-[1.6] w-full h-full bg-muted transition-colors duration-300 ease-in-out hover:text-white hover:bg-destructive flex items-center justify-center"> */}
                                        {/*         <p className="text-4xl font-bold">Can't find what you are looking for?</p> */}
                                        {/*         <Link href="/events"> */}
                                        {/*             <p className="text-2xl font-semibold hover:underline hover:underline-offset-2"> */}
                                        {/*                 See all events */}
                                        {/*             </p> */}
                                        {/*         </Link> */}
                                        {/*     </div> */}
                                        {/* </div> */}
                                    </FreeSwiper>)}
                            </div>
                        </ScrollReveal>
                        {/* Scroll indicator */}
                        {isClient && (
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full border border-primary/20 backdrop-blur-sm hover:bg-white/10 transition-colors"
                                        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                                    >
                                        <ArrowDown className="h-4 w-4" />
                                    </Button>
                                </motion.div>
                            </div>
                        )}
                    </SectionContainer>
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<SectionFallback title="About" />}>
                <Suspense fallback={<LoadingSection name="About" />}>
                    <AboutSection home_about_us={homeData.find(item => item.key === "home_about_us")?.value} />
                </Suspense>
            </ErrorBoundary>

            <ErrorBoundary fallback={<SectionFallback title="Footer" />}>
                <Suspense fallback={<LoadingSection name="Footer" />}>
                    <EnhancedFooter home_footer={homeData.find(item => item.key === "home_footer")?.value} />
                </Suspense>
            </ErrorBoundary>
        </div >
    )
}

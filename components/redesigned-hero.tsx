"use client"

import type React from "react"
import dynamic from 'next/dynamic';

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CustomGradientBackground } from "@/components/custom-gradient-background"
import { ScrollReveal } from "@/components/ui/scroll-reveal"
import { ArrowDown, ExternalLink } from "lucide-react"
import { useIsClient } from "@/hooks/use-is-client"
import Link from "next/link"
import { HandleIcons } from "./handle-icons"
import { HomeHeroConfig } from "@/types/types_config";
import { useTranslations } from "next-intl"

const LogoCanvas = dynamic(() => import('@/components/logo/Logo'), { ssr: false });

export default function RedesignedHero({ home_hero }: { home_hero?: HomeHeroConfig }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovered, setIsHovered] = useState(false)
    const isClient = useIsClient()

    // Safe scroll progress - only run on client
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    })

    const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
    const y = useTransform(scrollYProgress, [0, 1], [0, 100])

    const t = useTranslations('home.hero')

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
            y: ((e.clientY - rect.top) / rect.height - 0.5) * 20,
        })
    }

    const scrollToEvents = () => {
        document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
    }

    // const scrollToProjects = () => {
    //     document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
    // }

    const [displayedText, setDisplayedText] = useState("")
    const fullText = useMemo(() => home_hero?.description ?? "", [home_hero]);

    useEffect(() => {
        if (!isClient || !fullText) return;

        // Reset displayed text when fullText changes
        setDisplayedText("");

        let i = 0;
        let isActive = true; // Flag to prevent stale closures

        const startTyping = () => {
            const interval = setInterval(() => {
                if (!isActive) {
                    clearInterval(interval);
                    return;
                }

                if (i < fullText.length) {
                    setDisplayedText(fullText.substring(0, i + 1)); // Use substring instead of concatenation
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 30);
        };

        startTyping();

        return () => {
            isActive = false;
        };
    }, [fullText, isClient]);

    // Function to highlight specific terms in the text
    const highlightText = (text: string) => {
        const termsToHighlight = ["AI", "Machine Learning", "Web Development", "Software Solutions", ""]
        let highlightedText = text

        termsToHighlight.forEach((term) => {
            // Use case-insensitive regex that preserves the original casing
            const regex = new RegExp(`(${term})`, "gi")
            highlightedText = highlightedText.replace(regex, (match) => {
                return `<span class="text-primary font-semibold">${match}</span>`
            })
        })

        return highlightedText
    }

    return (
        <CustomGradientBackground className="min-h-screen flex items-center">
            <motion.div
                ref={containerRef}
                style={isClient ? { opacity, scale, y } : {}}
                className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 md:gap-12 items-center"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Left column - Text content */}
                <div className="order-2 md:order-1 text-center md:text-left">
                    <ScrollReveal>
                        <Badge variant={"outline"} className="mb-4 px-3 py-1.5 text-sm border-primary/30 text-primary"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = home_hero?.up_header.color + "80";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                            }}>
                            {home_hero?.up_header.title}
                        </Badge>
                    </ScrollReveal>

                    <ScrollReveal delay={0.1}>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
                            <span className="bg-clip-text text-transparent text-nowrap bg-gradient-to-r from-happy-hearts to-golden-nugget">
                                {home_hero?.header}
                            </span>
                        </h1>
                    </ScrollReveal>

                    {fullText && (
                        <ScrollReveal delay={0.2}>
                            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 leading-relaxed">
                                {isClient && displayedText.length === fullText.length ? (
                                    <span dangerouslySetInnerHTML={{ __html: highlightText(displayedText) }} />
                                ) : (
                                    <>
                                        {displayedText}
                                        {isClient && <span className="animate-pulse">|</span>}
                                    </>
                                )}
                            </p>
                        </ScrollReveal>
                    )}

                    <ScrollReveal delay={0.3}>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6 md:mb-8">
                            {home_hero?.workspaces.map((workspace, index) => (
                                <Badge
                                    variant="outline"
                                    key={index}
                                    className={`px-2 py-1 sm:px-3 sm:py-1.5 
                                    backdrop-blur-sm border-estragon/30
                                    transition-colors`}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = workspace.color + "80"; // optional opacity
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                    }}
                                >
                                    {workspace.content}
                                </Badge>
                            ))}
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.4}>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6 md:mb-8">
                            <Link href="/event">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={scrollToEvents}
                                    className="group relative overflow-hidden shadow-lg border-border  transition-all duration-300 bg-transparent hover:bg-happy-hearts/90 hover:shadow-happy-hearts/20 dark:bg-happy-hearts"
                                >
                                    <span className="relative z-10">{t('view_events')}</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-bite-tongue to-destructive opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                                </Button>
                            </Link>

                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="group relative overflow-hidden bg-transparent border-copper-coin/50 hover:border-copper-coin transition-colors duration-300"
                                >
                                    <span className="relative z-10">{t('contact_us')}</span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-copper-coin/30 to-golden-nugget/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Button>
                            </Link>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal delay={0.5}>
                        <div className="flex gap-4 justify-center md:justify-start">
                            {home_hero?.links.map((link, index) => (
                                <Button
                                    variant="ghost"
                                    key={index}
                                    size="icon"
                                    asChild
                                    className="rounded-full transition-all duration-300 hover:scale-110"
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = link.color + "80"; // optional opacity
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                    }}
                                >
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`link-${index}`}
                                    >
                                        <HandleIcons icon={link.icon} />
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </ScrollReveal >
                </div>

                {/* Right column - Image */}
                <div className="order-1 md:order-2 flex justify-center mb-6 md:mb-0">
                    <ScrollReveal direction="left">
                        <motion.div
                            className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 overflow-hidden"
                            animate={
                                isClient && isHovered
                                    ? {
                                        x: mousePosition.x * -0.5,
                                        y: mousePosition.y * -0.5,
                                    }
                                    : {}
                            }
                            transition={{ type: "spring", stiffness: 150, damping: 15 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <LogoCanvas />

                            {/* Decorative elements */}
                            {/*<div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500/30 rounded-full blur-xl" />*/}
                            {/*<div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500/30 rounded-full blur-xl" />*/}

                            {/* Add a subtle pulsing glow effect */}
                            {/* {isClient && ( */}
                            {/*     <motion.div */}
                            {/*         className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 mix-blend-overlay" */}
                            {/*         animate={{ */}
                            {/*             opacity: [0.2, 0.4, 0.2], */}
                            {/*         }} */}
                            {/*         transition={{ */}
                            {/*             duration: 3, */}
                            {/*             repeat: Number.POSITIVE_INFINITY, */}
                            {/*             ease: "easeInOut", */}
                            {/*         }} */}
                            {/*     /> */}
                            {/* )} */}
                        </motion.div>
                    </ScrollReveal>
                </div>

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
                                onClick={() => document.getElementById("announcements")?.scrollIntoView({ behavior: "smooth" })}
                            >
                                <ArrowDown className="h-4 w-4" />
                            </Button>
                        </motion.div>
                    </div>
                )}
            </motion.div>
        </CustomGradientBackground>
    )
}

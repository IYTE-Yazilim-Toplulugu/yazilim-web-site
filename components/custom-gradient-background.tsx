"use client"
import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useIsClient } from "@/hooks/use-is-client"
import { useTheme } from "next-themes"

interface CustomGradientBackgroundProps {
    children: ReactNode
    className?: string
}

export function CustomGradientBackground({ children, className }: CustomGradientBackgroundProps) {
    const isClient = useIsClient()
    const { theme } = useTheme()

    // Don't render animations until client-side
    if (!isClient) {
        return (
            <div className={`relative overflow-hidden ${className}`}>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 -z-10" />
                {children}
            </div>
        )
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Static gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 -z-10" />

            {/* Animated orbs for background effect */}
            {/* {theme === 'dark' && ( */}
            {/*     <div> */}
            <motion.div
                className=" absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl -z-10"
                animate={{
                    x: [0, 500, -300, 0],
                    y: [0, -200, 300, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl -z-10"
                animate={{
                    x: [0, -500, 300, 0],
                    y: [0, -200, 300, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute top-1/2 right-1/3 w-48 h-48 bg-pink-500 rounded-full blur-3xl -z-10"
                animate={{
                    x: [0, 500, -300, 0],
                    y: [0, 200, -300, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                }}
            />
            {/*     </div> */}
            {/* )} */}

            {children}
        </div>
    )
}

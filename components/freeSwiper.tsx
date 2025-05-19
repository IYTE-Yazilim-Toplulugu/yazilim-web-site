"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useState, useEffect } from "react";

// This is a good component and can configure for any page
export default function FreeSwiper({ children, mode = "free", freeWidth, viewCount, spaceBetween = 10, padding, className }: { children?: React.ReactNode, mode?: "free" | "free-snap" | "snap", freeWidth?: "center" | "auto", viewCount?: "auto" | number, spaceBetween?: number, padding?: string, className?: string }) {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    })

    const [sliderRef] = useKeenSlider({
        ...(mode !== undefined ? { mode: mode } : { mode: "free" }), // Completely free movement
        slides: {
            ...(freeWidth ? { origin: freeWidth } : {}),
            ...(viewCount !== undefined ? { perView: viewCount } : {}),
            spacing: spaceBetween
        }, // Allows smooth flow
    });

    // this will be handle with an animated loading component
    if (!mounted) {
        return <div className="w-full h-6"></div>
    } {/* Prevents layout shift */ }

    return (
        <div ref={sliderRef} className={`keen-slider ${padding} ${className}`}>
            {children}
        </div>
    );
}

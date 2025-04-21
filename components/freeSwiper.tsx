"use client";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

// This is a good component and can configure for any page
export default function FreeSwiper({ children, freeWidth, viewCount, spaceBetween = 10, padding }: { children?: React.ReactNode, freeWidth?: "center" | "auto", viewCount?: "auto" | number, spaceBetween?: number, padding?: string }) {
    const [sliderRef] = useKeenSlider({
        mode: "free", // Completely free movement
        slides: {
            ...(freeWidth ? { origin: freeWidth } : {}),
            ...(viewCount !== undefined ? { perView: viewCount } : {}),
            spacing: spaceBetween
        }, // Allows smooth flow
    });

    return (
        <div ref={sliderRef} className={`keen-slider ${padding}`}>
            {children}
        </div>
    );
}

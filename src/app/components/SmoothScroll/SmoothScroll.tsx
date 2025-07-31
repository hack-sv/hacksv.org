"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    useEffect(() => {
        // Initialize Lenis smooth scroll for absolutely no reason at all
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Light easing
            infinite: false,
            smoothWheel: true,
        });

        // Make Lenis globally available (for absolutely no reason)
        (window as typeof window & { lenis: Lenis }).lenis = lenis;

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup function
        return () => {
            lenis.destroy();
            delete (window as typeof window & { lenis?: Lenis }).lenis;
        };
    }, []);

    // This component renders nothing, it just adds smooth scroll
    return null;
}

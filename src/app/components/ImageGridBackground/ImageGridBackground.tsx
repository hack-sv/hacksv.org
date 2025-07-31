"use client";

import React, { useState, useEffect, useRef } from "react";
import { fetchAllImages } from "@/lib/cdn-image-fetcher";

// Seeded shuffle function for consistent ordering during resize
function seededShuffle<T>(array: T[], seed: number): T[] {
    const shuffled = [...array];
    let currentIndex = shuffled.length;
    let temporaryValue: T;
    let randomIndex: number;

    // Use seed to create a simple pseudo-random number generator
    let seedValue = seed;
    const random = () => {
        const x = Math.sin(seedValue++) * 10000;
        return x - Math.floor(x);
    };

    while (0 !== currentIndex) {
        randomIndex = Math.floor(random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = shuffled[currentIndex];
        shuffled[currentIndex] = shuffled[randomIndex];
        shuffled[randomIndex] = temporaryValue;
    }

    return shuffled;
}

export interface ImageGridBackgroundProps {
    /** Target image size in pixels (will be used to calculate grid dimensions) */
    targetImageSize?: number;
    /** Gap between images in pixels */
    gap?: number;
    /** Custom CSS class name */
    className?: string;
    /** Custom CDN base URL */
    cdnBaseUrl?: string;
    /** Whether to show loading state */
    showLoading?: boolean;
    /** Custom loading component */
    loadingComponent?: React.ReactNode;
    /** Callback when images are loaded */
    onImagesLoaded?: (images: string[]) => void;
    /** Callback when loading fails */
    onLoadError?: (error: Error) => void;
}

export default function ImageGridBackground({
    targetImageSize = 200,
    gap = 8,
    className = "",
    cdnBaseUrl = "https://cdn.hack.sv",
    showLoading = true,
    loadingComponent,
    onImagesLoaded,
    onLoadError,
}: ImageGridBackgroundProps) {
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dimensions, setDimensions] = useState({ columns: 4, rows: 3 });
    const [shuffleSeed] = useState(() => Math.random()); // Generate seed once per component mount
    const [baseImages, setBaseImages] = useState<string[]>([]); // Store the original shuffled images
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set()); // Track which images have loaded

    // Parallax state
    const [parallaxOffset, setParallaxOffset] = useState(0);
    const [backgroundHeight, setBackgroundHeight] = useState("100vh");
    const [scrollY, setScrollY] = useState(0);
    const containerRef = useRef<HTMLElement | null>(null);

    const totalImages = dimensions.columns * dimensions.rows;

    // Calculate dynamic grid dimensions based on viewport size and parallax
    useEffect(() => {
        const calculateGridDimensions = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            // Calculate how many images can fit with the target size and gaps
            const availableWidth = viewportWidth - gap * 2; // Account for padding

            // Use extended height for parallax effect
            const extendedHeight = viewportHeight + parallaxOffset;
            const availableHeight = extendedHeight - gap * 2;

            const imageWithGap = targetImageSize + gap;
            const columns = Math.max(
                1,
                Math.floor(availableWidth / imageWithGap)
            );
            const rows = Math.max(
                1,
                Math.floor(availableHeight / imageWithGap)
            );

            setDimensions({ columns, rows });
        };

        calculateGridDimensions();

        // Recalculate on window resize
        window.addEventListener("resize", calculateGridDimensions);
        return () =>
            window.removeEventListener("resize", calculateGridDimensions);
    }, [targetImageSize, gap, parallaxOffset]);

    // Handle individual image load events
    const handleImageLoad = (imageSrc: string) => {
        setLoadedImages((prev) => new Set(prev).add(imageSrc));
    };

    useEffect(() => {
        async function loadImages() {
            try {
                setLoading(true);
                setError(null);

                const fetchedImages = await fetchAllImages(cdnBaseUrl);

                if (fetchedImages.length === 0) {
                    setImages([]);
                    return;
                }

                // Shuffle images using seed for consistent ordering
                const shuffledImages = seededShuffle(
                    fetchedImages,
                    shuffleSeed
                );

                // Store the shuffled base images
                setBaseImages(shuffledImages);

                // Take only the number of images we need for the grid
                const gridImages = shuffledImages.slice(0, totalImages);

                // If we don't have enough images, repeat them to fill the grid
                while (gridImages.length < totalImages) {
                    const remainingSlots = totalImages - gridImages.length;
                    const imagesToAdd = shuffledImages.slice(
                        0,
                        Math.min(remainingSlots, shuffledImages.length)
                    );
                    gridImages.push(...imagesToAdd);
                }

                setImages(gridImages);
                onImagesLoaded?.(gridImages);
            } catch (err) {
                const error =
                    err instanceof Error
                        ? err
                        : new Error("Failed to load images");
                console.error(
                    "Failed to load images from CDN, using blank background:",
                    error
                );
            } finally {
                setLoading(false);
            }
        }

        loadImages();
    }, [cdnBaseUrl, onImagesLoaded, onLoadError, shuffleSeed, totalImages]);

    // Handle resizing the grid using stored base images (no reshuffling)
    useEffect(() => {
        if (baseImages.length > 0 && !loading) {
            // Use the stored shuffled images to create new grid
            const gridImages = baseImages.slice(0, totalImages);

            // If we don't have enough images, repeat them to fill the grid
            while (gridImages.length < totalImages) {
                const remainingSlots = totalImages - gridImages.length;
                const imagesToAdd = baseImages.slice(
                    0,
                    Math.min(remainingSlots, baseImages.length)
                );
                gridImages.push(...imagesToAdd);
            }

            // Only update if the array actually changed
            if (gridImages.length !== images.length) {
                setImages(gridImages);
            }
        }
    }, [totalImages, baseImages, loading, images.length]);

    // Parallax calculation and scroll handling
    useEffect(() => {
        const calculateParallax = () => {
            // Find the main content container (the one with white/transparent background)
            const mainContainer = document.querySelector(
                ".max-w-5xl"
            ) as HTMLElement;
            if (!mainContainer) return;

            containerRef.current = mainContainer;

            const containerHeight = mainContainer.scrollHeight;
            const viewportHeight = window.innerHeight;

            // Calculate parallax offset
            if (containerHeight > viewportHeight) {
                const offset = (containerHeight - viewportHeight) / 2;
                setParallaxOffset(offset);
                setBackgroundHeight(`${viewportHeight + offset + gap * 2}px`);
            } else {
                setParallaxOffset(0);
                setBackgroundHeight("100vh");
            }
        };

        const handleScroll = () => {
            // Check if Lenis is available and use its scroll value
            const lenis = (
                window as typeof window & { lenis?: { scroll: number } }
            ).lenis;
            const scrollPosition = lenis ? lenis.scroll : window.scrollY;
            setScrollY(scrollPosition * 0.5); // Move background at half speed
        };

        // Initial calculation
        calculateParallax();

        // Recalculate on resize
        const handleResize = () => {
            calculateParallax();
        };

        // Add event listeners
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        // Also listen to Lenis scroll events if available
        const lenis = (
            window as typeof window & {
                lenis?: {
                    on: (
                        event: string,
                        callback: (e: { scroll: number }) => void
                    ) => void;
                    off: (event: string) => void;
                };
            }
        ).lenis;
        if (lenis) {
            lenis.on("scroll", (e: { scroll: number }) => {
                setScrollY(e.scroll * 0.5); // Use Lenis scroll value directly
            });
        }

        // Use ResizeObserver to watch for content changes
        const resizeObserver = new ResizeObserver(calculateParallax);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
            if (lenis) {
                lenis.off("scroll");
            }
            resizeObserver.disconnect();
        };
    }, [gap]);

    // Always show cyan background
    const backgroundStyle: React.CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        backgroundColor: "#00CCFF",
    };

    // Grid style with parallax transform
    const gridStyle: React.CSSProperties = {
        position: "fixed",
        top: `${-gap}px`,
        left: `${-gap}px`,
        width: `calc(100vw + 2 * ${gap}px)`,
        height: backgroundHeight,
        zIndex: -1,
        display: "grid",
        gridTemplateColumns: `repeat(${dimensions.columns}, 1fr)`,
        gridTemplateRows: `repeat(${dimensions.rows}, 1fr)`,
        gap: `${gap}px`,
        padding: `${gap}px`,
        opacity: 1,
        overflow: "hidden",
        transform: `translateY(${-scrollY}px)`,
        transition: "none", // Disable transitions for smooth scrolling
    };

    const getImageStyle = (src: string): React.CSSProperties => ({
        width: "100%",
        height: "100%",
        aspectRatio: "1 / 1",
        objectFit: "cover",
        display: "block",
        opacity: loadedImages.has(src) ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
    });

    if (loading && showLoading) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: -1,
                    backgroundColor: "#00CCFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                className={className}
            >
                {loadingComponent || (
                    <div
                        style={{
                            color: "#6b7280",
                            fontSize: "1.125rem",
                            fontFamily: "Inter, sans-serif",
                        }}
                    >
                        Loading images...
                    </div>
                )}
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    zIndex: -1,
                    backgroundColor: "#00CCFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                className={className}
            >
                <div
                    style={{
                        color: "#ef4444",
                        fontSize: "1rem",
                        fontFamily: "Inter, sans-serif",
                        textAlign: "center",
                        padding: "20px",
                    }}
                >
                    Failed to load background images
                    <br />
                    <small style={{ color: "#6b7280" }}>{error}</small>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Always show cyan background */}
            <div style={backgroundStyle} />

            {/* Image grid that fades in when all images are loaded */}
            <div
                style={gridStyle}
                className={className}
                role="img"
                aria-label="Background image grid"
            >
                {images.map((src, index) => (
                    <img
                        key={`${src}-${index}`}
                        src={src}
                        alt=""
                        style={getImageStyle(src)}
                        onLoad={() => handleImageLoad(src)}
                        onError={(e) => {
                            // Hide broken images
                            (e.target as HTMLImageElement).style.display =
                                "none";
                        }}
                    />
                ))}
            </div>
        </>
    );
}

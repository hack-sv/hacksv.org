'use client';

import { useEffect, useState } from 'react';

interface SVGIconProps {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
}

export default function SVGIcon({ 
    src, 
    alt, 
    className = '', 
    width = 16, 
    height = 16 
}: SVGIconProps) {
    const [svgContent, setSvgContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSVG = async () => {
            try {
                const response = await fetch(src);
                const svgText = await response.text();
                
                // Parse the SVG and modify it to use currentColor
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
                const svgElement = svgDoc.querySelector('svg');
                
                if (svgElement) {
                    // Set fill to currentColor for all path elements
                    const paths = svgElement.querySelectorAll('path, circle, rect, polygon');
                    paths.forEach(path => {
                        path.setAttribute('fill', 'currentColor');
                    });
                    
                    // Set the SVG attributes
                    svgElement.setAttribute('width', width.toString());
                    svgElement.setAttribute('height', height.toString());
                    svgElement.setAttribute('fill', 'currentColor');
                    
                    // Add classes if provided
                    if (className) {
                        svgElement.setAttribute('class', className);
                    }
                    
                    setSvgContent(svgElement.outerHTML);
                }
            } catch (error) {
                console.error('Failed to load SVG:', error);
            } finally {
                setLoading(false);
            }
        };

        if (src.endsWith('.svg')) {
            fetchSVG();
        } else {
            setLoading(false);
        }
    }, [src, className, width, height]);

    // If it's not an SVG file, render as regular img
    if (!src.endsWith('.svg')) {
        return (
            <img 
                src={src} 
                alt={alt} 
                className={className}
                width={width}
                height={height}
            />
        );
    }

    // Show loading state
    if (loading) {
        return (
            <div 
                className={`${className} animate-pulse bg-gray-300`}
                style={{ width, height }}
            />
        );
    }

    // Render the inline SVG
    return (
        <div 
            className={className}
            dangerouslySetInnerHTML={{ __html: svgContent }}
        />
    );
}

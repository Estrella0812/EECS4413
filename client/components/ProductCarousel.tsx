'use client';

import React, { useRef, useState } from 'react';
import { Image } from '@/app/types/product'

export default function ProductCarousel({ images }: { images: Image[] }) {
    console.log(images[0].url)
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);

    const scrollToImage = (index: number) => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            scrollRef.current.scrollTo({
                left: width * index,
                behavior: 'smooth',
            });
            setActiveIndex(index);
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const width = scrollRef.current.offsetWidth;
            const newIndex = Math.round(scrollRef.current.scrollLeft / width);
            setActiveIndex(newIndex);
        }
    };

    return (
        <div className="relative w-full group">
            {/* Main Scroll Container */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex w-full overflow-x-hidden snap-x snap-mandatory scrollbar-hide bg-zinc-900 aspect-[5/4] rounded-2xl"
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="flex-none w-full h-full snap-center"
                    >
                    <button 
                        className="w-full h-full p-0 m-0 border-none bg-transparent cursor-pointer block"
                        onClick={() => setIsGalleryOpen(true)}
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${image.url}`}
                            alt={`Product view ${index + 1}: ${image.altText}`}
                            className="w-full h-full object-cover pointer-events-none" 
                            loading={index === 0 ? "eager" : "lazy"}
                        />
                    </button>
                    </div>
                ))}
            </div>

            {/* Manual Navigation Arrows */}
            {activeIndex > 0 && (
                <button
                    onClick={() => scrollToImage(activeIndex - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition-all"
                >
                    <div className="w-3 h-3 border-t-2 border-l-2 border-white -rotate-45 ml-1" />
                </button>
            )}

            {activeIndex < images.length - 1 && (
                <button
                    onClick={() => scrollToImage(activeIndex + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md p-3 rounded-full hover:bg-white/40 transition-all"
                >
                    <div className="w-3 h-3 border-t-2 border-r-2 border-white rotate-45 mr-1" />
                </button>
            )}

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => scrollToImage(i)}
                        className={`transition-all duration-300 rounded-full ${activeIndex === i ? 'w-6 bg-white' : 'w-2 bg-white/50'
                            } h-2`}
                    />
                ))}
            </div>

            {isGalleryOpen && (
                <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center animate-in fade-in duration-200">
                    
                    {/* Close Button */}
                    <button 
                        onClick={() => setIsGalleryOpen(false)}
                        className="absolute top-6 right-6 z-[110] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Main Big Image */}
                    <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
                        <img 
                            src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${images[activeIndex].url}`}
                            className="max-w-full max-h-[80vh] object-contain select-none shadow-2xl"
                            alt="Gallery view"
                        />

                        {/* Quick Gallery Navigation inside Modal */}
                        <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none">
                            <button 
                                onClick={(e) => { e.stopPropagation(); scrollToImage(activeIndex - 1); }}
                                className={`p-4 bg-white/5 hover:bg-white/10 rounded-full text-white pointer-events-auto transition-opacity ${activeIndex === 0 && 'hidden'}`}
                            >
                                ←
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); scrollToImage(activeIndex + 1); }}
                                className={`p-4 bg-white/5 hover:bg-white/10 rounded-full text-white pointer-events-auto transition-opacity ${activeIndex === images.length - 1 && 'hidden'}`}
                            >
                                →
                            </button>
                        </div>
                    </div>

                    {/* Thumbnail Strip (Optional) */}
                    <div className="absolute bottom-10 flex gap-3 px-4 overflow-x-auto max-w-full">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => scrollToImage(i)}
                                className={`relative flex-none w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${activeIndex === i ? 'border-blue-500 scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                            >
                                <img src={`${process.env.NEXT_PUBLIC_API_URL}/api/images/${img.url}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
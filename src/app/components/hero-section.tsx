"use client";

import { useRef, useState, useEffect } from 'react';

const TAGS = [
    { id: 1, name: 'CSS', isActive: true },
    { id: 2, name: 'JAVASCRIPT', isActive: false },
    { id: 3, name: 'OPINION', isActive: false },
    { id: 4, name: 'HTML', isActive: false },
    { id: 5, name: 'TUTORIAL', isActive: false },
    { id: 6, name: 'ANNOUNCEMENTS', isActive: false },
    { id: 7, name: 'CSS FUNDAMENTALS', isActive: false },
    { id: 8, name: 'EXPLAINER', isActive: false },
    { id: 9, name: 'REACT', isActive: false },
    { id: 10, name: 'TYPESCRIPT', isActive: false },
    { id: 11, name: 'NODE.JS', isActive: false },
    { id: 12, name: 'DESIGN', isActive: false },
    { id: 13, name: 'VUE.JS', isActive: false },
    { id: 14, name: 'PYTHON', isActive: false },
    { id: 15, name: 'BACKEND', isActive: false },
    { id: 16, name: 'FRONTEND', isActive: false },
    { id: 17, name: 'FULLSTACK', isActive: false },
    { id: 18, name: 'MOBILE', isActive: false },
    { id: 19, name: 'DEVOPS', isActive: false },
    { id: 20, name: 'API', isActive: false },
    { id: 21, name: 'DATABASE', isActive: false },
    { id: 22, name: 'TESTING', isActive: false },
    { id: 23, name: 'PERFORMANCE', isActive: false },
    { id: 24, name: 'SECURITY', isActive: false },
    { id: 25, name: 'AI & ML', isActive: false },
];

export default function HeroSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const handleResize = () => checkScrollButtons();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(checkScrollButtons, 300);
        }
    };

    return (
        <>
            {/* Sección Hero con fondo amarillo */}
            <section className="relative bg-yellow-400 mx-auto w-3/4">
                <div className="px-4 sm:px-6 md:px-8 lg:px-15 py-6 sm:py-8 lg:py-15">
                    <div className="max-w-none mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-start lg:items-center">
                            {/* Columna principal - Título */}
                            <div className="lg:col-span-2 space-y-3 lg:space-y-4">
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-sans font-[900] text-black leading-tight hover:underline hover:decoration-yellow-500 hover:underline-offset-4">
                                    Power up your<br />
                                    <span className="inline-block bg-white px-2 py-1 sm:px-3 sm:py-1 transform -rotate-1 text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">news feed</span>
                                </h1>
                                
                                {/* Subtítulo - Visible solo en móvil/tablet aquí */}
                                <div className="lg:hidden">
                                    <p className="text-sm sm:text-base text-black font-medium italic leading-relaxed">
                                        Fresh tech stories delivered with clarity and speed.
                                    </p>
                                </div>
                                
                                {/* Botones */}
                                <div className="flex flex-col sm:flex-row gap-2">
                                    <button className="bg-black text-white px-3 py-2 text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors">
                                        PREMIUM COURSES ↗
                                    </button>
                                    <button className="border-2 border-black text-black px-3 py-2 text-xs sm:text-sm font-semibold hover:bg-black hover:text-white transition-colors">
                                        LATEST ARTICLES ↗
                                    </button>
                                </div>
                            </div>
                            
                            {/* Columna derecha - Descripción solo en desktop */}
                            <div className="hidden lg:block lg:col-span-1">
                                <p className="text-sm text-black font-medium italic leading-relaxed">
                                    Fresh tech stories delivered with clarity and speed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sección Topics separada con fondo negro */}
            <section className="bg-[#181617] dark:bg-stone-800 mx-auto w-3/4">
                <div className="px-4 sm:px-6 md:px-8 lg:px-15 py-6 sm:py-8 lg:py-15">
                    <div className="max-w-none mx-auto">
                        <div className="flex flex-col gap-3 lg:gap-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg sm:text-xl font-bold text-white">Topics</h2>
                                
                                {/* Controles de navegación */}
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => scroll('left')}
                                        disabled={!canScrollLeft}
                                        className={`p-2 rounded-full border-2 transition-all text-sm ${
                                            canScrollLeft 
                                                ? 'border-white text-white hover:bg-white hover:text-black cursor-pointer' 
                                                : 'border-gray-600 text-gray-600 cursor-not-allowed'
                                        }`}
                                        aria-label="Scroll left"
                                    >
                                        ←
                                    </button>
                                    <button 
                                        onClick={() => scroll('right')}
                                        disabled={!canScrollRight}
                                        className={`p-2 rounded-full border-2 transition-all text-sm ${
                                            canScrollRight 
                                                ? 'border-white text-white hover:bg-white hover:text-black cursor-pointer' 
                                                : 'border-gray-600 text-gray-600 cursor-not-allowed'
                                        }`}
                                        aria-label="Scroll right"
                                    >
                                        →
                                    </button>
                                </div>
                            </div>
                            
                            {/* Carrusel de tags */}
                            <div className="relative">
                                <div 
                                    ref={scrollRef}
                                    onScroll={checkScrollButtons}
                                    className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                                >
                                    {TAGS.map((tag) => (
                                        
                                        <span 
                                            key={tag.id}
                                            className={`px-3 py-2 sm:px-4 text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors cursor-pointer ${
                                                tag.isActive 
                                                    ? 'bg-white text-black' 
                                                    : 'border-2 border-white text-white hover:bg-white hover:text-black'
                                            }`}
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                                
                                {/* Gradientes de fade en los bordes */}
                                <div className={`absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-[#181617] to-transparent pointer-events-none transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}></div>
                                <div className={`absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-black to-transparent pointer-events-none transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
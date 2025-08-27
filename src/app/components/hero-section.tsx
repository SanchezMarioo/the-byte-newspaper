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
        <section className="relative bg-yellow-400 px-4 py-16 lg:py-20 mx-10">
            <div className="max-w-screen mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center p-5">
                {/* Columna principal - Título y botones */}
                <div className="lg:col-span-2 space-y-8 col-span-2 p-4">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-black leading-tight mb-4">
                        Power up your<br />
                        <span className="inline-block bg-white px-4 py-2 transform -rotate-1">news feed</span>
                    </h1>
                    
                    {/* Botones */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition-colors">
                            PREMIUM COURSES ↗
                        </button>
                        <button className="border-2 border-black text-black px-6 py-3 font-semibold hover:bg-black hover:text-white transition-colors">
                            LATEST ARTICLES ↗
                        </button>
                    </div>
                </div>
                
                {/* Columna derecha - Descripción */}
                <div className="lg:col-span-1">
                    <p className="text-lg lg:text-xl text-black font-medium italic leading-relaxed">
                        Fresh tech stories delivered with clarity and speed.
                    </p>
                </div>

                {/* Sección de Topics - Carrusel interactivo */}
                </div>
                <div className="col-span-3 mt-16 lg:mt-20">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-black">Topics</h2>
                            
                            {/* Controles de navegación */}
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => scroll('left')}
                                    disabled={!canScrollLeft}
                                    className={`p-2 rounded-full border-2 transition-all ${
                                        canScrollLeft 
                                            ? 'border-black text-black hover:bg-black hover:text-white cursor-pointer' 
                                            : 'border-gray-300 text-gray-300 cursor-not-allowed'
                                    }`}
                                    aria-label="Scroll left"
                                >
                                    ←
                                </button>
                                <button 
                                    onClick={() => scroll('right')}
                                    disabled={!canScrollRight}
                                    className={`p-2 rounded-full border-2 transition-all ${
                                        canScrollRight 
                                            ? 'border-black text-black hover:bg-black hover:text-white cursor-pointer' 
                                            : 'border-gray-300 text-gray-300 cursor-not-allowed'
                                    }`}
                                    aria-label="Scroll right"
                                >
                                    →
                                </button>
                            </div>
                        </div>
                        
                        {/* Carrusel de tags */}
                        <div className="relative bg-gray-100">
                            <div 
                                ref={scrollRef}
                                onScroll={checkScrollButtons}
                                className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            >
                                {TAGS.map((tag) => (
                                    <span 
                                        key={tag.id}
                                        className={`px-4 py-2 text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors cursor-pointer ${
                                            tag.isActive 
                                                ? 'bg-black text-white' 
                                                : 'border-2 border-black text-black hover:bg-black hover:text-white'
                                        }`}
                                    >
                                        {tag.name}
                                    </span>
                                ))}
                            </div>
                            
                            {/* Gradientes de fade en los bordes */}
                            <div className={`absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-yellow-400 to-transparent pointer-events-none transition-opacity ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`}></div>
                            <div className={`absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-yellow-400 to-transparent pointer-events-none transition-opacity ${canScrollRight ? 'opacity-100' : 'opacity-0'}`}></div>
                        </div>
                    </div>
                </div>
        </section>
    )
}
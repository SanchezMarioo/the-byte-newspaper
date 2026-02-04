"use client";

import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCategoriesCache } from "@/app/context/CategoriesCacheContext";

interface Category {
  id: number;
  name: string;
  name_en?: string;
  name_es?: string;
  isActive?: boolean;
}

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const { language } = useLanguage();
  const { categories: cachedCategories, isLoading } = useCategoriesCache();
  
  // Estados para drag
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const checkScrollButtons = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    setCategories(cachedCategories);
  }, [cachedCategories]);

  // Separar el efecto para checkScrollButtons después de que categories se actualice
  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [categories]);

  // Actualizar nombres cuando cambia el idioma
  useEffect(() => {
    setCategories(prevCategories =>
      prevCategories.map(cat => ({
        ...cat,
        name: language === 'es' ? (cat.name_es || cat.name_en || "Unknown") : (cat.name_en || cat.name_es || "Unknown"),
      }))
    );
  }, [language]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      // Actualizar los botones después del scroll
      setTimeout(() => {
        checkScrollButtons();
      }, 50);
    }
  };

  // Manejadores para drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    
    // Solo iniciar drag con botón izquierdo
    if (e.button !== 0) return;
    
    setIsDragging(true);
    setStartX(e.clientX);
    setStartScrollLeft(scrollRef.current.scrollLeft);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (event: MouseEvent) => {
      if (!scrollRef.current) return;
      
      const x = event.clientX;
      const walk = (x - startX) * 0.7; // Reducido a 0.7 para movimiento más lento
      scrollRef.current.scrollLeft = startScrollLeft - walk;
      checkScrollButtons();
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startX, startScrollLeft]);

  return (
    <>
      {/* Pantalla de carga mejorada */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#181617] via-[#1f1e1e] to-black flex flex-col items-center justify-center z-50 overflow-hidden">
          {/* Fondo con efecto */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
          </div>
          
          {/* Contenido */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo con icono */}
            <div className="relative">
              <div className="w-20 h-20 border-4 border-yellow-400 rounded-lg animate-spin" style={{ animationDuration: "3s" }}></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-white rounded-lg animate-spin" style={{ animationDuration: "2s", animationDirection: "reverse" }}></div>
              <div className="absolute inset-4 flex items-center justify-center">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Texto principal */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-wider">THE BYTE</h2>
              <p className="text-gray-400 text-sm tracking-widest">Cargando categorías...</p>
            </div>
            
            {/* Barra de progreso animada */}
            <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mt-4">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full animate-pulse" style={{ width: "60%", animation: "loadingBar 2s ease-in-out infinite" }}></div>
            </div>
          </div>
          
          {/* Estilos CSS para animación personalizada */}
          <style jsx>{`
            @keyframes loadingBar {
              0%, 100% {
                width: 40%;
                opacity: 0.3;
              }
              50% {
                width: 80%;
                opacity: 1;
              }
            }
          `}</style>
        </div>
      )}

      {/* Contenido principal */}
      {!isLoading && (
        <>
          {/* Sección Hero con fondo amarillo */}
          <section className="relative bg-yellow-400 mx-auto w-3/4">
        <div className="px-4 sm:px-6 md:px-8 lg:px-15 py-6 sm:py-8 lg:py-15">
          <div className="max-w-none mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-start lg:items-center">
              {/* Columna principal - Título */}
              <div className="lg:col-span-2 space-y-3 lg:space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-sans font-[900] text-black leading-tight hover:underline hover:decoration-yellow-500 hover:underline-offset-4">
                  Power up your
                  <br />
                  <span className="inline-block bg-white px-2 py-1 sm:px-3 sm:py-1 transform -rotate-1 text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl">
                    news feed
                  </span>
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
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Topics
                </h2>

                {/* Controles de navegación */}
                <div className="flex gap-2">
                  <button
                    onClick={() => scroll("left")}
                    disabled={!canScrollLeft}
                    className={`p-2 rounded-full border-2 transition-all text-sm ${
                      canScrollLeft
                        ? "border-white text-white hover:bg-white hover:text-black cursor-pointer"
                        : "border-gray-600 text-gray-600 cursor-not-allowed"
                    }`}
                    aria-label="Scroll left"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => scroll("right")}
                    disabled={!canScrollRight}
                    className={`p-2 rounded-full border-2 transition-all text-sm ${
                      canScrollRight
                        ? "border-white text-white hover:bg-white hover:text-black cursor-pointer"
                        : "border-gray-600 text-gray-600 cursor-not-allowed"
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
                  onMouseDown={handleMouseDown}
                  className={`flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2 select-none transition-all ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {categories.map((tag) => (
                    <span
                      key={tag.id}
                      onMouseDown={handleMouseDown}
                      className={`px-3 py-2 uppercase sm:px-4 text-xs sm:text-sm font-semibold whitespace-nowrap flex-shrink-0 transition-colors select-none ${
                        isDragging ? 'cursor-grabbing' : 'cursor-grab'
                      } ${
                        tag.isActive
                          ? "bg-white text-black"
                          : "border-2 border-white text-white hover:bg-white hover:text-black"
                      }`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Gradientes de fade en los bordes */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-r from-[#181617] to-transparent pointer-events-none transition-opacity ${canScrollLeft ? "opacity-100" : "opacity-0"}`}
                ></div>
                <div
                  className={`absolute right-0 top-0 bottom-0 w-6 sm:w-8 bg-gradient-to-l from-black to-transparent pointer-events-none transition-opacity ${canScrollRight ? "opacity-100" : "opacity-0"}`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </>
      )}
    </>
  );
}

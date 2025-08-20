"use client";

import Link from "next/link";
import { BrightnessLow, Moon, Rss} from "@mynaui/icons-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Por defecto modo oscuro

  // Cargar preferencia del localStorage al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else {
      // Si no hay preferencia guardada, usar la preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Aplicar la clase al documento cuando cambie el modo
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="p-4">
      <div className="grid grid-cols-3 h-32 border-b border-black dark:border-white">
        {/* Columna 1: Título principal */}
        <div className="border-r border-black dark:border-white flex items-center justify-center">
          <h1 className="text-8xl font-bold font-display text-black dark:text-white">The Byte</h1>
        </div>
        
        {/* Columna 2: Descripción */}
        <div className="border-r border-black dark:border-white flex flex-col justify-center px-6 font-display">
          <h2 className="text-lg font-semibold mb-1 text-black dark:text-white">Front-end education</h2>
          <p className="text-lg text-black dark:text-white">for the real world.</p>
          <p className="text-sm italic mt-2 text-black dark:text-white">Since 2018.</p>
        </div>
        
        {/* Columna 3: Información adicional */}
        <div className="flex items-end justify-start font-display p-5">
          <p className="text-mds">
            From <a href="https://mariosanchez.store" className="underline font-semibold text-black dark:text-white">mariosanchez.store</a>
          </p>
        </div>
      </div>
      <nav className="mt-4 p-4 flex justify-between">
        <ul className="flex space-x-4 font-display text-neutral-200 text-lg font-semibold ">
          <li><Link href="/" className="hover:underline text-black dark:text-white">Articles</Link></li>
          <li><Link href="/about" className="hover:underline  text-black dark:text-white">Links</Link></li>
          <li><Link href="/contact" className="hover:underline  text-black dark:text-white">Courses</Link></li>
          <li><Link href="/contact" className="hover:underline text-black dark:text-white">Newsletter</Link></li>
        </ul>
        <div className="flex items-center ">
          <div className="pr-4 border-black dark:border-white border-r">
            <button 
              onClick={toggleTheme}
              className="p-4 hover:bg-gray-200 dark:hover:bg-black group transition duration-200 cursor-pointer rounded-lg"
              aria-label={`Cambiar a modo ${isDarkMode ? 'claro' : 'oscuro'}`}
            >
              {isDarkMode ? (
                <BrightnessLow className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
              )}
            </button>
          </div>
          <div className="p-4">
              <Rss className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
          </div>
        </div>
  
        
      </nav>
    </header>
  );
}

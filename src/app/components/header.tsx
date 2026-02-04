"use client";

import Link from "next/link";
import { BrightnessLow, Moon, Rss, Menu, X } from "@mynaui/icons-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { useCategoriesCache } from "@/app/context/CategoriesCacheContext";


export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Por defecto modo oscuro
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { refreshCategories } = useCategoriesCache();

  // Cargar preferencia del localStorage al montar el componente
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Si no hay preferencia guardada, usar la preferencia del sistema
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);

  // Aplicar la clase al documento cuando cambie el modo
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
  };

  return (
    <header className="mx-auto w-[78%]">
      <div className="p-4 2xl:p-8">
        <div className="grid grid-cols-1 2xl:grid-cols-3 gap-0 h-auto 2xl:h-32 2xl:border-b 2xl:border-black dark:2xl:border-white">
          {/* Columna 1: Título principal */}
          <div className="2xl:border-r 2xl:border-black dark:2xl:border-white flex items-center justify-center p-2 2xl:p-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-7xl font-bold font-display text-black dark:text-white text-center">
              The Byte
            </h1>
          </div>

          {/* Columna 2: Descripción */}
          <div className="2xl:border-r 2xl:border-black dark:2xl:border-white flex flex-col justify-center px-4 2xl:px-6 font-display py-2 2xl:py-0 text-center 2xl:text-left">
            <h2 className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg font-semibold mb-1 text-black dark:text-white">
              Breaking the news
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg text-black dark:text-white">
              byte by byte.
            </p>
            <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-sm italic mt-1 2xl:mt-2 text-black dark:text-white">
              Since 2025
            </p>
          </div>

          {/* Columna 3: Información adicional */}
          <div className="flex items-end justify-center 2xl:justify-start font-display p-2 2xl:p-4 text-center 2xl:text-left">
            <p className="text-xs sm:text-sm md:text-sm lg:text-sm xl:text-sm 2xl:text-md text-black dark:text-white">
              From{" "}
              <a
                href="https://mariosanchez.store"
                className="underline font-semibold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              >
                mariosanchez.store
              </a>
            </p>
          </div>
        </div>

        <nav className="mt-2 2xl:mt-4 p-2 2xl:p-4">
          {/* Mobile menu button */}
          <div className="flex justify-between items-center 2xl:hidden mb-4">
            <div className="flex items-center space-x-2 space-y-3">
              <button
                onClick={toggleLanguage}
                className="px-3 py-2 text-xs font-semibold bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition duration-200 text-black dark:text-white"
                aria-label="Toggle language"
              >
                {language.toUpperCase()}
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 group transition duration-200 cursor-pointer rounded-lg"
                aria-label={`Cambiar a modo ${isDarkMode ? "claro" : "oscuro"}`}
              >
                {isDarkMode ? (
                  <BrightnessLow className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
                )}
              </button>
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 rounded-lg">
                <Rss className="w-5 h-5 text-gray-700 dark:text-gray-300 p-2" />
              </button>
            </div>
            <button
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200 rounded-lg"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`2xl:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "block opacity-100" : "hidden opacity-0"} mb-4`}
          >
            <ul className="flex flex-col space-y-3 font-display text-base font-semibold bg-gray-50 dark:bg-[#181617] rounded-lg p-4">
              <li>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded hover:underline text-black dark:text-white transition-colors"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded hover:underline text-black dark:text-white transition-colors"
                >
                  Links
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded hover:underline text-black dark:text-white transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 px-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded hover:underline text-black dark:text-white transition-colors"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Desktop menu */}
          <div className="hidden 2xl:flex 2xl:items-center 2xl:justify-between">
            <ul className="flex space-x-4 font-display text-gray-800 dark:text-gray-100 text-lg font-semibold">
              <li>
                <Link
                  href="/"
                  className="hover:underline text-black dark:text-white"
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:underline text-black dark:text-white"
                >
                  Links
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:underline text-black dark:text-white"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:underline text-black dark:text-white"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
            <div className="flex items-center ml-4 gap-2">
              <div className="pr-4 border-r border-black dark:border-white">
                <button
                  onClick={toggleTheme}
                  className="p-3 hover:bg-gray-200 dark:hover:bg-black group transition duration-200 cursor-pointer rounded-lg"
                  aria-label={`Cambiar a modo ${isDarkMode ? "claro" : "oscuro"}`}
                >
                  {isDarkMode ? (
                    <BrightnessLow className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" />
                  )}
                </button>
              </div>
              <div className="p-2">
                <button
                  onClick={toggleLanguage}
                  className="px-4 py-2 text-sm font-semibold bg-gray-200 dark:bg-[#181617] hover:bg-gray-300 dark:hover:bg-bg-[#181617]  transition duration-200 text-black dark:text-white  border-black dark:border-white pr-4"
                  aria-label="Toggle language"
                >
                  {language.toUpperCase()}
                </button>
                <button onClick={refreshCategories}>
                  Actualizar Categorías
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

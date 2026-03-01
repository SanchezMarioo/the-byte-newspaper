"use client";

import Link from "next/link";
import Header from "@/app/components/header";
import { useCategoriesCache } from "@/app/context/CategoriesCacheContext";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CategoriesPage() {
  const { categories, isLoading } = useCategoriesCache();
  const { language } = useLanguage();

  return (
    <>
      <Header />
      <main className="bg-stone-200 dark:bg-[#181617] text-black dark:text-white min-h-screen transition-colors duration-300">
        <div className="w-3/4 mx-auto py-8">
          {/* Header de sección */}
          <div className="border-t border-b border-black dark:border-white py-6 mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display ml-2 -rotate-1 inline-block bg-yellow-300 dark:bg-gray-950">
              {language === "es" ? "Categorías" : "Categories"}
            </h2>
          </div>

          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-12">
              Loading categories...
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-black dark:border-white">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.id}`}
                  className="border-r border-b border-black dark:border-white p-8 group hover:bg-yellow-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <h3 className="text-xl lg:text-2xl font-bold font-display text-gray-900 dark:text-white group-hover:underline group-hover:decoration-yellow-400 group-hover:underline-offset-4">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

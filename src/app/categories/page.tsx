"use client";

import Link from "next/link";
import Header from "@/app/components/header";
import { useCategoriesCache } from "@/app/context/CategoriesCacheContext";
import { useArticlesCache } from "@/app/context/ArticlesCacheContext";
import { useLanguage } from "@/app/context/LanguageContext";

export default function CategoriesPage() {
  const { categories, isLoading: categoriesLoading } = useCategoriesCache();
  const { articles, isLoading: articlesLoading } = useArticlesCache();
  const { language } = useLanguage();

  const isLoading = categoriesLoading || articlesLoading;

  const getArticleCount = (categoryId: number) =>
    articles.filter((a) => a.category_id === categoryId).length;

  const getLatestArticle = (categoryId: number) =>
    articles
      .filter((a) => a.category_id === categoryId)
      .sort(
        (a, b) =>
          new Date(b.published_at_formatted).getTime() -
          new Date(a.published_at_formatted).getTime()
      )[0];

  return (
    <>
      <Header />
      <main className="bg-stone-200 dark:bg-[#181617] text-black dark:text-white min-h-screen transition-colors duration-300">
        <div className="w-3/4 mx-auto py-8">

          {/* Page header */}
          <div className="border-t border-b border-black dark:border-white py-6 mb-10 flex items-baseline justify-between">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white -rotate-1 inline-block bg-yellow-300 dark:bg-gray-950 px-2">
              {language === "es" ? "Categorías" : "Categories"}
            </h1>
            {!isLoading && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {categories.length} {language === "es" ? "temas" : "topics"}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="py-20 text-center text-gray-500 dark:text-gray-400">
              {language === "es" ? "Cargando..." : "Loading..."}
            </div>
          ) : categories.length === 0 ? (
            <div className="py-20 text-center text-gray-500 dark:text-gray-400">
              {language === "es" ? "No hay categorías disponibles." : "No categories available."}
            </div>
          ) : (
            /* Grid: border-l y border-t en contenedor; cada celda tiene border-r y border-b */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-black dark:border-white">
              {categories.map((category) => {
                const count = getArticleCount(category.id);
                const latest = getLatestArticle(category.id);

                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.id}`}
                    className="group flex flex-col justify-between p-8 border-r border-b border-black dark:border-white transition-colors hover:bg-yellow-100 dark:hover:bg-gray-800 min-h-[180px]"
                  >
                    {/* Top: article count + arrow */}
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400 border border-gray-400 dark:border-gray-600 px-2 py-1">
                        {count} {count === 1
                          ? (language === "es" ? "artículo" : "article")
                          : (language === "es" ? "artículos" : "articles")}
                      </span>
                      <span className="text-gray-400 dark:text-gray-600 text-xl group-hover:text-black dark:group-hover:text-white transition-colors">
                        →
                      </span>
                    </div>

                    {/* Bottom: category name + latest article */}
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold font-display leading-tight mb-3 group-hover:underline group-hover:decoration-yellow-400 group-hover:underline-offset-4">
                        {category.name}
                      </h2>
                      {latest ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-snug line-clamp-2">
                          <span className="font-semibold not-italic">
                            {language === "es" ? "Último: " : "Latest: "}
                          </span>
                          <span className="italic">{latest.title}</span>
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400 dark:text-gray-600 italic">
                          {language === "es" ? "Sin artículos aún" : "No articles yet"}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

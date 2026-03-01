"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/app/components/header";
import { useArticlesCache } from "@/app/context/ArticlesCacheContext";
import { useCategoriesCache } from "@/app/context/CategoriesCacheContext";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = parseInt(params.id as string);
  const { articles, isLoading: articlesLoading } = useArticlesCache();
  const { categories, isLoading: categoriesLoading } = useCategoriesCache();

  const category = categories.find((c) => c.id === categoryId);
  const filteredArticles = articles.filter(
    (article) => article.category_id === categoryId
  );

  const isLoading = articlesLoading || categoriesLoading;

  return (
    <>
      <Header />
      <main className="bg-stone-200 dark:bg-[#181617] text-black dark:text-white min-h-screen transition-colors duration-300">
        <div className="w-3/4 mx-auto py-8">
          {/* Breadcrumb */}
          <div className="mb-4">
            <Link
              href="/categories"
              className="text-sm font-semibold hover:underline text-blue-600 dark:text-blue-400"
            >
              ← All Categories
            </Link>
          </div>

          {/* Header de sección */}
          <div className="border-t border-b border-black dark:border-white py-6 mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display ml-2 -rotate-1 inline-block bg-yellow-300 dark:bg-gray-950">
              {category?.name ?? "Category"}
            </h2>
          </div>

          {isLoading ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-12">
              Loading...
            </p>
          ) : filteredArticles.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-12">
              No articles in this category yet.
            </p>
          ) : (
            <div className="border-b border-black dark:border-white">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/articles/${article.id}`}>
                  <div className="flex flex-col lg:flex-row border-t border-black dark:border-white cursor-pointer hover:bg-yellow-100 dark:hover:bg-gray-800 transition-colors">
                    {/* Columna izquierda - Autor y fecha */}
                    <div className="w-full lg:w-1/3 p-4 sm:p-6 lg:p-8 lg:border-r border-black dark:border-white">
                      <p className="text-sm italic mb-2 lg:mb-4">
                        By <span className="font-semibold">{article.author}</span>
                      </p>
                      <p className="text-sm mb-4 lg:mb-0">{article.date}</p>
                    </div>
                    {/* Columna derecha - Título, descripción, tags */}
                    <div className="w-full lg:w-2/3 p-4 sm:p-6 lg:p-8 border-t border-black dark:border-white lg:border-t-0">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold mb-3 lg:mb-4 leading-tight">
                        {article.title}
                      </h3>
                      <p className="text-sm sm:text-base mb-4 lg:mb-6 leading-relaxed">
                        {article.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="border border-black dark:border-white px-2 py-1 text-xs font-semibold uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

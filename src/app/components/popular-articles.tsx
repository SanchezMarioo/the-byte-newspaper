"use client";

import Link from "next/link";
import { useState } from "react";
import { useArticlesCache } from "@/app/context/ArticlesCacheContext";

type FilterMode = "THIS_MONTH" | "ALL_TIME";

export function PopularArticles() {
    const { articles, isLoading } = useArticlesCache();
    const [filter, setFilter] = useState<FilterMode>("THIS_MONTH");

    const getFilteredArticles = () => {
        const sorted = [...articles].sort(
            (a, b) =>
                new Date(b.published_at_formatted).getTime() -
                new Date(a.published_at_formatted).getTime()
        );

        if (filter === "THIS_MONTH") {
            const now = new Date();
            const thisMonth = sorted.filter((article) => {
                const articleDate = new Date(article.published_at_formatted);
                return (
                    articleDate.getMonth() === now.getMonth() &&
                    articleDate.getFullYear() === now.getFullYear()
                );
            });
            return thisMonth.slice(0, 6);
        }

        return sorted.slice(0, 6);
    };

    const displayedArticles = getFilteredArticles();

    if (isLoading) {
        return (
            <section className="bg-stone-200 dark:bg-[#181617] mx-4 sm:mx-6 md:mx-8 lg:mx-10 p-4">
                <div className="w-[79%] mx-auto py-12 text-center text-gray-500 dark:text-gray-400">
                    Loading articles...
                </div>
            </section>
        );
    }

    return (
        <section className="bg-stone-200 dark:bg-[#181617] mx-4 sm:mx-6 md:mx-8 lg:mx-10 p-4">
            <div className="w-[79%] mx-auto">
                {/* Header con título y filtros */}
                <div className="border-t border-b border-black dark:border-white py-6 flex justify-between items-center">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white font-display ml-2 -rotate-1 inline-block bg-yellow-300 dark:bg-gray-950">
                        Popular Articles
                    </h2>
                    <div className="flex gap-0">
                        <button
                            onClick={() => setFilter("THIS_MONTH")}
                            className={`px-4 py-2 text-sm font-semibold transition-colors ${
                                filter === "THIS_MONTH"
                                    ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                                    : "border-2 border-gray-900 text-gray-900 dark:border-white dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black"
                            }`}
                        >
                            THIS MONTH
                        </button>
                        <button
                            onClick={() => setFilter("ALL_TIME")}
                            className={`px-4 py-2 text-sm font-semibold transition-colors ${
                                filter === "ALL_TIME"
                                    ? "bg-gray-900 text-white dark:bg-white dark:text-black"
                                    : "border-2 border-gray-900 text-gray-900 dark:border-white dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black"
                            }`}
                        >
                            ALL TIME
                        </button>
                    </div>
                </div>

                {/* Grid de artículos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {displayedArticles.length === 0 ? (
                        <p className="col-span-3 text-gray-500 dark:text-gray-400 text-center py-12">
                            No articles published this month.
                        </p>
                    ) : (
                        displayedArticles.map((article, index) => (
                            <Link
                                key={article.id}
                                href={`/articles/${article.id}`}
                                className="contents"
                            >
                                <article
                                    className={`group p-6 lg:p-8 border-black/80 dark:border-white flex flex-col ${
                                        (index % 3) < 2 ? 'lg:border-r' : ''
                                    } ${index < 3 ? 'lg:border-b' : ''} cursor-pointer transition-all`}>
                                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-4 leading-tight font-display group-hover:underline group-hover:decoration-yellow-400 group-hover:underline-offset-4">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed font-display flex-grow">
                                        {article.description}
                                    </p>
                                    <div className="flex items-center justify-between text-sm mt-auto font-display">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-900 dark:text-white font-medium">By <span className="italic">{article.author}</span></span>
                                            <span className="text-gray-500 dark:text-gray-400">{article.date}</span>
                                        </div>
                                        <span className="border border-gray-900 dark:border-white text-gray-900 dark:text-white px-2 py-1 text-xs font-semibold">
                                            {article.tags[0] ?? ""}
                                        </span>
                                    </div>
                                </article>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

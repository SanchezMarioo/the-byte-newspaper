"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useArticlesCache } from "@/app/context/ArticlesCacheContext";
import Header from "./components/header";
import HeroSection from "./components/hero";

export default function ArticlePage() {
  const { getArticle } = useArticlesCache();
  const params = useParams();
  const articleId = parseInt(params.id as string);
  const article = getArticle(articleId);

  if (!article) {
    return (
      <div className="w-3/4 mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
        <Link href="/" className="text-blue-600 hover:underline">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <article className="bg-stone-200 dark:bg-[#181617] text-black dark:text-white transition-colors duration-300">
        <div className="w-3/4 mx-auto">
          {/* Header */}
          <HeroSection
            title={article.title}
            topic={article.tags}
            author={article.author}
            date={article.date}
          />
          <div className="flex items-center justify-center ">
            <figure className="p-4 border-2 border-white">
              <img
                src="https://img.asmedia.epimg.net/resizer/v2/22OGAWGBPJCZBNQYNALXPPYLU4.png?auth=0f806312fc221e5a51b5e81855e19f56a7435ab953505c1831eb85a59e657049&width=1200&height=675&smart=true"
                width={900}
                height={500}
              />
 
            </figure>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              {article.description}
            </p>

            <div className=" py-5 space-y-4 text-base leading-relaxed">
              {article.content
                .split("\n")
                .filter((paragraph) => paragraph.trim())
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-black dark:border-white">
            <Link
              href="/"
              className="text-sm font-semibold inline-block hover:underline text-blue-600 dark:text-blue-400"
            >
              ← Volver a artículos
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

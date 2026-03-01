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
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-wider hover:underline hover:decoration-yellow-400"
        >
          ← Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <article className="bg-stone-200 dark:bg-[#181617] text-black dark:text-white transition-colors duration-300">
        <div className="w-3/4 mx-auto pb-16">

          {/* Hero: tags, título, autor, fecha */}
          <HeroSection
            title={article.title}
            topic={article.tags}
            author={article.author}
            date={article.date}
          />

          {/* Imagen destacada */}
          {article.image_url && (
            <figure className="my-10 border border-black dark:border-white overflow-hidden">
              <img
                src={article.image_url}
                alt={article.title}
                className="w-full object-cover"
                width={900}
                height={500}
              />
            </figure>
          )}

          {/* Entradilla / descripción */}
          {article.description && (
            <p className="text-xl font-semibold leading-relaxed mb-10 pb-10 border-b border-black dark:border-white">
              {article.description}
            </p>
          )}

          {/* Cuerpo del artículo */}
          <div className="space-y-6 text-lg leading-relaxed">
            {article.content
              .split("\n")
              .filter((paragraph) => paragraph.trim())
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-black dark:border-white">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-wider hover:underline hover:decoration-yellow-400 hover:underline-offset-4"
            >
              ← Volver a artículos
            </Link>
          </div>

        </div>
      </article>
    </>
  );
}

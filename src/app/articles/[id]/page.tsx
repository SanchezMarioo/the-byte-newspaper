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
                width={700}
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
            {article.content.map((block, index) => {
              if (block.type === "h1") return <h1 key={index} className="font-display font-black text-4xl lg:text-5xl leading-tight mt-10 mb-4">{block.text}</h1>;
              if (block.type === "h2") return <h2 key={index} className="font-display font-bold text-3xl lg:text-4xl leading-tight mt-10 mb-4 border-b border-black dark:border-white pb-2">{block.text}</h2>;
              if (block.type === "h3") return <h3 key={index} className="font-display font-bold text-2xl lg:text-3xl leading-tight mt-8 mb-3">{block.text}</h3>;
              if (block.type === "h4") return <h4 key={index} className="font-display font-bold text-xl lg:text-2xl leading-tight mt-6 mb-2">{block.text}</h4>;
              if (block.type === "h5") return <h5 key={index} className="font-semibold text-lg leading-tight mt-6 mb-2">{block.text}</h5>;
              if (block.type === "h6") return <h6 key={index} className="font-semibold text-base leading-tight mt-4 mb-2 uppercase tracking-wider">{block.text}</h6>;
              if (block.type === "ul" || block.type === "ol") {
                const Tag = block.type === "ul" ? "ul" : "ol";
                return (
                  <Tag key={index} className={`space-y-4 ${block.type === "ol" ? "list-decimal" : "list-disc"} pl-6`}>
                    {block.items?.map((item, i) => (
                      <li key={i} className="leading-relaxed">
                        {item.title && <span className="font-bold">{item.title}</span>}
                        {item.body && <span className="text-gray-800 dark:text-gray-300">{item.title ? " " : ""}{item.body}</span>}
                      </li>
                    ))}
                  </Tag>
                );
              }
              return <p key={index}>{block.text}</p>;
            })}
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

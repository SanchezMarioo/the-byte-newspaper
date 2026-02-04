"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { articlesData } from "@/app/data/articles";

interface Article {
  id: number;
  author: string;
  date: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
}

interface ArticlesCacheContextType {
  articles: Article[];
  isLoading: boolean;
  getArticle: (id: number) => Article | undefined;
  getAllArticles: () => Article[];
}

const ArticlesCacheContext = createContext<ArticlesCacheContextType | undefined>(
  undefined
);

const CACHE_KEY = "articles_cache";
const CACHE_EXPIRY_HOURS = 24;

export function ArticlesCacheProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Intentar cargar del cache localStorage
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cacheTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
    const now = Date.now();

    if (
      cachedData &&
      cacheTimestamp &&
      now - parseInt(cacheTimestamp) < CACHE_EXPIRY_HOURS * 60 * 60 * 1000
    ) {
      // Cache válido, usar datos cacheados
      try {
        const parsed = JSON.parse(cachedData);
        setArticles(parsed);
        setIsLoading(false);
        return;
      } catch (error) {
        console.error("Error al parsear cache:", error);
      }
    }

    // Si no hay cache válido, usar los datos originales
    setArticles(articlesData);
    
    // Guardar en cache localStorage
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(articlesData));
      localStorage.setItem(`${CACHE_KEY}_timestamp`, now.toString());
    } catch (error) {
      console.error("Error al guardar en cache:", error);
    }

    setIsLoading(false);
  }, []);

  const getArticle = (id: number): Article | undefined => {
    return articles.find((a) => a.id === id);
  };

  const getAllArticles = (): Article[] => {
    return articles;
  };

  return (
    <ArticlesCacheContext.Provider
      value={{
        articles,
        isLoading,
        getArticle,
        getAllArticles,
      }}
    >
      {children}
    </ArticlesCacheContext.Provider>
  );
}

export function useArticlesCache() {
  const context = useContext(ArticlesCacheContext);
  if (!context) {
    throw new Error(
      "useArticlesCache debe ser usado dentro de ArticlesCacheProvider"
    );
  }
  return context;
}

"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

interface Article {
  id: number;
  author: string;
  date: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  image_url: string;
  published_at_formatted: string
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

const CACHE_KEY_BASE = "articles_cache_v2";
const CACHE_EXPIRY_HOURS = 24;
const ARTICLES_API_URL = "/api/articles";

const normalizeTags = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const pickFirstString = (...values: unknown[]): string => {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }
  return "";
};

const extractTextFromRich = (node: any): string => {
  if (!node) return "";
  if (Array.isArray(node)) {
    return node.map(extractTextFromRich).join("");
  }
  if (typeof node === "string") return node;
  if (typeof node.text === "string") return node.text;
  if (Array.isArray(node.children)) {
    return node.children.map(extractTextFromRich).join("");
  }
  return "";
};

const normalizeContent = (value: unknown): string => {
  if (!value) return "";
  if (typeof value === "string") return value;
  const root = (value as any)?.root;
  if (root?.children) {
    const paragraphs = root.children.map((child: any) =>
      extractTextFromRich(child).trim()
    );
    return paragraphs.filter(Boolean).join("\n");
  }
  return "";
};

const normalizeArticle = (raw: any, language: "es" | "en"): Article => {
  const categoryName =
    language === "es"
      ? raw?.category?.name_es || raw?.category?.name_en
      : raw?.category?.name_en || raw?.category?.name_es;
  const categoryFallback = raw?.category?.slug;
  const tags = normalizeTags(raw?.tags ?? raw?.topic ?? raw?.topics);
  const effectiveTags = tags.length
    ? tags
    : categoryName
      ? [categoryName]
      : categoryFallback
        ? [categoryFallback]
        : [];

  return {
    id: Number(raw?.id ?? raw?._id ?? 0),
    author: pickFirstString(
      raw?.author?.name,
      raw?.author?.fullName,
      raw?.author,
      raw?.authorName,
      raw?.createdBy?.name,
      raw?.createdBy?.email,
      "The Byte"
    ),
    date: pickFirstString(
      raw?.published_at_formatted,
      raw?.date,
      raw?.publishedAt,
      raw?.createdAt
    ),
    title: pickFirstString(
      language === "es" ? raw?.title_es : raw?.title_en,
      raw?.title_en,
      raw?.title_es,
      raw?.title?.value,
      raw?.title
    ),
    description: pickFirstString(
      language === "es" ? raw?.excerpt_es : raw?.excerpt_en,
      raw?.excerpt_en,
      raw?.excerpt_es,
      raw?.excerpt,
      raw?.description
    ),
    content: normalizeContent(
      language === "es"
        ? raw?.content_es ?? raw?.content_en ?? raw?.content
        : raw?.content_en ?? raw?.content_es ?? raw?.content
    ),
    tags: effectiveTags,
    image_url: pickFirstString(raw?.image_url, raw?.image?.url),
  };
};

export function ArticlesCacheProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const loadArticles = async () => {
      const cacheKey = `${CACHE_KEY_BASE}_${language}`;
      const cacheTimestampKey = `${cacheKey}_timestamp`;
      const cachedData = localStorage.getItem(cacheKey);
      const cacheTimestamp = localStorage.getItem(cacheTimestampKey);
      const now = Date.now();

      if (
        cachedData &&
        cacheTimestamp &&
        now - parseInt(cacheTimestamp, 10) <
        CACHE_EXPIRY_HOURS * 60 * 60 * 1000
      ) {
        try {
          const parsed = JSON.parse(cachedData) as Article[];
          setArticles(parsed);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error("Error al parsear cache:", error);
        }
      }

      setIsLoading(true);
      try {
        const response = await fetch(ARTICLES_API_URL);
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        const docs = Array.isArray(data?.docs) ? data.docs : [];
        const normalized = docs.map((doc: any) =>
          normalizeArticle(doc, language)
        );

        setArticles(normalized);

        try {
          localStorage.setItem(cacheKey, JSON.stringify(normalized));
          localStorage.setItem(cacheTimestampKey, now.toString());
        } catch (error) {
          console.error("Error al guardar en cache:", error);
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticles();
  }, [language]);

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

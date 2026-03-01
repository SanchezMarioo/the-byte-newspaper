"use client";

import { createContext, useContext, ReactNode, useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

export interface ListItem {
  title: string;
  body: string;
}

export interface ContentBlock {
  type: "paragraph" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "ul" | "ol";
  text: string;
  items?: ListItem[];
}

export interface Article {
  id: number;
  author: string;
  date: string;
  title: string;
  description: string;
  content: ContentBlock[];
  tags: string[];
  image_url: string;
  published_at_formatted: string;
  category_id?: number;
  category_name?: string;
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

const CACHE_KEY_BASE = "articles_cache_v6";
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

const HEADING_TAGS = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

const extractListItem = (listitem: any): ListItem => {
  let title = "";
  let bodyParts: string[] = [];
  for (const node of listitem.children || []) {
    if (node.type === "linebreak") {
      bodyParts.push(" ");
    } else if (node.type === "text") {
      // format & 1 = bold — use as title if not yet set
      if ((node.format & 1) && !title) {
        title = node.text;
      } else {
        bodyParts.push(node.text);
      }
    } else if (Array.isArray(node.children)) {
      bodyParts.push(extractTextFromRich(node));
    }
  }
  return { title, body: bodyParts.join("").trim() };
};

const normalizeContent = (value: unknown): ContentBlock[] => {
  if (!value) return [];
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((text) => ({ type: "paragraph" as const, text }));
  }
  const root = (value as any)?.root;
  if (root?.children) {
    return root.children
      .map((child: any) => {
        if (child.type === "list") {
          const listType: "ul" | "ol" = child.tag === "ol" ? "ol" : "ul";
          const items = (child.children || [])
            .filter((n: any) => n.type === "listitem")
            .map(extractListItem);
          return items.length ? { type: listType, text: "", items } : null;
        }
        const text = extractTextFromRich(child).trim();
        if (!text) return null;
        const type =
          child.type === "heading" && child.tag && HEADING_TAGS.has(child.tag)
            ? (child.tag as ContentBlock["type"])
            : "paragraph";
        return { type, text };
      })
      .filter(Boolean) as ContentBlock[];
  }
  return [];
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
    published_at_formatted: pickFirstString(
      raw?.published_at_formatted,
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
    category_id: raw?.category?.id ? Number(raw.category.id) : undefined,
    category_name: categoryName || categoryFallback || undefined,
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

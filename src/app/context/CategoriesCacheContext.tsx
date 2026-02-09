"use client";

import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { useLanguage } from "@/app/context/LanguageContext";

interface Category {
  id: number;
  name: string;
  name_en?: string;
  name_es?: string;
  isActive?: boolean;
}

interface CategoriesCacheContextType {
  categories: Category[];
  isLoading: boolean;
  refreshCategories: () => Promise<void>;
  clearCache: () => void;
}

const CategoriesCacheContext = createContext<
  CategoriesCacheContextType | undefined
>(undefined);

const CATEGORIES_CACHE_KEY = "categories_cache";
const CATEGORIES_CACHE_EXPIRY_HOURS = 24;
const REVALIDATE_ON_FOCUS = true; // Revalidar cuando vuelves a la pestaña
const REVALIDATE_INTERVAL_MINUTES = 30; // Revalidar cada 30 minutos

export function CategoriesCacheProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();

  const clearCache = () => {
    localStorage.removeItem(CATEGORIES_CACHE_KEY);
    localStorage.removeItem(`${CATEGORIES_CACHE_KEY}_timestamp`);
  };

  const fetchCategories = async (forceRefresh: boolean = false) => {
    // Intentar cargar del cache localStorage
    const cachedData = localStorage.getItem(CATEGORIES_CACHE_KEY);
    const cacheTimestamp = localStorage.getItem(
      `${CATEGORIES_CACHE_KEY}_timestamp`
    );
    const now = Date.now();
    const cacheTimestampMs = cacheTimestamp ? parseInt(cacheTimestamp, 10) : null;

    const isCacheValid =
      !!cachedData &&
      cacheTimestampMs !== null &&
      !Number.isNaN(cacheTimestampMs) &&
      now - cacheTimestampMs <
        CATEGORIES_CACHE_EXPIRY_HOURS * 60 * 60 * 1000;

    const shouldRevalidate =
      !!cachedData &&
      cacheTimestampMs !== null &&
      !Number.isNaN(cacheTimestampMs) &&
      now - cacheTimestampMs >
        REVALIDATE_INTERVAL_MINUTES * 60 * 1000;

    if (!forceRefresh && isCacheValid && !shouldRevalidate) {
      // Cache válido y no necesita revalidación, usar datos cacheados
      try {
        const parsed = JSON.parse(cachedData);
        const categoriesWithLanguage = parsed.map((cat: Category) => ({
          ...cat,
          name:
            language === "es"
              ? cat.name_es || cat.name_en || "Unknown"
              : cat.name_en || cat.name_es || "Unknown",
        }));
        setCategories(categoriesWithLanguage);
        setIsLoading(false);
        return;
      } catch (error) {
        console.error("Error al parsear cache de categorías:", error);
      }
    }

    // Si debe revalidar pero tiene cache, mostrar cache mientras actualiza en background
    if (shouldRevalidate && cachedData && !forceRefresh) {
      try {
        const parsed = JSON.parse(cachedData);
        const categoriesWithLanguage = parsed.map((cat: Category) => ({
          ...cat,
          name:
            language === "es"
              ? cat.name_es || cat.name_en || "Unknown"
              : cat.name_en || cat.name_es || "Unknown",
        }));
        setCategories(categoriesWithLanguage);
        // No setear isLoading para que no muestre "cargando"
      } catch (error) {
        console.error("Error al parsear cache de categorías:", error);
      }
    }

    // Si no hay cache válido o debe refrescar, hacer fetch desde la API
    if (forceRefresh || !isCacheValid || shouldRevalidate) {
      const shouldShowLoading = forceRefresh || !isCacheValid;
      setIsLoading(shouldShowLoading);
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();

        // Extraer el array de categorías desde data.docs
        const categoriesArray = data.docs || [];

        // Mapear los datos de la API guardando name_en y name_es
        const categoriesWithActive = categoriesArray.map(
          (category: any, index: number) => ({
            id: category.id,
            name_en: category.name_en || "Unknown",
            name_es: category.name_es || "Unknown",
            name:
              language === "es"
                ? category.name_es || category.name_en || "Unknown"
                : category.name_en || category.name_es || "Unknown",
            isActive: index === 0,
          })
        );

        setCategories(categoriesWithActive);

        // Guardar en cache localStorage
        try {
          localStorage.setItem(
            CATEGORIES_CACHE_KEY,
            JSON.stringify(categoriesWithActive)
          );
          localStorage.setItem(
            `${CATEGORIES_CACHE_KEY}_timestamp`,
            now.toString()
          );
        } catch (error) {
          console.error("Error al guardar cache de categorías:", error);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const refreshCategories = async () => {
    clearCache();
    await fetchCategories(true);
  };

  useEffect(() => {
    fetchCategories();

    // Revalidar cuando la ventana recupera el foco
    if (REVALIDATE_ON_FOCUS) {
      const handleFocus = () => {
        const cacheTimestamp = localStorage.getItem(
          `${CATEGORIES_CACHE_KEY}_timestamp`
        );
        if (cacheTimestamp) {
          const timeSinceCache = Date.now() - parseInt(cacheTimestamp);
          // Solo revalidar si han pasado más de 1 minuto desde el último fetch
          if (timeSinceCache > 60 * 1000) {
            fetchCategories();
          }
        }
      };

      window.addEventListener("focus", handleFocus);
      return () => window.removeEventListener("focus", handleFocus);
    }
  }, []);

  // Actualizar nombres cuando cambia el idioma
  useEffect(() => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) => ({
        ...cat,
        name:
          language === "es"
            ? cat.name_es || cat.name_en || "Unknown"
            : cat.name_en || cat.name_es || "Unknown",
      }))
    );
  }, [language]);

  return (
    <CategoriesCacheContext.Provider
      value={{
        categories,
        isLoading,
        refreshCategories,
        clearCache,
      }}
    >
      {children}
    </CategoriesCacheContext.Provider>
  );
}

export function useCategoriesCache() {
  const context = useContext(CategoriesCacheContext);
  if (!context) {
    throw new Error(
      "useCategoriesCache debe ser usado dentro de CategoriesCacheProvider"
    );
  }
  return context;
}

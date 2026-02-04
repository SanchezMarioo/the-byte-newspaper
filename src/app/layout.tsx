import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "./context/LanguageContext";
import { ArticlesCacheProvider } from "./context/ArticlesCacheContext";
import { CategoriesCacheProvider } from "./context/CategoriesCacheContext";

export const metadata: Metadata = {
  title: "The Byte",
  description: "Sitio web de The Byte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="font-sans antialiased bg-stone-200 dark:bg-[#181617] text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <LanguageProvider>
          <ArticlesCacheProvider>
            <CategoriesCacheProvider>
              {children}
            </CategoriesCacheProvider>
          </ArticlesCacheProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

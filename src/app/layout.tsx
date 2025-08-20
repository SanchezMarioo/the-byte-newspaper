import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

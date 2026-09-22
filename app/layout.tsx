import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import CursorManager from "@/components/shared/CursorManager";
import { AdminProvider } from "@/context/AdminContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISTE — Indian Society for Technical Education",
  description: "Empowering students through innovation, collaboration, and technical excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&family=Poppins:wght@600&family=Space+Grotesk:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#04060f] text-[#d0eee8] selection:bg-amber/30">
        <AdminProvider>
          <CursorManager />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </AdminProvider>
      </body>
    </html>
  );
}

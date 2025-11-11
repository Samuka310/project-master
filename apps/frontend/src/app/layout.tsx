import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/providers/query-provider"; // ✅ IMPORTAÇÃO CORRETA

// ✅ carrega suas fontes locais Geist
const GeistSans = localFont({
  src: "../fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const GeistMono = localFont({
  src: "../fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Meu Projeto",
  description: "Projeto com Next.js + Tailwind + Geist Font",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`} // ✅ Corrigido (G maiúsculo)
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            {children}
            <Toaster position="top-right" richColors /> {/* ← NOVO */}
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Wordle Clone",
  description: "A professional Wordle clone built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('theme') || 'system';
                var root = document.documentElement;
                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  root.setAttribute('data-theme', 'dark');
                } else {
                  root.setAttribute('data-theme', 'light');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

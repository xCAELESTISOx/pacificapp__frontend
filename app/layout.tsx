import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { QueryClientProvider } from './providers/QueryClientProvider';
import { ThemeProvider } from './providers/ThemeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: 'Система предотвращения выгорания',
  description: 'Рекомендательная система для предотвращения выгорания',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <QueryClientProvider>
            {children}
          </QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 
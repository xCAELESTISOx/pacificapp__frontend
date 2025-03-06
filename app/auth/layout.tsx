'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import authService from '@/services/authService';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Если пользователь уже авторизован, перенаправляем на дашборд
    if (typeof window !== 'undefined' && authService.isAuthenticated()) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary-600">
              Prevent<span className="text-secondary-600">Burnout</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 bg-gray-50">
        {children}
      </main>

      <footer className="py-4 bg-white border-t">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Pacificapp. Все права защищены.
        </div>
      </footer>
    </div>
  );
} 
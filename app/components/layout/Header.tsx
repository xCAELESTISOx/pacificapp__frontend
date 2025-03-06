"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/app/providers/ThemeProvider";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Проверка активного пути
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      {/* Spacer to prevent content from being hidden under the header on desktop */}
      <div className="h-[60px] md:block hidden" aria-hidden="true"></div>
      
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50 dark:bg-gray-900 dark:shadow-md transition-colors duration-300">
        <div className="container mx-auto">
          <div className="py-2">
            <div className="flex justify-between items-center">
              {/* Логотип */}
              <Link href="/" className="flex items-center gap-2">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    fill="#f3f4f6"
                    stroke="#4f46e5"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M18 10V18L24 22"
                    stroke="#4f46e5"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 18C9 13.0294 13.0294 9 18 9"
                    stroke="#e11d48"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M27 18C27 22.9706 22.9706 27 18 27"
                    stroke="#e11d48"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13 25.5C10.5 24 9 21.5 9 18.5"
                    stroke="#4f46e5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M23 10.5C25.5 12 27 14.5 27 17.5"
                    stroke="#4f46e5"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-xl font-bold text-primary-600 dark:text-primary-500">
                  Prevent<span className="text-secondary-600 dark:text-secondary-500">Burnout</span>
                </span>
              </Link>

              <div className="flex items-center gap-4">
                {/* Переключатель темы */}
                <button
                  onClick={toggleTheme}
                  aria-label={theme === "light" ? "Переключиться на темную тему" : "Переключиться на светлую тему"}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  {theme === "light" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  )}
                </button>

                {/* Мобильная кнопка меню */}
                <button
                  type="button"
                  className="md:hidden z-50"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Десктопное меню */}
              <nav className="hidden md:flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md ${
                    isActive("/dashboard")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  Дашборд
                </Link>
                <Link
                  href="/stress"
                  className={`px-3 py-2 rounded-md ${
                    isActive("/stress")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  Стресс
                </Link>
                <Link
                  href="/sleep"
                  className={`px-3 py-2 rounded-md ${
                    isActive("/sleep")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  Сон
                </Link>
                <Link
                  href="/work"
                  className={`px-3 py-2 rounded-md ${
                    isActive("/work")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  Работа
                </Link>
                <Link
                  href="/recommendations"
                  className={`px-3 py-2 rounded-md ${
                    isActive("/recommendations")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  Рекомендации
                </Link>
                <Link href="/profile" className="ml-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              </nav>
            </div>
          </div>

          {/* Мобильное меню */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-40 bg-white dark:bg-gray-900 transition-colors duration-300">
              <div className="container mx-auto h-full flex flex-col justify-start items-center pt-20 pb-10 overflow-y-auto">
                <Link
                  href="/profile"
                  className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                    isActive("/profile")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Профиль
                </Link>
                <div className="border-b border-gray-100 dark:border-gray-800 my-2 w-full"></div>
                
                <Link
                  href="/dashboard"
                  className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                    isActive("/dashboard")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Дашборд
                </Link>
                <div className="border-b border-gray-100 dark:border-gray-800 my-2 w-full"></div>
                
                <Link
                  href="/stress"
                  className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                    isActive("/stress")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Стресс
                </Link>
                <div className="border-b border-gray-100 dark:border-gray-800 my-2 w-full"></div>
                
                <Link
                  href="/sleep"
                  className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                    isActive("/sleep")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Сон
                </Link>
                <div className="border-b border-gray-100 dark:border-gray-800 my-2 w-full"></div>
                
                <Link
                  href="/work"
                  className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                    isActive("/work")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Работа
                </Link>
                <div className="border-b border-gray-100 dark:border-gray-800 my-2 w-full"></div>
                
                <Link
                  href="/recommendations"
                  className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                    isActive("/recommendations")
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900 dark:text-primary-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Рекомендации
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

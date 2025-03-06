"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

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
      
      <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
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
                <span className="text-xl font-bold text-primary-600">
                  Prevent<span className="text-secondary-600">Burnout</span>
                </span>
              </Link>

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

              {/* Десктопное меню */}
              <nav className="hidden md:flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md ${
                    isActive("/dashboard")
                      ? "bg-primary-50 text-primary-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Дашборд
                </Link>
                <Link
                  href="/stress"
                  className={`px-3 py-2 rounded-md ${
                    isActive("/stress")
                      ? "bg-primary-50 text-primary-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Стресс
                </Link>
                <Link
                  href="/sleep"
                  className={`px-3 py-2 rounded-md ${
                    isActive("/sleep")
                      ? "bg-primary-50 text-primary-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Сон
                </Link>
                <Link
                  href="/work"
                  className={`px-3 py-2 rounded-md ${
                    isActive("/work")
                      ? "bg-primary-50 text-primary-600"
                      : "hover:bg-gray-50"
                  }`}
                >
                  Работа
                </Link>
                <Link
                  href="/recommendations"
                  className={`px-3 py-2 rounded-md ${
                    isActive("/recommendations")
                      ? "bg-primary-50 text-primary-600"
                      : "hover:bg-gray-50"
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
            <div className="fixed inset-0 bg-white z-40 md:hidden flex flex-col">
              <div className="container mx-auto h-full flex flex-col">
                <div className="py-2 flex justify-between items-center">
                  {/* Логотип в меню */}
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
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
                    <span className="text-xl font-bold text-primary-600">
                      Prevent<span className="text-secondary-600">Burnout</span>
                    </span>
                  </Link>
                </div>
                <nav className="flex flex-col items-center justify-center flex-grow py-8 w-full px-6">
                  <div className="w-full max-w-xs">
                    <Link
                      href="/dashboard"
                      className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                        isActive("/dashboard")
                          ? "bg-primary-50 text-primary-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Дашборд
                    </Link>
                    <div className="border-b border-gray-100 my-2 w-full"></div>
                    
                    <Link
                      href="/stress"
                      className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                        isActive("/stress")
                          ? "bg-primary-50 text-primary-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Стресс
                    </Link>
                    <div className="border-b border-gray-100 my-2 w-full"></div>
                    
                    <Link
                      href="/sleep"
                      className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                        isActive("/sleep")
                          ? "bg-primary-50 text-primary-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Сон
                    </Link>
                    <div className="border-b border-gray-100 my-2 w-full"></div>
                    
                    <Link
                      href="/work"
                      className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                        isActive("/work")
                          ? "bg-primary-50 text-primary-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Работа
                    </Link>
                    <div className="border-b border-gray-100 my-2 w-full"></div>
                    
                    <Link
                      href="/recommendations"
                      className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                        isActive("/recommendations")
                          ? "bg-primary-50 text-primary-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Рекомендации
                    </Link>
                    <div className="border-b border-gray-100 my-2 w-full"></div>
                    
                    <Link
                      href="/profile"
                      className={`w-full block text-center px-6 py-4 rounded-md text-xl font-medium ${
                        isActive("/profile")
                          ? "bg-primary-50 text-primary-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Профиль
                    </Link>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;

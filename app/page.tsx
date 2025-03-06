'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

// Компонент анимированного заголовка
const AnimatedHeading = ({ children }: { children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);
  
  return (
    <h1 
      className={`text-4xl md:text-5xl lg:text-6xl font-bold transition-all duration-1000 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      {children}
    </h1>
  );
};

// Компонент анимированного подзаголовка
const AnimatedSubheading = ({ children, delay = 300 }: { children: React.ReactNode; delay?: number }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <p 
      className={`text-xl md:text-2xl transition-all duration-1000 transform ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      {children}
    </p>
  );
};

// Компонент для анимации появления при прокрутке
const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Анимированная статистическая карточка
const StatCard = ({ number, label, delay = 0 }: { number: string; label: string; delay?: number }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        const num = parseInt(number.replace(/[^0-9]/g, ''));
        let start = 0;
        const duration = 2000; // 2 секунды на анимацию
        const step = 15; // интервал между шагами
        const increment = Math.max(1, Math.floor(num / (duration / step)));
        
        const interval = setInterval(() => {
          start = Math.min(start + increment, num);
          setCount(start);
          
          if (start >= num) {
            clearInterval(interval);
          }
        }, step);
        
        return () => clearInterval(interval);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [inView, number, delay]);
  
  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
        {inView ? count : 0}{number.includes('%') ? '%' : '+'}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

// Компонент функциональной карточки
const FeatureCard = ({ icon, title, description, delay = 0 }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) => {
  return (
    <FadeInWhenVisible delay={delay}>
      <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
        <div className="text-blue-600 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </FadeInWhenVisible>
  );
};

// Волнистая анимация для разделителя секций
const WaveAnimation = () => {
  return (
    <div className="w-full overflow-hidden">
      <svg
        className="w-full h-24"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="fill-blue-50"
        ></path>
      </svg>
    </div>
  );
};

// Компонент FAQ с аккордеоном
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const faqs = [
    {
      question: "Что такое система мониторинга профессионального выгорания?",
      answer: "Это инновационная платформа, которая помогает отслеживать и предотвращать профессиональное выгорание. Система анализирует данные о вашем сне, стрессе и рабочей нагрузке, предоставляя персонализированные рекомендации для улучшения вашего благополучия."
    },
    {
      question: "Как система определяет риск выгорания?",
      answer: "Система использует комплексный анализ данных о сне, уровне стресса, продолжительности работы и перерывах. Алгоритмы машинного обучения помогают выявить паттерны, которые могут привести к выгоранию, и предлагают превентивные меры."
    },
    {
      question: "Является ли система заменой профессиональной медицинской помощи?",
      answer: "Нет, система не является заменой профессиональной медицинской или психологической помощи. Она предназначена для мониторинга и профилактики, и в случае серьезных проблем всегда рекомендует обратиться к специалистам."
    },
    {
      question: "Как обеспечивается безопасность моих данных?",
      answer: "Мы используем передовые технологии шифрования для защиты ваших данных. Вы также можете настроить параметры приватности в своем профиле, чтобы контролировать, какие данные используются для анализа."
    },
    {
      question: "Могу ли я использовать систему бесплатно?",
      answer: "Да, основной функционал системы доступен бесплатно. Мы также предлагаем премиум-подписку с расширенными возможностями анализа и персонализированными рекомендациями."
    }
  ];
  
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Часто задаваемые вопросы</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FadeInWhenVisible key={index} delay={index * 100}>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="flex justify-between items-center w-full p-4 text-left font-medium text-gray-900 bg-white hover:bg-gray-50"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span>{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 p-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  );
};

// Анимированная иконка пульса
const PulseIcon = () => {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-75"></div>
      <svg className="relative z-10 w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
  );
};

// Анимированная иконка сна
const SleepIcon = () => {
  return (
    <div className="w-12 h-12">
      <svg className="w-12 h-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </div>
  );
};

// Анимированная иконка работы
const WorkIcon = () => {
  return (
    <div className="w-12 h-12">
      <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </div>
  );
};

// Анимированная иконка рекомендаций
const RecommendationIcon = () => {
  return (
    <div className="w-12 h-12">
      <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>
  );
};

// Главная страница
export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Функция для плавного скролла к элементу
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Небольшой отступ для учета фиксированной навигации
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Навигация */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-blue-600 mr-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Pacificapp</span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              onClick={(e) => scrollToSection(e, 'features')}
            >
              Возможности
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              onClick={(e) => scrollToSection(e, 'how-it-works')}
            >
              Как это работает
            </a>
            <a 
              href="#faq" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
              onClick={(e) => scrollToSection(e, 'faq')}
            >
              FAQ
            </a>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/auth/login" className="px-4 py-2 text-blue-600 hover:text-blue-800 transition-colors">
              Войти
            </Link>
            <Link href="/auth/register" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
              Регистрация
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Hero секция */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <AnimatedHeading>
            Предотврати профессиональное выгорание
          </AnimatedHeading>
          
          <div className="mt-6 max-w-2xl mx-auto">
            <AnimatedSubheading delay={500}>
              Система мониторинга и профилактики выгорания поможет сохранить ваше здоровье и продуктивность
            </AnimatedSubheading>
          </div>
          
          <div className="mt-10 opacity-0 animate-[fadeIn_1s_forwards_1s]">
            <Link href="/auth/register" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg transition-colors inline-block mr-4 mb-4">
              Начать бесплатно
            </Link>
            <a href="#how-it-works" className="px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 text-lg rounded-lg transition-colors inline-block mb-4">
              Узнать больше
            </a>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto opacity-0 animate-[fadeIn_1s_forwards_1.5s]">
            <img
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
              alt="Dashboard Preview"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>
      
      {/* Статистика */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard number="76%" label="Снижение уровня стресса" delay={0} />
            <StatCard number="68%" label="Улучшение качества сна" delay={200} />
            <StatCard number="82%" label="Повышение продуктивности" delay={400} />
            <StatCard number="3000+" label="Активных пользователей" delay={600} />
          </div>
        </div>
      </section>
      
      <WaveAnimation />
      
      {/* Возможности */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <FadeInWhenVisible>
              <h2 className="text-3xl font-bold mb-4">Основные возможности</h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={200}>
              <p className="max-w-2xl mx-auto text-gray-600">
                Наша система предоставляет комплексный подход к мониторингу и профилактике профессионального выгорания
              </p>
            </FadeInWhenVisible>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<PulseIcon />}
              title="Мониторинг стресса"
              description="Отслеживайте уровень стресса и получайте рекомендации по его снижению в режиме реального времени."
              delay={0}
            />
            <FeatureCard
              icon={<SleepIcon />}
              title="Анализ сна"
              description="Анализируйте качество и продолжительность сна для оптимизации отдыха и восстановления."
              delay={200}
            />
            <FeatureCard
              icon={<WorkIcon />}
              title="Контроль работы"
              description="Мониторинг рабочей нагрузки и перерывов для достижения оптимального баланса труда и отдыха."
              delay={400}
            />
            <FeatureCard
              icon={<RecommendationIcon />}
              title="Персонализированные рекомендации"
              description="Получайте индивидуальные рекомендации на основе анализа ваших данных для предотвращения выгорания."
              delay={600}
            />
          </div>
        </div>
      </section>
      
      {/* Как это работает */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <FadeInWhenVisible>
              <h2 className="text-3xl font-bold mb-4">Как это работает</h2>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={200}>
              <p className="max-w-2xl mx-auto text-gray-600">
                Простой процесс, который поможет вам контролировать свое благополучие и предотвращать выгорание
              </p>
            </FadeInWhenVisible>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <FadeInWhenVisible>
                <div>
                  <div className="text-blue-600 text-lg font-semibold mb-2">Шаг 1</div>
                  <h3 className="text-2xl font-bold mb-4">Ввод данных</h3>
                  <p className="text-gray-600 mb-4">
                    Регулярно вносите данные о своем сне, уровне стресса и рабочей активности через удобный интерфейс.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Простая и быстрая форма ввода</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Интеграция с устройствами трекинга</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Напоминания о необходимости ввода данных</span>
                    </li>
                  </ul>
                </div>
              </FadeInWhenVisible>
              
              <FadeInWhenVisible delay={200}>
                <div className="rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80" 
                    alt="Ввод данных" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeInWhenVisible>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <FadeInWhenVisible delay={200} className="order-2 md:order-1">
                <div className="rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                    alt="Анализ данных" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeInWhenVisible>
              
              <FadeInWhenVisible className="order-1 md:order-2">
                <div>
                  <div className="text-blue-600 text-lg font-semibold mb-2">Шаг 2</div>
                  <h3 className="text-2xl font-bold mb-4">Анализ и визуализация</h3>
                  <p className="text-gray-600 mb-4">
                    Система анализирует ваши данные и предоставляет наглядные графики и диаграммы для понимания трендов и паттернов.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Динамические графики изменений</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Выявление корреляций между показателями</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Сравнение с оптимальными значениями</span>
                    </li>
                  </ul>
                </div>
              </FadeInWhenVisible>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <FadeInWhenVisible>
                <div>
                  <div className="text-blue-600 text-lg font-semibold mb-2">Шаг 3</div>
                  <h3 className="text-2xl font-bold mb-4">Персонализированные рекомендации</h3>
                  <p className="text-gray-600 mb-4">
                    Получайте конкретные рекомендации, адаптированные под ваши данные и направленные на улучшение вашего благополучия.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Индивидуальный подход к каждому пользователю</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Научно обоснованные рекомендации</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Отслеживание выполнения рекомендаций</span>
                    </li>
                  </ul>
                </div>
              </FadeInWhenVisible>
              
              <FadeInWhenVisible delay={200}>
                <div className="rounded-xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                  <img 
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                    alt="Рекомендации" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </div>
      </section>
      
      {/* Отзывы */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-3xl font-bold mb-16 text-center">Отзывы пользователей</h2>
          </FadeInWhenVisible>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeInWhenVisible delay={0}>
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg relative">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="pt-4">
                  <p className="italic mb-4">"Благодаря этой системе я смогла вовремя заметить признаки выгорания и предпринять необходимые шаги. Теперь я лучше понимаю, как мои привычки влияют на моё психическое здоровье."</p>
                  <div className="flex items-center">
                    <div className="rounded-full w-10 h-10 bg-blue-100 flex items-center justify-center text-blue-600 font-bold">АК</div>
                    <div className="ml-3">
                      <div className="font-medium">Анна Ковалева</div>
                      <div className="text-sm">Менеджер проектов</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={200}>
              <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg relative">
                <div className="absolute -top-4 left-6 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div className="pt-4">
                  <p className="italic mb-4">"Как разработчик, я часто сталкивался с переработками. Система не только помогла мне отслеживать время работы, но и научила правильно отдыхать. Моя продуктивность значительно выросла."</p>
                  <div className="flex items-center">
                    <div className="rounded-full w-10 h-10 bg-blue-100 flex items-center justify-center text-blue-600 font-bold">ДС</div>
                    <div className="ml-3">
                      <div className="font-medium">Дмитрий Соколов</div>
                      <div className="text-sm">Frontend-разработчик</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>
      
      {/* Добавим раздел FAQ, которого нет в текущей разметке */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FAQ />
        </div>
      </section>
      
      {/* Подвал сайта */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <div className="text-blue-400 mr-2">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">Pacificapp</span>
              </div>
              <p className="mt-2 text-gray-400">Сохраняйте баланс. Живите полной жизнью.</p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end space-x-4">
              <a 
                href="#features" 
                className="text-gray-400 hover:text-blue-400 transition-colors mb-2"
                onClick={(e) => scrollToSection(e, 'features')}
              >
                Возможности
              </a>
              <a 
                href="#how-it-works" 
                className="text-gray-400 hover:text-blue-400 transition-colors mb-2"
                onClick={(e) => scrollToSection(e, 'how-it-works')}
              >
                Как это работает
              </a>
              <a 
                href="#faq" 
                className="text-gray-400 hover:text-blue-400 transition-colors mb-2"
                onClick={(e) => scrollToSection(e, 'faq')}
              >
                FAQ
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Pacificapp. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
} 
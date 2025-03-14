# Burnout Prevention Frontend

## О проекте

Это фронтенд-часть приложения по предотвращению профессионального выгорания. Приложение предназначено для мониторинга и анализа факторов, влияющих на эмоциональное и физическое состояние пользователей, а также для предоставления персонализированных рекомендаций по предотвращению выгорания.

## Функциональность

- **Аутентификация**: Система регистрации и входа пользователей
- **Панель мониторинга**: Отображение ключевых показателей и статистики
- **Мониторинг сна**: Отслеживание режима и качества сна
- **Мониторинг стресса**: Измерение и анализ уровня стресса
- **Мониторинг рабочей активности**: Отслеживание рабочей нагрузки
- **Персональные рекомендации**: Рекомендации на основе собранных данных
- **Профиль пользователя**: Управление личной информацией и настройками

## Технологии

### Основные
- **Next.js** (14.1.0) - React фреймворк для разработки
- **React** (18.2.0) - JavaScript библиотека для создания пользовательских интерфейсов
- **TypeScript** (5.3.3) - Типизированный JavaScript

### Управление состоянием и работа с данными
- **React Query** (@tanstack/react-query) - Библиотека для управления состоянием и кеширования данных
- **Axios** - HTTP-клиент для выполнения запросов к API
- **Formik** - Библиотека для обработки форм
- **Yup** - Библиотека для валидации форм

### Визуализация и UI
- **Chart.js** и **react-chartjs-2** - Создание и отображение графиков
- **Tailwind CSS** - Утилитарный CSS-фреймворк для стилизации

### Утилиты
- **date-fns** - Библиотека для работы с датами
- **react-intersection-observer** - Библиотека для отслеживания пересечения элементов с viewport

## Структура проекта

```
app/
├── api/              # API роуты
├── auth/             # Компоненты и страницы аутентификации
├── components/       # Переиспользуемые компоненты
│   ├── dashboard/    # Компоненты панели управления
│   ├── recommendations/ # Компоненты рекомендаций
│   ├── auth/         # Компоненты аутентификации
│   ├── layout/       # Компоненты макета
│   └── ui/           # Базовые UI компоненты
├── dashboard/        # Страница панели управления
├── hooks/            # Пользовательские React хуки
├── profile/          # Страница профиля пользователя
├── providers/        # Провайдеры контекста
├── recommendations/  # Страница рекомендаций
├── services/         # Сервисы для работы с API
│   ├── auth/         # Сервисы аутентификации
│   ├── dashboard/    # Сервисы панели управления
│   ├── sleep/        # Сервисы мониторинга сна
│   ├── stress/       # Сервисы мониторинга стресса
│   ├── user/         # Сервисы пользователя
│   └── workActivity/ # Сервисы мониторинга рабочей активности
├── sleep/            # Страница мониторинга сна
├── stress/           # Страница мониторинга стресса
├── styles/           # Глобальные стили
├── types/            # TypeScript типы
├── utils/            # Вспомогательные функции
└── work/             # Страница мониторинга работы
```

## Запуск проекта

### Требования
- Node.js (рекомендуется версия 18.x или выше)
- Yarn или npm

### Установка зависимостей
```bash
yarn install
# или
npm install
```

### Запуск в режиме разработки
```bash
yarn dev
# или
npm run dev
```

### Сборка для production
```bash
yarn build
# или
npm run build
```

### Запуск production сборки
```bash
yarn start
# или
npm start
```

## Линтинг
```bash
yarn lint
# или
npm run lint
```

## Лицензия

Все права защищены © 2024 
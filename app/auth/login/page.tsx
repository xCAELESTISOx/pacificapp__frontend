'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    // Проверяем параметры URL для отображения сообщений
    const registered = searchParams.get('registered');
    const loggedOut = searchParams.get('logged_out');
    const sessionExpired = searchParams.get('session_expired');

    if (registered === 'true') {
      setMessage({
        text: 'Регистрация успешна! Теперь вы можете войти в свой аккаунт.',
        type: 'success',
      });
    } else if (loggedOut === 'true') {
      setMessage({
        text: 'Вы успешно вышли из системы.',
        type: 'success',
      });
    } else if (sessionExpired === 'true') {
      setMessage({
        text: 'Сессия истекла. Пожалуйста, войдите снова.',
        type: 'error',
      });
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-md">
      {message && (
        <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
          {message.text}
        </div>
      )}
      <LoginForm />
    </div>
  );
} 
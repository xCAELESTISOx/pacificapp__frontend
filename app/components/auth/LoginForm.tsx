'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { authService } from '@/services';
import Input from '../ui/Input';

const LoginForm: React.FC = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Некорректный email адрес')
        .required('Обязательное поле'),
      password: Yup.string()
        .required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      try {
        setLoginError(null);
        await authService.login(values);
        router.push('/dashboard');
      } catch (error: any) {
        console.error('Login error:', error);
        setLoginError(
          error.response?.data?.detail || 
          'Не удалось войти. Проверьте ваши учетные данные.'
        );
      }
    },
  });

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Вход в аккаунт</h2>
      
      {loginError && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
          {loginError}
        </div>
      )}
      
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <Input
            id="email"
            name="email"
            type="email"
            label="Email"
            placeholder="your@email.com"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
          />
        </div>
        
        <div className="mb-6">
          <Input
            id="password"
            name="password"
            type="password"
            label="Пароль"
            placeholder="Ваш пароль"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
          />
          <div className="mt-1 text-right">
            <Link 
              href="/auth/forgot-password" 
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Забыли пароль?
            </Link>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full btn btn-primary py-2"
        >
          {formik.isSubmitting ? 'Вход...' : 'Войти'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Нет аккаунта?{' '}
          <Link 
            href="/auth/register" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
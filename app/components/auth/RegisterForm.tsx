'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import authService from '@/services/authService';
import Input from '../ui/Input';

const RegisterForm: React.FC = () => {
  const router = useRouter();
  const [registerError, setRegisterError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      password2: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Некорректный email адрес')
        .required('Обязательное поле'),
      username: Yup.string()
        .min(3, 'Минимум 3 символа')
        .max(30, 'Максимум 30 символов')
        .required('Обязательное поле'),
      password: Yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Обязательное поле'),
      password2: Yup.string()
        .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
        .required('Обязательное поле'),
    }),
    onSubmit: async (values) => {
      try {
        setRegisterError(null);
        await authService.register(values);
        // После успешной регистрации перенаправляем на страницу входа
        router.push('/auth/login?registered=true');
      } catch (error: any) {
        console.error('Registration error:', error);
        const errorMsg = error.response?.data?.email || 
                        error.response?.data?.username || 
                        error.response?.data?.detail ||
                        'Не удалось зарегистрироваться. Попробуйте позже.';
        
        setRegisterError(Array.isArray(errorMsg) ? errorMsg[0] : errorMsg);
      }
    },
  });

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
      
      {registerError && (
        <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
          {registerError}
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
        
        <div className="mb-4">
          <Input
            id="username"
            name="username"
            label="Имя пользователя"
            placeholder="username"
            fullWidth
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.username && formik.errors.username ? formik.errors.username : undefined}
          />
        </div>
        
        <div className="mb-4">
          <Input
            id="password"
            name="password"
            type="password"
            label="Пароль"
            placeholder="Минимум 8 символов"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password ? formik.errors.password : undefined}
          />
        </div>
        
        <div className="mb-6">
          <Input
            id="password2"
            name="password2"
            type="password"
            label="Подтверждение пароля"
            placeholder="Повторите пароль"
            fullWidth
            value={formik.values.password2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password2 && formik.errors.password2 ? formik.errors.password2 : undefined}
          />
        </div>
        
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full btn btn-primary py-2"
        >
          {formik.isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Уже есть аккаунт?{' '}
          <Link 
            href="/auth/login" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm; 
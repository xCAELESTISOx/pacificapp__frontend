'use client';

import React from 'react';
import * as stylex from '@stylexjs/stylex';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const styles = stylex.create({
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
    gap: '8px',
  },
  fullWidth: {
    width: '100%',
  },
  // Варианты кнопок
  primary: {
    backgroundColor: 'var(--primary-color)',
    color: 'white',
    ':hover': {
      backgroundColor: '#2980b9',
    },
  },
  secondary: {
    backgroundColor: 'var(--secondary-color)',
    color: 'white',
    ':hover': {
      backgroundColor: '#27ae60',
    },
  },
  danger: {
    backgroundColor: 'var(--danger-color)',
    color: 'white',
    ':hover': {
      backgroundColor: '#c0392b',
    },
  },
  outline: {
    backgroundColor: 'transparent',
    color: 'var(--primary-color)',
    border: '1px solid var(--primary-color)',
    ':hover': {
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
    },
  },
  text: {
    backgroundColor: 'transparent',
    color: 'var(--primary-color)',
    ':hover': {
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
    },
  },
  // Размеры кнопок
  small: {
    padding: '6px 12px',
    fontSize: '0.875rem',
  },
  medium: {
    padding: '8px 16px',
    fontSize: '1rem',
  },
  large: {
    padding: '12px 24px',
    fontSize: '1.125rem',
  },
  // Состояние загрузки
  loading: {
    opacity: 0.7,
    pointerEvents: 'none',
  },
  // Отключенное состояние
  disabled: {
    opacity: 0.5,
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
});

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      {...stylex.props(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        isLoading && styles.loading,
        disabled && styles.disabled
      )}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};

export default Button; 
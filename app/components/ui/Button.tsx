'use client';

import React from 'react';
import clsx from 'clsx';

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

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded font-medium transition-all duration-200 focus:outline-none gap-2';
  
  const variantClasses = {
    primary: 'bg-[#3498db] hover:bg-[#2980b9] text-white',
    secondary: 'bg-[#2ecc71] hover:bg-[#27ae60] text-white',
    danger: 'bg-[#e74c3c] hover:bg-[#c0392b] text-white',
    outline: 'bg-transparent border border-[#3498db] text-[#3498db] hover:bg-[rgba(52,152,219,0.1)]',
    text: 'bg-transparent text-[#3498db] hover:bg-[rgba(52,152,219,0.1)]'
  };
  
  const sizeClasses = {
    small: 'py-1.5 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg'
  };
  
  const buttonClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    isLoading ? 'opacity-70 pointer-events-none' : '',
    disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : '',
    className
  );

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={buttonClasses}
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
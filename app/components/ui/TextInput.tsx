import React from 'react';

interface TextInputProps {
  id?: string;
  name?: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel';
  disabled?: boolean;
  error?: string;
  required?: boolean;
  className?: string;
  isEditing?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  isSaving?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  disabled = false,
  error,
  required = false,
  className = '',
  isEditing = true,
  onCancel,
  onSave,
  isSaving = false,
}) => {
  if (!isEditing) {
    return (
      <div>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}{required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="flex justify-between items-center">
          <span className="text-gray-900">{value}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {label && (
        <label htmlFor={id || name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}{required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className={onSave && onCancel ? 'flex' : ''}>
        <input
          id={id || name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled || isSaving}
          required={required}
          className={`${onSave && onCancel ? 'flex-grow' : 'w-full'} px-3 py-2 border ${
            error ? 'border-red-500' : 'border-gray-300'
          } rounded-md ${onSave && onCancel ? 'mr-2' : ''} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Отмена
          </button>
        )}
        
        {onSave && (
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="ml-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </button>
        )}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default TextInput; 
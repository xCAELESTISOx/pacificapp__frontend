import React, { useMemo } from 'react';

interface StressRangeInputProps {
  /** Current value of the range input */
  value: number;
  /** Function to handle value changes */
  onChange: (value: number) => void;
  /** Minimum value of the range (default: 0) */
  min?: number;
  /** Maximum value of the range (default: 100) */
  max?: number;
  /** Label for the minimum value (default: "Спокойствие") */
  minLabel?: string;
  /** Label for the maximum value (default: "Сильный стресс") */
  maxLabel?: string;
  /** Main label for the range input (default: "Ваш текущий уровень стресса") */
  label?: string;
  /** Whether to show the current value next to the label (default: true) */
  showValue?: boolean;
  /** Additional CSS classes for the container */
  className?: string;
  /** Format function for the displayed value (default: returns the value as is) */
  valueFormatter?: (value: number) => string | number;
}

/**
 * A reusable range input component for stress levels or other numeric inputs
 */
const StressRangeInput: React.FC<StressRangeInputProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  minLabel = 'Спокойствие',
  maxLabel = 'Сильный стресс',
  label = 'Ваш текущий уровень стресса',
  showValue = true,
  className = '',
  valueFormatter = (val) => val,
}) => {
  // Calculate the center point and percentage fill values
  const center = useMemo(() => (max + min) / 2, [min, max]);
  const percentage = useMemo(() => {
    const range = max - min;
    return ((value - min) / range) * 100;
  }, [value, min, max]);
  
  // Calculate the clip values for the gradients
  const isRightSide = value >= center;

  // Gradient definitions
  const leftGradient = 'linear-gradient(to right, #3b82f6, #10b981, #fbbf24)'; // blue -> green -> yellow
  const rightGradient = 'linear-gradient(to right, #fbbf24, #f97316, #ef4444)'; // yellow -> orange -> red

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block text-gray-700 mb-2">
          {label}{showValue && `: ${valueFormatter(value)}`}
        </label>
      )}
      
      <div className="relative w-full h-2 mb-1 overflow-hidden">
        {/* Background track */}
        <div className="absolute w-full h-full bg-gray-200 rounded-lg"></div>
        
        {/* Static gradient backgrounds - always full size */}
        <div className="absolute h-full w-1/2 left-0 rounded-l-lg" style={{ backgroundImage: leftGradient }}></div>
        <div className="absolute h-full w-1/2 right-0 rounded-r-lg" style={{ backgroundImage: rightGradient }}></div>
        
        {/* Mask to hide parts of the gradient based on value */}
        <div 
          className="absolute h-full bg-gray-200 rounded-r-lg" 
          style={{ 
            left: isRightSide ? `${percentage}%` : '50%',
            right: 0,
            zIndex: 1
          }}
        ></div>
        
        <div 
          className="absolute h-full bg-gray-200 rounded-l-lg" 
          style={{ 
            right: isRightSide ? '50%' : `${100 - percentage}%`,
            left: 0,
            zIndex: 1
          }}
        ></div>
        
        {/* Range input - place higher in DOM order for better event handling */}
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 10 }}
        />
      </div>
      
      {/* Custom thumb indicator */}
      <div className="relative w-full h-2">
        <div 
          className="absolute w-4 h-4 bg-white border-2 border-gray-400 rounded-full -top-2 -mt-2 -translate-x-1/2 pointer-events-none" 
          style={{ left: `${percentage}%`, zIndex: 10 }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-3">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
};

export default StressRangeInput; 
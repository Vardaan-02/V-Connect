import { useEffect, useState } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  formatValue?: (value: number) => string;
}

export const AnimatedNumber = ({ 
  value, 
  duration = 1000, 
  formatValue = (val) => val.toLocaleString()
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    if (value === displayValue) return;
    
    setIsAnimating(true);
    let startTime: number | null = null;
    const startValue = displayValue;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = Math.floor(startValue + progress * (value - startValue));
      
      setDisplayValue(nextValue);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        setIsAnimating(false);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [value, duration, displayValue]);

  return (
    <span className={isAnimating ? 'tabular-nums' : ''}>
      {formatValue(displayValue)}
    </span>
  );
};

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface FeatureSpotlightProps {
  children: React.ReactNode;
  title: string;
  description: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
  isNew?: boolean;
}

export function FeatureSpotlight({
  children,
  title,
  description,
  position = 'top',
  isNew = true
}: FeatureSpotlightProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return <>{children}</>;
  }

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2'
  };

  const arrowClasses = {
    top: 'bottom-[-6px] left-1/2 -translate-x-1/2 border-t-4 border-x-4 border-x-transparent border-indigo-600',
    right: 'left-[-6px] top-1/2 -translate-y-1/2 border-r-4 border-y-4 border-y-transparent border-indigo-600',
    bottom: 'top-[-6px] left-1/2 -translate-x-1/2 border-b-4 border-x-4 border-x-transparent border-indigo-600',
    left: 'right-[-6px] top-1/2 -translate-y-1/2 border-l-4 border-y-4 border-y-transparent border-indigo-600'
  };

  return (
    <div className="relative group" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      <div className="relative">
        {children}
        {isNew && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
          </span>
        )}
      </div>

      {isVisible && (
        <div className={`absolute z-50 ${positionClasses[position]}`}>
          <div className="relative bg-indigo-600 text-white rounded-lg p-4 shadow-lg min-w-[200px] max-w-[300px]">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute top-1 right-1 p-1 hover:bg-indigo-700 rounded-full transition-colors"
            >
              <X size={16} />
            </button>
            <div className={`absolute ${arrowClasses[position]}`} />
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-indigo-100">{description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
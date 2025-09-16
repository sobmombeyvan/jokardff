import React from 'react';
import { cn } from '../../lib/utils';

const ProgressBar = ({ 
  value, 
  max = 100, 
  className = "", 
  showLabel = true, 
  label = "",
  color = "blue",
  size = "default"
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    blue: "bg-gradient-to-r from-blue-500 to-blue-600",
    green: "bg-gradient-to-r from-green-500 to-green-600", 
    purple: "bg-gradient-to-r from-purple-500 to-purple-600",
    orange: "bg-gradient-to-r from-orange-500 to-orange-600",
    red: "bg-gradient-to-r from-red-500 to-red-600",
    cyan: "bg-gradient-to-r from-cyan-500 to-cyan-600"
  };

  const sizeClasses = {
    sm: "h-2",
    default: "h-3",
    lg: "h-4"
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-white/80">
            {label || `${Math.round(percentage)}%`}
          </span>
          <span className="text-sm text-white/60">
            {value}/{max}
          </span>
        </div>
      )}
      <div className={cn(
        "w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm",
        sizeClasses[size]
      )}>
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden",
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

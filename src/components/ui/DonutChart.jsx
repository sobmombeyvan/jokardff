import React from 'react';

const DonutChart = ({ percentage = 45, className = "" }) => {
  const radius = 60;
  const strokeWidth = 20;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 mb-6">
          <svg
            height={radius * 2}
            width={radius * 2}
            className="transform -rotate-90"
          >
            {/* Background circle */}
            <circle
              stroke="#E5E7EB"
              fill="transparent"
              strokeWidth={strokeWidth}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Progress circle */}
            <circle
              stroke="#1E40AF"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={strokeDasharray}
              style={{ strokeDashoffset }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            {/* Orange segment */}
            <circle
              stroke="#F97316"
              fill="transparent"
              strokeWidth={strokeWidth}
              strokeDasharray={`${(percentage / 100) * circumference} ${circumference}`}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">{percentage}%</div>
            </div>
          </div>
        </div>
        
        {/* Lorem ipsum text */}
        <div className="text-center text-gray-600 text-sm space-y-1 mb-6">
          <p>Lorem ipsum dolor sit amet</p>
          <p>consectetur adipiscing elit</p>
          <p>sed do eiusmod tempor</p>
          <p>incididunt ut labore</p>
        </div>
        
        <button className="bg-orange-500 text-white px-6 py-2 rounded text-sm font-medium hover:bg-orange-600 transition-colors">
          Check Now
        </button>
      </div>
    </div>
  );
};

export default DonutChart;

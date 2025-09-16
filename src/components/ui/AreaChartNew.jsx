import React from 'react';

const AreaChartNew = ({ className = "" }) => {
  const data = [
    { x: 0, y1: 20, y2: 15 },
    { x: 1, y1: 25, y2: 20 },
    { x: 2, y1: 30, y2: 25 },
    { x: 3, y1: 35, y2: 30 },
    { x: 4, y1: 40, y2: 35 },
    { x: 5, y1: 35, y2: 30 },
    { x: 6, y1: 30, y2: 25 },
    { x: 7, y1: 25, y2: 20 },
    { x: 8, y1: 20, y2: 15 }
  ];

  const width = 300;
  const height = 150;
  const padding = 20;

  const createPath = (data, yKey) => {
    const points = data.map((point, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const y = height - padding - (point[yKey] / 50) * (height - 2 * padding);
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;
  };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Lorem ipsum</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
          <span className="text-sm text-gray-600">Dolor Amet</span>
        </div>
      </div>
      
      <div className="h-40">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          {/* Orange area */}
          <path
            d={createPath(data, 'y1')}
            fill="url(#orangeGradient)"
            stroke="#F97316"
            strokeWidth="2"
          />
          
          {/* Blue area */}
          <path
            d={createPath(data, 'y2')}
            fill="url(#blueGradient)"
            stroke="#1E40AF"
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default AreaChartNew;

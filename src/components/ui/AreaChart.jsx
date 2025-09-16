import React from 'react';

const AreaChart = ({ data, className = "" }) => {
  if (!data || data.length === 0) {
    return (
      <div className={`h-64 flex items-center justify-center bg-gray-100 rounded-lg ${className}`}>
        <div className="text-center">
          <div className="text-gray-400 mb-2">📊</div>
          <p className="text-gray-500">Aucune donnée disponible</p>
        </div>
      </div>
    );
  }

  // Calculate dimensions
  const width = 400;
  const height = 200;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Find min and max values
  const values = data.map(d => d.total);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const valueRange = maxValue - minValue;

  // Create SVG path for area
  const points = data.map((d, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y = padding + chartHeight - ((d.total - minValue) / valueRange) * chartHeight;
    return `${x},${y}`;
  });

  const areaPath = `M ${padding},${padding + chartHeight} L ${points.join(' L ')} L ${padding + chartWidth},${padding + chartHeight} Z`;
  const linePath = `M ${points.join(' L ')}`;

  // Create gradient definition
  const gradientId = 'areaGradient';

  return (
    <div className={`w-full h-64 lg:h-full ${className}`}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="w-full h-full">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#8B5CF6" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.4" />
            <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="25%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="75%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const y = padding + ratio * chartHeight;
          return (
            <line
              key={index}
              x1={padding}
              y1={y}
              x2={padding + chartWidth}
              y2={y}
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeDasharray="3,3"
              opacity="0.6"
            />
          );
        })}

        {/* Y-axis labels */}
        {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
          const value = Math.round(minValue + ratio * valueRange);
          const y = padding + (1 - ratio) * chartHeight;
          return (
            <text
              key={index}
              x={padding - 10}
              y={y + 4}
              textAnchor="end"
              className="text-xs fill-white/70"
            >
              {value}
            </text>
          );
        })}

        {/* X-axis labels */}
        {data.map((d, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth;
          return (
            <text
              key={index}
              x={x}
              y={height - 10}
              textAnchor="middle"
              className="text-xs fill-white/70"
            >
              {d.name}
            </text>
          );
        })}

        {/* Area */}
        <path
          d={areaPath}
          fill={`url(#${gradientId})`}
          opacity="0.4"
        />

        {/* Line with glow effect */}
        <path
          d={linePath}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />

        {/* Data points */}
        {data.map((d, index) => {
          const x = padding + (index / (data.length - 1)) * chartWidth;
          const y = padding + chartHeight - ((d.total - minValue) / valueRange) * chartHeight;
          return (
            <g key={index}>
              {/* Glow effect for data points */}
              <circle
                cx={x}
                cy={y}
                r="8"
                fill="url(#lineGradient)"
                opacity="0.3"
                filter="url(#glow)"
              />
              {/* Main data point */}
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="white"
                stroke="url(#lineGradient)"
                strokeWidth="2"
                className="hover:r-7 transition-all duration-300 drop-shadow-lg cursor-pointer"
              >
                <title>{`${d.name}: ${d.total}`}</title>
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AreaChart;

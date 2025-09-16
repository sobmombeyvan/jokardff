import React from 'react';
import { DollarSign, Share2, ThumbsUp, Star } from 'lucide-react';

const MetricCard = ({ title, value, icon, isHighlighted = false }) => {
  const Icon = icon;
  
  return (
    <div className={`p-6 rounded-lg shadow-md ${
      isHighlighted 
        ? 'bg-blue-900 text-white' 
        : 'bg-white text-gray-800'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-medium ${
          isHighlighted ? 'text-blue-200' : 'text-gray-600'
        }`}>
          {title}
        </h3>
        <div className={`p-2 rounded-lg ${
          isHighlighted ? 'bg-blue-800' : 'bg-orange-100'
        }`}>
          <Icon className={`h-5 w-5 ${
            isHighlighted ? 'text-white' : 'text-orange-500'
          }`} />
        </div>
      </div>
      <div className={`text-3xl font-bold ${
        isHighlighted ? 'text-white' : 'text-gray-800'
      }`}>
        {value}
      </div>
    </div>
  );
};

export default MetricCard;

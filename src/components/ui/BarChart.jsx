import React from 'react';

const BarChart = ({ data, className = "" }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const maxValue = 50;

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Result</h3>
        <button className="bg-orange-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-orange-600 transition-colors">
          Check Now
        </button>
      </div>
      
      <div className="h-64 flex items-end justify-between space-x-2">
        {months.map((month, index) => {
          const value2019 = data[index]?.value2019 || Math.random() * 30 + 10;
          const value2020 = data[index]?.value2020 || Math.random() * 30 + 10;
          const height2019 = (value2019 / maxValue) * 100;
          const height2020 = (value2020 / maxValue) * 100;
          
          return (
            <div key={month} className="flex flex-col items-center space-y-1 flex-1">
              <div className="flex flex-col space-y-1 w-full">
                {/* 2020 Bar (Blue) */}
                <div 
                  className="bg-blue-900 rounded-t"
                  style={{ height: `${height2020}%` }}
                  title={`2020: ${value2020.toFixed(1)}`}
                ></div>
                {/* 2019 Bar (Orange) */}
                <div 
                  className="bg-orange-500 rounded-b"
                  style={{ height: `${height2019}%` }}
                  title={`2019: ${value2019.toFixed(1)}`}
                ></div>
              </div>
              <span className="text-xs text-gray-600 mt-2">{month}</span>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="flex justify-end space-x-4 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span className="text-sm text-gray-600">2019</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-900 rounded"></div>
          <span className="text-sm text-gray-600">2020</span>
        </div>
      </div>
    </div>
  );
};

export default BarChart;

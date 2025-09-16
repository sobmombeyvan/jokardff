import React from 'react';

const Calendar = ({ className = "" }) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const daysInMonth = 31; // Simplified for demo
  const firstDayOfMonth = 1; // Assuming month starts on Sunday
  
  const generateDays = () => {
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const days = generateDays();
  const highlightedDays = [10, 16, 24]; // Days to highlight

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <div className="grid grid-cols-7 gap-1">
        {/* Days of week header */}
        {daysOfWeek.map((day, index) => (
          <div key={index} className="text-center text-sm font-medium text-gray-600 py-2">
            {day}
          </div>
        ))}
        
        {/* Calendar days */}
        {days.map((day, index) => {
          if (day === null) {
            return <div key={index} className="h-8"></div>;
          }
          
          const isCurrentDay = day === currentDay;
          const isHighlighted = highlightedDays.includes(day);
          
          return (
            <div
              key={index}
              className={`h-8 flex items-center justify-center text-sm rounded ${
                isCurrentDay
                  ? 'bg-blue-900 text-white'
                  : isHighlighted
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = "positive", 
  icon: Icon, 
  color = "blue",
  className = ""
}) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-500/20",
      icon: "text-blue-400",
      accent: "from-blue-500/20 to-blue-600/20"
    },
    green: {
      bg: "bg-green-500/20", 
      icon: "text-green-400",
      accent: "from-green-500/20 to-green-600/20"
    },
    purple: {
      bg: "bg-purple-500/20",
      icon: "text-purple-400", 
      accent: "from-purple-500/20 to-purple-600/20"
    },
    orange: {
      bg: "bg-orange-500/20",
      icon: "text-orange-400",
      accent: "from-orange-500/20 to-orange-600/20"
    }
  };

  const colors = colorClasses[color];

  return (
    <Card className={`backdrop-blur-lg bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
        <div className={`p-3 rounded-xl ${colors.bg} group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`h-5 w-5 ${colors.icon}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white">{value}</div>
          {change && (
            <div className="flex items-center space-x-1">
              {changeType === "positive" ? (
                <TrendingUp className="h-4 w-4 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400" />
              )}
              <span className={`text-sm font-medium ${
                changeType === "positive" ? "text-green-400" : "text-red-400"
              }`}>
                {change}
              </span>
              <span className="text-xs text-white/60">vs last month</span>
            </div>
          )}
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${colors.accent} rounded-full transition-all duration-1000`}
              style={{ width: `${Math.min(100, Math.random() * 100)}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './Card';
import { Eye, Users, CreditCard, TrendingUp, Clock } from 'lucide-react';

const ActivityFeed = ({ activities = [] }) => {
  const defaultActivities = [
    {
      id: 1,
      type: 'view',
      message: 'New view on John Doe\'s card',
      time: '2 minutes ago',
      icon: Eye,
      color: 'blue'
    },
    {
      id: 2,
      type: 'card',
      message: 'New business card created',
      time: '15 minutes ago', 
      icon: CreditCard,
      color: 'green'
    },
    {
      id: 3,
      type: 'trend',
      message: 'Views increased by 25%',
      time: '1 hour ago',
      icon: TrendingUp,
      color: 'purple'
    },
    {
      id: 4,
      type: 'user',
      message: 'New user registered',
      time: '2 hours ago',
      icon: Users,
      color: 'orange'
    }
  ];

  const activitiesToShow = activities.length > 0 ? activities : defaultActivities;

  const colorClasses = {
    blue: 'text-blue-400 bg-blue-500/20',
    green: 'text-green-400 bg-green-500/20',
    purple: 'text-purple-400 bg-purple-500/20',
    orange: 'text-orange-400 bg-orange-500/20'
  };

  return (
    <Card className="backdrop-blur-lg bg-white/10 border-white/20 hover:bg-white/15 transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-white text-lg flex items-center">
          <Clock className="h-5 w-5 mr-2 text-white/60" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activitiesToShow.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200">
                <div className={`p-2 rounded-lg ${colorClasses[activity.color]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/90 font-medium">{activity.message}</p>
                  <p className="text-xs text-white/60 mt-1">{activity.time}</p>
                </div>
                {index === 0 && (
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;

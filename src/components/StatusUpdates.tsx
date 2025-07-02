
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const StatusUpdates = () => {
  const statusUpdates = [
    {
      id: '1',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e071e2?w=100&h=100&fit=crop&crop=face',
      time: '2h ago',
      hasNew: true
    },
    {
      id: '2',
      name: 'Ankit Patel',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      time: '4h ago',
      hasNew: true
    },
    {
      id: '3',
      name: 'Kavya Nair',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      time: '1d ago',
      hasNew: false
    }
  ];

  return (
    <div className="fixed top-20 right-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 w-64 z-40">
      <h3 className="font-semibold text-gray-900 mb-3">Status Updates</h3>
      <div className="space-y-3">
        {statusUpdates.map(status => (
          <div key={status.id} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
            <div className="relative">
              <Avatar className={`h-10 w-10 ${status.hasNew ? 'ring-2 ring-green-500' : ''}`}>
                <AvatarImage src={status.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs">
                  {status.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {status.hasNew && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{status.name}</p>
              <p className="text-xs text-gray-500">{status.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

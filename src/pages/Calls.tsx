
import React, { useState } from 'react';
import { ArrowLeft, Phone, Video, PhoneCall, PhoneMissed, PhoneIncoming, PhoneOutgoing, MoreHorizontal, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Calls = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, missed, incoming, outgoing

  const callHistory = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e071e2?w=100&h=100&fit=crop&crop=face',
      type: 'incoming' as const,
      callType: 'video' as const,
      time: '2 min ago',
      duration: '15:32',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      type: 'outgoing' as const,
      callType: 'voice' as const,
      time: '1 hour ago',
      duration: '8:45',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      type: 'missed' as const,
      callType: 'voice' as const,
      time: '3 hours ago',
      duration: null,
      status: 'missed'
    },
    {
      id: '4',
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      type: 'incoming' as const,
      callType: 'video' as const,
      time: 'Yesterday',
      duration: '23:18',
      status: 'completed'
    },
    {
      id: '5',
      name: 'Lisa Anderson',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
      type: 'outgoing' as const,
      callType: 'voice' as const,
      time: 'Yesterday',
      duration: '5:12',
      status: 'completed'
    },
    {
      id: '6',
      name: 'Tech Team Global',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
      type: 'incoming' as const,
      callType: 'video' as const,
      time: '2 days ago',
      duration: '45:30',
      status: 'completed',
      isGroup: true,
      participants: 8
    },
    {
      id: '7',
      name: 'Alex Thompson',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face',
      type: 'missed' as const,
      callType: 'voice' as const,
      time: '3 days ago',
      duration: null,
      status: 'missed'
    }
  ];

  const getCallIcon = (type: string, callType: string) => {
    if (type === 'missed') return <PhoneMissed className="h-4 w-4 text-red-500" />;
    if (type === 'incoming') return <PhoneIncoming className="h-4 w-4 text-emerald-500" />;
    if (type === 'outgoing') return <PhoneOutgoing className="h-4 w-4 text-slate-600" />;
    return <Phone className="h-4 w-4 text-gray-500" />;
  };

  const getCallTypeColor = (status: string) => {
    if (status === 'missed') return 'text-red-600';
    return 'text-gray-900';
  };

  const filteredCalls = callHistory.filter(call => {
    const matchesSearch = call.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || call.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const callStats = {
    total: callHistory.length,
    missed: callHistory.filter(c => c.type === 'missed').length,
    totalDuration: callHistory
      .filter(c => c.duration)
      .reduce((acc, c) => {
        const [min, sec] = c.duration!.split(':').map(Number);
        return acc + min * 60 + sec;
      }, 0)
  };

  const formatTotalDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Calls</h1>
            </div>
            <Button className="bg-slate-700 hover:bg-slate-800 text-white">
              <PhoneCall className="h-4 w-4 mr-2" />
              New Call
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input 
                placeholder="Search calls..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-2">
              {[
                { id: 'all', label: 'All' },
                { id: 'missed', label: 'Missed' },
                { id: 'incoming', label: 'Incoming' },
                { id: 'outgoing', label: 'Outgoing' }
              ].map(filter => (
                <Button
                  key={filter.id}
                  variant={filterType === filter.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterType(filter.id)}
                  className={filterType === filter.id ? 'bg-slate-700 hover:bg-slate-800' : ''}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Call Stats */}
          <div className="w-80 bg-white border-r border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Statistics</h3>
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Calls</span>
                  <span className="text-2xl font-bold text-slate-700">{callStats.total}</span>
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Missed Calls</span>
                  <span className="text-2xl font-bold text-red-600">{callStats.missed}</span>
                </div>
              </div>
              <div className="bg-emerald-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Duration</span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {formatTotalDuration(callStats.totalDuration)}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h4 className="text-md font-semibold text-gray-900 mb-3">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="h-4 w-4 mr-2" />
                  Voice Call
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Video Call
                </Button>
              </div>
            </div>
          </div>

          {/* Call History */}
          <div className="flex-1">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Calls ({filteredCalls.length})
              </h3>
              <div className="space-y-2">
                {filteredCalls.map((call) => (
                  <div key={call.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={call.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-slate-600 to-gray-700 text-white text-xs">
                          {call.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className={`font-medium ${getCallTypeColor(call.status)}`}>
                            {call.name}
                          </h4>
                          {call.isGroup && (
                            <Badge variant="secondary" className="text-xs">
                              Group • {call.participants} people
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-3 mt-1">
                          <div className="flex items-center space-x-1">
                            {getCallIcon(call.type, call.callType)}
                            <span className="text-sm text-gray-500 capitalize">
                              {call.type} {call.callType}
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">{call.time}</span>
                          {call.duration && (
                            <span className="text-sm text-gray-500">• {call.duration}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-600 hover:bg-gray-100"
                          onClick={() => console.log('Voice call', call.name)}
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-600 hover:bg-gray-100"
                          onClick={() => console.log('Video call', call.name)}
                        >
                          <Video className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-600 hover:bg-gray-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCalls.length === 0 && (
                <div className="text-center py-12">
                  <PhoneCall className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No calls found</h3>
                  <p className="text-gray-500">
                    {searchQuery ? 'Try adjusting your search or filters' : 'Your call history will appear here'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calls;

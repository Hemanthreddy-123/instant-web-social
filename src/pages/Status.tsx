
import React, { useState } from 'react';
import { ArrowLeft, Plus, MoreHorizontal, Eye, Heart, Share2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const Status = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const myStatus = {
    id: 'my-status',
    hasStory: true,
    lastUpdated: '2 hours ago',
    viewCount: 24
  };

  const statusUpdates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e071e2?w=100&h=100&fit=crop&crop=face',
      time: '2h ago',
      hasNew: true,
      viewCount: 45,
      stories: [
        { id: '1a', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop', text: 'Beautiful sunset today!' },
        { id: '1b', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=600&fit=crop', text: 'Work hard, dream big!' }
      ]
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      time: '4h ago',
      hasNew: true,
      viewCount: 32,
      stories: [
        { id: '2a', image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=400&h=600&fit=crop', text: 'Morning coffee vibes ☕' }
      ]
    },
    {
      id: '3',
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      time: '1d ago',
      hasNew: false,
      viewCount: 18,
      stories: [
        { id: '3a', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop', text: 'Team meeting success! 🎉' }
      ]
    },
    {
      id: '4',
      name: 'David Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
      time: '1d ago',
      hasNew: false,
      viewCount: 27,
      stories: [
        { id: '4a', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=600&fit=crop', text: 'Weekend hiking adventure' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Status</h1>
            </div>
            <Button className="bg-slate-700 hover:bg-slate-800 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Status
            </Button>
          </div>
        </div>

        <div className="flex">
          {/* Status List */}
          <div className="w-96 bg-white border-r border-gray-200 h-screen overflow-y-auto">
            {/* My Status */}
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">My Status</h3>
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg"
                onClick={() => setSelectedStatus('my-status')}
              >
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-slate-600">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback className="bg-gradient-to-r from-slate-600 to-gray-700 text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-slate-700 rounded-full flex items-center justify-center">
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">My Status</p>
                  <p className="text-xs text-gray-500">{myStatus.lastUpdated}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500">{myStatus.viewCount}</span>
                </div>
              </div>
            </div>

            {/* Recent Updates */}
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Updates</h3>
              <div className="space-y-1">
                {statusUpdates.map(status => (
                  <div 
                    key={status.id} 
                    className={`flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg ${
                      selectedStatus === status.id ? 'bg-slate-50 border-l-4 border-slate-600' : ''
                    }`}
                    onClick={() => setSelectedStatus(status.id)}
                  >
                    <div className="relative">
                      <Avatar className={`h-12 w-12 ${status.hasNew ? 'ring-2 ring-emerald-500' : 'ring-2 ring-gray-300'}`}>
                        <AvatarImage src={status.avatar} />
                        <AvatarFallback className="bg-gradient-to-r from-slate-600 to-gray-700 text-white text-xs">
                          {status.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {status.hasNew && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{status.name}</p>
                      <p className="text-xs text-gray-500">{status.time}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{status.viewCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Viewer */}
          <div className="flex-1 bg-gray-100 flex items-center justify-center">
            {selectedStatus ? (
              <div className="max-w-md w-full">
                {selectedStatus === 'my-status' ? (
                  <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-slate-600 to-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Plus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Add Your Status</h3>
                    <p className="text-gray-600 mb-6">Share what's on your mind with your contacts</p>
                    <Button className="bg-slate-700 hover:bg-slate-800 text-white w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Status
                    </Button>
                  </div>
                ) : (
                  (() => {
                    const status = statusUpdates.find(s => s.id === selectedStatus);
                    return status ? (
                      <div className="bg-black rounded-2xl shadow-2xl overflow-hidden relative aspect-[9/16] max-h-[600px]">
                        <img 
                          src={status.stories[0].image} 
                          alt="Status" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={status.avatar} />
                                <AvatarFallback className="bg-gradient-to-r from-slate-600 to-gray-700 text-white text-xs">
                                  {status.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-white font-medium text-sm">{status.name}</p>
                                <p className="text-white/70 text-xs">{status.time}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                              <MoreHorizontal className="h-5 w-5" />
                            </Button>
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="text-white text-lg font-medium mb-4">{status.stories[0].text}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                  <Heart className="h-4 w-4 mr-2" />
                                  Like
                                </Button>
                                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </Button>
                              </div>
                              <div className="flex items-center space-x-1 text-white/70">
                                <Eye className="w-4 h-4" />
                                <span className="text-sm">{status.viewCount}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null;
                  })()
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Status</h3>
                <p className="text-gray-500">Choose a status update to view</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;

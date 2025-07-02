
import React from 'react';
import { Search, Users, Eye, Phone, Settings, Bell, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  lastSeen?: string;
  location?: string;
  about?: string;
  phoneNumber?: string;
  isVerified?: boolean;
  customStatus?: string;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isGroup: boolean;
  members: number;
  isPinned?: boolean;
}

interface ChatSidebarProps {
  users: User[];
  conversations: Conversation[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  users,
  conversations,
  searchQuery,
  setSearchQuery,
  activeTab,
  setActiveTab
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-96 bg-white/95 backdrop-blur-xl border-r border-orange-200 flex flex-col shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-orange-200 bg-gradient-to-r from-orange-600 to-red-600">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-orange-600 font-bold text-lg">🇮🇳</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">VaartaHub</h1>
              <p className="text-orange-100 text-xs">Connect India</p>
            </div>
          </div>
          <div className="flex space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:bg-white/20"
              onClick={() => navigate('/settings')}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
          <Input 
            placeholder="Search conversations, people..." 
            className="pl-10 bg-white/90 border-white/50 text-gray-700 placeholder:text-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-orange-200">
        {[
          { id: 'chats', label: 'Chats', icon: Users, path: '/' },
          { id: 'status', label: 'Status', icon: Eye, path: '/status' },
          { id: 'calls', label: 'Calls', icon: Phone, path: '/calls' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              if (tab.path !== '/') navigate(tab.path);
            }}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id 
                ? 'text-orange-700 border-b-2 border-orange-700 bg-orange-50' 
                : 'text-gray-600 hover:text-orange-700 hover:bg-orange-50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Users */}
      <div className="p-4 border-b border-orange-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
          Online ({users.filter(u => u.status === 'online').length})
        </h3>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {users.filter(u => u.status === 'online').map((user) => (
            <div key={user.id} className="flex-shrink-0 text-center">
              <div className="relative">
                <Avatar className="h-12 w-12 border-2 border-green-500">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {user.isVerified && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1 truncate w-16">{user.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conv) => (
          <div key={conv.id} className="flex items-center space-x-3 p-4 hover:bg-orange-50 cursor-pointer border-b border-orange-100 transition-colors">
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={conv.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                  {conv.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              {conv.isPinned && (
                <Pin className="absolute -top-1 -right-1 w-4 h-4 text-orange-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate flex items-center">
                  {conv.name}
                  {conv.isGroup && (
                    <Badge variant="secondary" className="ml-2 text-xs bg-orange-100 text-orange-700">
                      {conv.members}
                    </Badge>
                  )}
                </p>
                <span className="text-xs text-gray-500">{conv.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                {conv.unread > 0 && (
                  <Badge className="bg-orange-600 text-white text-xs">
                    {conv.unread}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

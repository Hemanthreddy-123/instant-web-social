
import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Settings, Search, Phone, Video, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  lastSeen?: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Alice Johnson',
      avatar: '/placeholder.svg',
      content: 'Hey everyone! How are you doing today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isOwn: false,
    },
    {
      id: '2',
      user: 'You',
      avatar: '/placeholder.svg',
      content: 'Doing great! Just working on some exciting projects.',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isOwn: true,
    },
    {
      id: '3',
      user: 'Bob Smith',
      avatar: '/placeholder.svg',
      content: 'Same here! The weather is perfect for coding ☀️',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      isOwn: false,
    },
    {
      id: '4',
      user: 'You',
      avatar: '/placeholder.svg',
      content: 'Absolutely! I love productive days like this.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isOwn: true,
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const users: User[] = [
    { id: '1', name: 'Alice Johnson', avatar: '/placeholder.svg', status: 'online' },
    { id: '2', name: 'Bob Smith', avatar: '/placeholder.svg', status: 'online' },
    { id: '3', name: 'Carol Wilson', avatar: '/placeholder.svg', status: 'away' },
    { id: '4', name: 'David Brown', avatar: '/placeholder.svg', status: 'offline', lastSeen: '2 hours ago' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: 'You',
      avatar: '/placeholder.svg',
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate typing indicator and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "That's interesting! Tell me more.",
        "I completely agree with you!",
        "Thanks for sharing that.",
        "Great point! I hadn't thought of it that way.",
        "Awesome! 🎉",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        user: 'Alice Johnson',
        avatar: '/placeholder.svg',
        content: randomResponse,
        timestamp: new Date(),
        isOwn: false,
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-black/20 backdrop-blur-xl border-r border-white/10 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">ChatApp</h1>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Online Users */}
          <div className="p-4 border-b border-white/10">
            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Online Users ({users.filter(u => u.status === 'online').length})
            </h3>
            <div className="space-y-2">
              {users.map((user) => (
                <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black ${getStatusColor(user.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-gray-400">
                      {user.status === 'offline' ? user.lastSeen : user.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="flex-1 p-4">
            <h3 className="text-sm font-semibold text-gray-300 mb-3">Recent</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-500/20 border border-purple-500/30 cursor-pointer">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    GC
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">General Chat</p>
                  <p className="text-xs text-gray-400 truncate">Alice: That's interesting...</p>
                </div>
                <Badge variant="secondary" className="bg-purple-500 text-white">
                  4
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    GC
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold text-white">General Chat</h2>
                  <p className="text-sm text-gray-400">{users.filter(u => u.status === 'online').length} members online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-black/5 to-black/10">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                      {message.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2 rounded-2xl ${
                      message.isOwn 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                        : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      {!message.isOwn && (
                        <span className="text-xs text-gray-400 font-medium">{message.user}</span>
                      )}
                      <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-xs lg:max-w-md">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                      AJ
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <div className="px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-sm text-white border border-white/20">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 mt-1">Alice is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-black/20 backdrop-blur-xl border-t border-white/10 p-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="pl-4 pr-12 py-3 bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full p-3 transition-all duration-200 transform hover:scale-105"
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

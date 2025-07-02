
import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Settings, Search, Phone, Video, MoreHorizontal, Mic, Camera, Paperclip, Smile, Star, Volume2, Bell, Shield, Globe, MapPin, Calendar, Archive, Pin, Forward, Reply, Edit3, Trash2, Download, Share2, Heart, ThumbsUp, Eye, Clock, Zap, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ChatFeatures } from '@/components/ChatFeatures';
import { MediaGallery } from '@/components/MediaGallery';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { StatusUpdates } from '@/components/StatusUpdates';

interface Message {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
  type: 'text' | 'image' | 'voice' | 'video' | 'file' | 'location';
  status: 'sent' | 'delivered' | 'read';
  reactions?: { emoji: string; users: string[] }[];
  isStarred?: boolean;
  replyTo?: string;
  isForwarded?: boolean;
  isEdited?: boolean;
}

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

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e071e2?w=100&h=100&fit=crop&crop=face',
      content: 'Hello everyone! How is your day going?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isOwn: false,
      type: 'text',
      status: 'read',
      reactions: [{ emoji: '👋', users: ['Arjun', 'Kavya'] }],
    },
    {
      id: '2',
      user: 'You (Rahul)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'Great! Working on some exciting projects. Beautiful weather in Mumbai today! ☀️',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      isOwn: true,
      type: 'text',
      status: 'read',
      isStarred: true,
    },
    {
      id: '3',
      user: 'Ankit Patel',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      content: 'Same here from Ahmedabad! Perfect coding weather 🌦️',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      isOwn: false,
      type: 'text',
      status: 'delivered',
      reactions: [{ emoji: '☀️', users: ['Priya'] }],
    },
    {
      id: '4',
      user: 'You (Rahul)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: 'Absolutely! Productivity is at its peak today. Anyone up for a virtual coffee break? ☕',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isOwn: true,
      type: 'text',
      status: 'read',
    },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMediaGallery, setShowMediaGallery] = useState(false);
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const users: User[] = [
    { 
      id: '1', 
      name: 'Priya Sharma', 
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e071e2?w=100&h=100&fit=crop&crop=face', 
      status: 'online',
      location: 'Delhi',
      about: 'Software Engineer at TCS',
      phoneNumber: '+91 98765 43210',
      isVerified: true,
      customStatus: 'Building the future 🚀'
    },
    { 
      id: '2', 
      name: 'Ankit Patel', 
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', 
      status: 'online',
      location: 'Ahmedabad',
      about: 'Full Stack Developer',
      isVerified: true
    },
    { 
      id: '3', 
      name: 'Kavya Nair', 
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', 
      status: 'busy',
      location: 'Kochi',
      about: 'UI/UX Designer',
      customStatus: 'In a meeting 📊'
    },
    { 
      id: '4', 
      name: 'Arjun Singh', 
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', 
      status: 'away',
      location: 'Jaipur',
      about: 'Product Manager'
    },
    { 
      id: '5', 
      name: 'Sneha Reddy', 
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face', 
      status: 'offline', 
      lastSeen: '2 hours ago',
      location: 'Hyderabad',
      about: 'Data Scientist'
    },
    { 
      id: '6', 
      name: 'Vikram Gupta', 
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face', 
      status: 'online',
      location: 'Bangalore',
      about: 'DevOps Engineer',
      isVerified: true
    },
  ];

  const conversations = [
    {
      id: '1',
      name: 'Tech Enthusiasts India 🇮🇳',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
      lastMessage: 'Priya: Hello everyone! How is your day going?',
      time: '2 min ago',
      unread: 4,
      isGroup: true,
      members: 156,
      isPinned: true
    },
    {
      id: '2',
      name: 'Family Group 👨‍👩‍👧‍👦',
      avatar: 'https://images.unsplash.com/photo-1511895426328-dc8714eeea42?w=100&h=100&fit=crop',
      lastMessage: 'Mom: Have you had lunch?',
      time: '1 hour ago',
      unread: 2,
      isGroup: true,
      members: 8,
      isPinned: true
    },
    {
      id: '3',
      name: 'College Friends Mumbai',
      avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop',
      lastMessage: 'Weekend plan?',
      time: '3 hours ago',
      unread: 0,
      isGroup: true,
      members: 12
    }
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
      user: 'You (Rahul)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
      type: 'text',
      status: 'sent'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "That's interesting! Tell me more about it.",
          "I completely agree with you! Absolutely right.",
          "Thanks for sharing that. Much appreciated!",
          "Great point! I hadn't thought of it that way.",
          "Awesome! Amazing! 🎉",
          "Very helpful information. Really useful to know."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseMessage: Message = {
          id: (Date.now() + 1).toString(),
          user: 'Priya Sharma',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b2e071e2?w=100&h=100&fit=crop&crop=face',
          content: randomResponse,
          timestamp: new Date(),
          isOwn: false,
          type: 'text',
          status: 'delivered'
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1500);
    }, 500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const existingReaction = msg.reactions?.find(r => r.emoji === emoji);
        if (existingReaction) {
          return {
            ...msg,
            reactions: msg.reactions?.map(r => 
              r.emoji === emoji 
                ? { ...r, users: r.users.includes('You') ? r.users.filter(u => u !== 'You') : [...r.users, 'You'] }
                : r
            )
          };
        } else {
          return {
            ...msg,
            reactions: [...(msg.reactions || []), { emoji, users: ['You'] }]
          };
        }
      }
      return msg;
    }));
  };

  const handleCameraClick = () => {
    console.log('Camera button clicked');
    // Create a file input for camera
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Camera photo taken:', file);
        // Handle the captured photo here
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex h-screen">
        {/* Professional Sidebar */}
        <div className="w-96 bg-white/95 backdrop-blur-xl border-r border-gray-200 flex flex-col shadow-xl">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-lg">💬</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">ChatPro</h1>
                  <p className="text-blue-100 text-xs">Professional Communication</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
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
          <div className="flex border-b border-gray-200">
            {[
              { id: 'chats', label: 'Chats', icon: Users },
              { id: 'status', label: 'Status', icon: Eye },
              { id: 'calls', label: 'Calls', icon: Phone }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Active Users */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Active Now ({users.filter(u => u.status === 'online').length})
            </h3>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {users.filter(u => u.status === 'online').map((user) => (
                <div key={user.id} className="flex-shrink-0 text-center">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-green-500">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {user.isVerified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
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
              <div key={conv.id} className="flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={conv.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                      {conv.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  {conv.isPinned && (
                    <Pin className="absolute -top-1 -right-1 w-4 h-4 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate flex items-center">
                      {conv.name}
                      {conv.isGroup && (
                        <Badge variant="secondary" className="ml-2 text-xs bg-blue-100 text-blue-700">
                          {conv.members}
                        </Badge>
                      )}
                    </p>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
                    {conv.unread > 0 && (
                      <Badge className="bg-blue-600 text-white text-xs">
                        {conv.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                    TI
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    Tech Enthusiasts India 🇮🇳
                    <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                      Verified
                    </Badge>
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                      156 members, 12 online
                    </span>
                    <span>📍 All India</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
                  <Video className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-100">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-3 max-w-lg ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs">
                      {message.user.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'}`}>
                    <div className={`relative px-4 py-2 rounded-2xl shadow-sm ${
                      message.isOwn 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                        : 'bg-white border border-gray-200 text-gray-900'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      {message.isStarred && (
                        <Star className="absolute -top-2 -right-2 w-4 h-4 text-yellow-500 fill-current" />
                      )}
                    </div>
                    
                    {/* Message reactions */}
                    {message.reactions && message.reactions.length > 0 && (
                      <div className="flex space-x-1 mt-1">
                        {message.reactions.map((reaction, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleReaction(message.id, reaction.emoji)}
                            className="flex items-center space-x-1 bg-white rounded-full px-2 py-1 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-xs">{reaction.emoji}</span>
                            <span className="text-xs text-gray-600">{reaction.users.length}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 mt-1">
                      {!message.isOwn && (
                        <span className="text-xs text-gray-500 font-medium">{message.user}</span>
                      )}
                      <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                      {message.isOwn && (
                        <div className="flex items-center space-x-1">
                          {message.status === 'sent' && <Clock className="w-3 h-3 text-gray-400" />}
                          {message.status === 'delivered' && <span className="text-gray-400">✓</span>}
                          {message.status === 'read' && <span className="text-green-500">✓✓</span>}
                        </div>
                      )}
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
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b2e071e2?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs">
                      PS
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <div className="px-4 py-2 rounded-2xl bg-white border border-gray-200 shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Priya is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-600 hover:bg-gray-100"
                  onClick={() => setShowMediaGallery(true)}
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-600 hover:bg-gray-100"
                  onClick={() => setShowVoiceRecorder(true)}
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-600 hover:bg-gray-100"
                  onClick={handleCameraClick}
                >
                  <Camera className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="flex-1 relative">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="pl-4 pr-16 py-3 bg-gray-50 border-gray-200 text-gray-900 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:bg-gray-100"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="h-5 w-5" />
                </Button>
              </div>
              
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full p-3 transition-all duration-200 transform hover:scale-105 shadow-lg"
                disabled={!newMessage.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
            
            {/* Quick reactions */}
            <div className="flex items-center justify-center space-x-4 mt-2">
              {['👍', '❤️', '😂', '😮', '😢', '🙏', '🎉', '🔥'].map(emoji => (
                <button
                  key={emoji}
                  onClick={() => {
                    setNewMessage(emoji);
                    handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
                  }}
                  className="text-xl hover:scale-125 transition-transform"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Components */}
      <ChatFeatures />
      {showMediaGallery && <MediaGallery onClose={() => setShowMediaGallery(false)} />}
      {showVoiceRecorder && <VoiceRecorder onClose={() => setShowVoiceRecorder(false)} />}
      <StatusUpdates />
    </div>
  );
};

export default Index;

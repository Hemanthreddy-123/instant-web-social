import React, { useState, useRef, useEffect } from 'react';
import { ChatFeatures } from '@/components/ChatFeatures';
import { MediaGallery } from '@/components/MediaGallery';
import { VoiceRecorder } from '@/components/VoiceRecorder';
import { ContactModal } from '@/components/ContactModal';
import { ChatSidebar } from '@/components/ChatSidebar';
import { ChatHeader } from '@/components/ChatHeader';
import { MessageList } from '@/components/MessageList';
import { MessageInput } from '@/components/MessageInput';

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
      content: 'Namaste everyone! How is your day going?',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      isOwn: false,
      type: 'text',
      status: 'read',
      reactions: [{ emoji: '🙏', users: ['Arjun', 'Kavya'] }],
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
      content: 'Absolutely! Productivity is at its peak today. Anyone up for a virtual chai break? ☕',
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
  const [showContactModal, setShowContactModal] = useState(false);
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
      name: 'Tech Team Bharat',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop',
      lastMessage: 'Priya: Namaste everyone! How is your day going?',
      time: '2 min ago',
      unread: 4,
      isGroup: true,
      members: 156,
      isPinned: true
    },
    {
      id: '2',
      name: 'Project Alpha India',
      avatar: 'https://images.unsplash.com/photo-1511895426328-dc8714eeea42?w=100&h=100&fit=crop',
      lastMessage: 'Team: Meeting at 3 PM today',
      time: '1 hour ago',
      unread: 2,
      isGroup: true,
      members: 8,
      isPinned: true
    },
    {
      id: '3',
      name: 'Design Desi Squad',
      avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=100&h=100&fit=crop',
      lastMessage: 'New mockups ready for review',
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
          "Bahut accha point! I hadn't thought of it that way.",
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
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'environment';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Camera photo taken:', file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="flex h-screen">
        <ChatSidebar
          users={users}
          conversations={conversations}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="flex-1 flex flex-col">
          <ChatHeader />
          
          <MessageList
            messages={messages}
            isTyping={isTyping}
            onReaction={handleReaction}
            messagesEndRef={messagesEndRef}
          />

          <MessageInput
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            onSendMessage={handleSendMessage}
            onShowMediaGallery={() => setShowMediaGallery(true)}
            onShowVoiceRecorder={() => setShowVoiceRecorder(true)}
            onCameraClick={handleCameraClick}
            onShowEmojiPicker={() => setShowEmojiPicker(!showEmojiPicker)}
            showEmojiPicker={showEmojiPicker}
          />
        </div>
      </div>

      <ChatFeatures />
      {showMediaGallery && <MediaGallery onClose={() => setShowMediaGallery(false)} />}
      {showVoiceRecorder && <VoiceRecorder onClose={() => setShowVoiceRecorder(false)} />}
      {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} />}
    </div>
  );
};

export default Index;

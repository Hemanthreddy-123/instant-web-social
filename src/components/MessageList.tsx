
import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onReaction: (messageId: string, emoji: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isTyping,
  onReaction,
  messagesEndRef
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-orange-50 to-white">
      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-start space-x-3 max-w-lg ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <Avatar className="h-8 w-8 flex-shrink-0">
              <AvatarImage src={message.avatar} />
              <AvatarFallback className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs">
                {message.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className={`flex flex-col ${message.isOwn ? 'items-end' : 'items-start'}`}>
              <div className={`relative px-4 py-2 rounded-2xl shadow-sm ${
                message.isOwn 
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' 
                  : 'bg-white border border-orange-200 text-gray-900'
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
                      onClick={() => onReaction(message.id, reaction.emoji)}
                      className="flex items-center space-x-1 bg-white rounded-full px-2 py-1 shadow-sm border border-orange-200 hover:bg-orange-50 transition-colors"
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
              <AvatarFallback className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs">
                PS
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
              <div className="px-4 py-2 rounded-2xl bg-white border border-orange-200 shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-1">Priya is typing...</span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

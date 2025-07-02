
import React from 'react';
import { Send, Paperclip, Mic, Camera, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface MessageInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
  onShowMediaGallery: () => void;
  onShowVoiceRecorder: () => void;
  onCameraClick: () => void;
  onShowEmojiPicker: () => void;
  showEmojiPicker: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  newMessage,
  setNewMessage,
  onSendMessage,
  onShowMediaGallery,
  onShowVoiceRecorder,
  onCameraClick,
  onShowEmojiPicker,
  showEmojiPicker
}) => {
  const handleQuickReaction = (emoji: string) => {
    setNewMessage(emoji);
    onSendMessage({ preventDefault: () => {} } as React.FormEvent);
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl border-t border-orange-200 p-4">
      <form onSubmit={onSendMessage} className="flex items-center space-x-3">
        <div className="flex space-x-2">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:bg-orange-50"
            onClick={onShowMediaGallery}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:bg-orange-50"
            onClick={onShowVoiceRecorder}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="text-gray-600 hover:bg-orange-50"
            onClick={onCameraClick}
          >
            <Camera className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 relative">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="pl-4 pr-16 py-3 bg-orange-50 border-orange-200 text-gray-900 rounded-full focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:bg-orange-50"
            onClick={onShowEmojiPicker}
          >
            <Smile className="h-5 w-5" />
          </Button>
        </div>
        
        <Button 
          type="submit" 
          className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-full p-3 transition-all duration-200 transform hover:scale-105 shadow-lg"
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
            onClick={() => handleQuickReaction(emoji)}
            className="text-xl hover:scale-125 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

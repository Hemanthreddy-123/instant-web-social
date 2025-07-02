
import React from 'react';
import { Search, Phone, Video, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const ChatHeader: React.FC = () => {
  return (
    <div className="bg-white/95 backdrop-blur-xl border-b border-orange-200 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop" />
            <AvatarFallback className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
              TT
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              Tech Team Bharat
              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                Verified
              </Badge>
            </h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                156 members, 12 online
              </span>
              <span>🇮🇳 Team India</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-orange-50">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-orange-50">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-orange-50">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-orange-50">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

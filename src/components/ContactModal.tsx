
import React from 'react';
import { X, Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ContactModalProps {
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Contact Info</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="text-center mb-6">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b2e071e2?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-xl">
                PS
              </AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold text-gray-900 flex items-center justify-center">
              Priya Sharma
              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            </h3>
            <p className="text-gray-600 mt-1">Software Engineer at TCS</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">priya.sharma@email.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium">Delhi, India</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-gray-600">Local Time</p>
                <p className="font-medium">2:30 PM IST</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">About</p>
            <p className="text-gray-900">Building the future with code 🚀. Passionate about creating innovative solutions and connecting people through technology.</p>
          </div>

          <div className="mt-6 pt-4 border-t">
            <p className="text-sm text-gray-600 mb-2">Status</p>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <p className="text-green-600 font-medium">Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

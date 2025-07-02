
import React from 'react';
import { X, Camera, Image, File, Music, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaGalleryProps {
  onClose: () => void;
}

export const MediaGallery = ({ onClose }: MediaGalleryProps) => {
  const mediaTypes = [
    { icon: Camera, label: 'Camera', desc: 'Take a photo', color: 'bg-green-500' },
    { icon: Image, label: 'Gallery', desc: 'Choose from gallery', color: 'bg-blue-500' },
    { icon: File, label: 'Document', desc: 'Share documents', color: 'bg-orange-500' },
    { icon: Music, label: 'Audio', desc: 'Share music', color: 'bg-purple-500' },
    { icon: Video, label: 'Video', desc: 'Share videos', color: 'bg-red-500' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Share Media</h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {mediaTypes.map((type) => (
            <button
              key={type.label}
              className="flex flex-col items-center p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center mb-2`}>
                <type.icon className="h-6 w-6 text-white" />
              </div>
              <span className="font-medium text-gray-900">{type.label}</span>
              <span className="text-xs text-gray-500">{type.desc}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-orange-50 rounded-lg">
          <p className="text-sm text-orange-800">
            <strong>Pro Tip:</strong> You can share files up to 2GB and use our smart compression for faster uploads!
          </p>
        </div>
      </div>
    </div>
  );
};

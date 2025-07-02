
import React, { useRef } from 'react';
import { X, Camera, Image, File, Music, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MediaGalleryProps {
  onClose: () => void;
}

export const MediaGallery = ({ onClose }: MediaGalleryProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (type: string) => {
    console.log('File upload for type:', type);
    if (type === 'camera') {
      cameraInputRef.current?.click();
    } else if (type === 'gallery' || type === 'document' || type === 'audio' || type === 'video') {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log('Files selected:', files);
      // Handle file upload logic here
      onClose();
    }
  };

  const mediaTypes = [
    { 
      icon: Camera, 
      label: 'Camera', 
      desc: 'Take a photo', 
      color: 'bg-blue-500',
      type: 'camera'
    },
    { 
      icon: Image, 
      label: 'Gallery', 
      desc: 'Choose from gallery', 
      color: 'bg-green-500',
      type: 'gallery'
    },
    { 
      icon: File, 
      label: 'Document', 
      desc: 'Share documents', 
      color: 'bg-orange-500',
      type: 'document'
    },
    { 
      icon: Music, 
      label: 'Audio', 
      desc: 'Share music files', 
      color: 'bg-purple-500',
      type: 'audio'
    },
    { 
      icon: Video, 
      label: 'Video', 
      desc: 'Share video files', 
      color: 'bg-red-500',
      type: 'video'
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Share Media</h2>
          <Button onClick={onClose} variant="ghost" size="icon" className="hover:bg-gray-100">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {mediaTypes.map((type) => (
            <button
              key={type.label}
              onClick={() => handleFileUpload(type.type)}
              className="flex flex-col items-center p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 transform hover:scale-105"
            >
              <div className={`w-12 h-12 ${type.color} rounded-full flex items-center justify-center mb-3 shadow-lg`}>
                <type.icon className="h-6 w-6 text-white" />
              </div>
              <span className="font-semibold text-gray-900 mb-1">{type.label}</span>
              <span className="text-xs text-gray-500 text-center">{type.desc}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> You can share files up to 2GB with fast upload speeds!
          </p>
        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          onChange={handleFileChange}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

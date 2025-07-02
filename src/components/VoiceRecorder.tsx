
import React, { useState, useEffect } from 'react';
import { X, Mic, Square, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceRecorderProps {
  onClose: () => void;
}

export const VoiceRecorder = ({ onClose }: VoiceRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
    } else {
      setIsRecording(true);
      setDuration(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Voice Message</h2>
          <Button onClick={onClose} variant="ghost" size="icon">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="text-center">
          <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-200'
          }`}>
            {isRecording ? (
              <Square className="h-8 w-8 text-white" />
            ) : (
              <Mic className="h-8 w-8 text-gray-600" />
            )}
          </div>
          
          <div className="text-2xl font-mono font-bold text-gray-900 mb-6">
            {formatTime(duration)}
          </div>
          
          {isRecording && (
            <div className="flex justify-center mb-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map(i => (
                  <div
                    key={i}
                    className="w-1 bg-red-500 animate-pulse"
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleRecord}
              className={`${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-green-500 hover:bg-green-600'
              } text-white rounded-full p-4`}
            >
              {isRecording ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
            </Button>
            
            {duration > 0 && !isRecording && (
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4"
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
            )}
          </div>
          
          {duration > 0 && !isRecording && (
            <div className="mt-4 flex space-x-2">
              <Button onClick={onClose} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white">
                Send
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-6 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800 text-center">
            🎙️ High-quality audio recording with noise cancellation
          </p>
        </div>
      </div>
    </div>
  );
};

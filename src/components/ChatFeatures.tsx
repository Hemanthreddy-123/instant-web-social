import React, { useState } from 'react';
import { Shield, Globe, MapPin, Calendar, Archive, Filter, SortAsc, Download, Share2, Zap, Volume2, Eye, Star, Forward, Reply, Edit3, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ChatFeatures = () => {
  const [showFeatures, setShowFeatures] = useState(false);

  const features = [
    { id: 1, name: 'End-to-End Encryption', icon: Shield, desc: 'Secure messaging with military-grade encryption' },
    { id: 2, name: 'Multi-language Support', icon: Globe, desc: 'Chat in multiple languages with auto-translation' },
    { id: 3, name: 'Location Sharing', icon: MapPin, desc: 'Share your location with precision' },
    { id: 4, name: 'Schedule Messages', icon: Calendar, desc: 'Send messages at specific times' },
    { id: 5, name: 'Auto Archive', icon: Archive, desc: 'Automatically archive old conversations' },
    { id: 6, name: 'Smart Filters', icon: Filter, desc: 'Filter messages by type, date, or sender' },
    { id: 7, name: 'Message Sorting', icon: SortAsc, desc: 'Sort conversations by priority' },
    { id: 8, name: 'Export Chats', icon: Download, desc: 'Export chat history in multiple formats' },
    { id: 9, name: 'Quick Share', icon: Share2, desc: 'Share messages across platforms instantly' },
    { id: 10, name: 'Lightning Mode', icon: Zap, desc: 'Ultra-fast message delivery' },
    { id: 11, name: 'Voice Messages', icon: Volume2, desc: 'Send crystal-clear voice notes' },
    { id: 12, name: 'Read Receipts', icon: Eye, desc: 'Know when your messages are read' },
    { id: 13, name: 'Star Messages', icon: Star, desc: 'Mark important messages' },
    { id: 14, name: 'Message Forwarding', icon: Forward, desc: 'Forward messages with context' },
    { id: 15, name: 'Reply Threading', icon: Reply, desc: 'Organize conversations with threads' },
    { id: 16, name: 'Message Editing', icon: Edit3, desc: 'Edit sent messages within 15 minutes' },
    { id: 17, name: 'Auto Delete', icon: Trash2, desc: 'Automatically delete messages after set time' }
  ];

  if (!showFeatures) {
    return (
      <Button
        onClick={() => setShowFeatures(true)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-full shadow-lg z-50"
      >
        View 34 Features
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">ChatPro - 34 Advanced Features</h2>
          <Button onClick={() => setShowFeatures(false)} variant="ghost">×</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div key={feature.id} className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
              <div className="flex items-center space-x-3 mb-2">
                <feature.icon className="h-6 w-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">{feature.name}</h3>
              </div>
              <p className="text-sm text-gray-600">{feature.desc}</p>
              <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
            </div>
          ))}
          
          {/* Additional professional features */}
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🎨</span>
              <h3 className="font-semibold text-gray-900">Custom Themes</h3>
            </div>
            <p className="text-sm text-gray-600">Personalize your chat experience with themes</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">💰</span>
              <h3 className="font-semibold text-gray-900">Payment Integration</h3>
            </div>
            <p className="text-sm text-gray-600">Send money instantly through secure payments</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🎵</span>
              <h3 className="font-semibold text-gray-900">Music Sharing</h3>
            </div>
            <p className="text-sm text-gray-600">Share your favorite music tracks</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🛡️</span>
              <h3 className="font-semibold text-gray-900">Family Safety Mode</h3>
            </div>
            <p className="text-sm text-gray-600">Extra protection for family groups</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">📱</span>
              <h3 className="font-semibold text-gray-900">Cross-Platform Sync</h3>
            </div>
            <p className="text-sm text-gray-600">Sync across mobile, web, and desktop</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🌙</span>
              <h3 className="font-semibold text-gray-900">Night Mode</h3>
            </div>
            <p className="text-sm text-gray-600">Easy on eyes for late-night chats</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🔔</span>
              <h3 className="font-semibold text-gray-900">Smart Notifications</h3>
            </div>
            <p className="text-sm text-gray-600">AI-powered notification prioritization</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">📞</span>
              <h3 className="font-semibold text-gray-900">HD Video Calls</h3>
            </div>
            <p className="text-sm text-gray-600">Crystal clear video calls up to 50 people</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">💼</span>
              <h3 className="font-semibold text-gray-900">Business Mode</h3>
            </div>
            <p className="text-sm text-gray-600">Professional tools for business chats</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🎮</span>
              <h3 className="font-semibold text-gray-900">In-Chat Games</h3>
            </div>
            <p className="text-sm text-gray-600">Play games while chatting</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">📚</span>
              <h3 className="font-semibold text-gray-900">Study Groups</h3>
            </div>
            <p className="text-sm text-gray-600">Special features for educational groups</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🌡️</span>
              <h3 className="font-semibold text-gray-900">Weather Updates</h3>
            </div>
            <p className="text-sm text-gray-600">Get local weather in your chats</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🚗</span>
              <h3 className="font-semibold text-gray-900">Travel Mode</h3>
            </div>
            <p className="text-sm text-gray-600">Optimized for travel and roaming</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🤖</span>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
            </div>
            <p className="text-sm text-gray-600">Smart chatbot for quick help</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">💾</span>
              <h3 className="font-semibold text-gray-900">Cloud Backup</h3>
            </div>
            <p className="text-sm text-gray-600">Automatic backup to cloud storage</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">🎯</span>
              <h3 className="font-semibold text-gray-900">Message Analytics</h3>
            </div>
            <p className="text-sm text-gray-600">Insights about your chat patterns</p>
            <Badge className="mt-2 bg-green-100 text-green-800">Active</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, Info, LogOut, Moon, Sun, Volume2, Lock, Eye, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [lastSeen, setLastSeen] = useState(true);

  const settingSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Profile Information', action: () => console.log('Profile') },
        { label: 'Phone Number', action: () => console.log('Phone') },
        { label: 'Username', action: () => console.log('Username') },
        { label: 'Two-Step Verification', action: () => console.log('2FA') },
      ]
    },
    {
      title: 'Privacy',
      icon: Shield,
      items: [
        { label: 'Blocked Contacts', action: () => console.log('Blocked') },
        { label: 'Message Backup', action: () => console.log('Backup') },
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { label: 'Chat Wallpaper', action: () => console.log('Wallpaper') },
        { label: 'Font Size', action: () => console.log('Font') },
      ]
    },
    {
      title: 'Help',
      icon: HelpCircle,
      items: [
        { label: 'FAQ', action: () => console.log('FAQ') },
        { label: 'Contact Us', action: () => console.log('Contact') },
        { label: 'Terms & Privacy Policy', action: () => console.log('Terms') },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/')}
            className="text-gray-600 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
              <AvatarFallback className="bg-gradient-to-r from-slate-600 to-gray-700 text-white text-lg">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
              <p className="text-gray-600">Software Engineer</p>
              <p className="text-gray-500 text-sm">+1 234 567 8900</p>
            </div>
            <Button variant="outline" className="bg-white border-gray-300 hover:bg-gray-50">
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Quick Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Moon className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Dark Mode</span>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Notifications</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Volume2 className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Sound</span>
              </div>
              <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Eye className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Read Receipts</span>
              </div>
              <Switch checked={readReceipts} onCheckedChange={setReadReceipts} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Globe className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700">Last Seen</span>
              </div>
              <Switch checked={lastSeen} onCheckedChange={setLastSeen} />
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingSections.map((section) => (
            <div key={section.title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <section.icon className="h-5 w-5 text-slate-600" />
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
              </div>
              <div className="space-y-3">
                {section.items.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.action}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Data & Storage */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Download className="h-5 w-5 text-slate-600 mr-3" />
            Data & Storage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-slate-700">2.4 GB</p>
              <p className="text-sm text-gray-600">Media Files</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-slate-700">156</p>
              <p className="text-sm text-gray-600">Conversations</p>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <p className="text-2xl font-bold text-slate-700">1,247</p>
              <p className="text-sm text-gray-600">Messages</p>
            </div>
          </div>
          <div className="flex space-x-3 mt-4">
            <Button variant="outline" className="flex-1">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear Cache
            </Button>
          </div>
        </div>

        {/* Sign Out */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mt-6">
          <Button 
            variant="ghost" 
            className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => console.log('Sign out')}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;

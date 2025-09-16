import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Menu, Save, User, Bell, Shield, Globe } from 'lucide-react';
import Sidebar from '../components/ui/Sidebar';
import ThemeToggle from '../components/ui/ThemeToggle';

const Settings = () => {
  const { isDark } = useTheme();
  const [activeItem, setActiveItem] = useState('settings');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const [userSettings, setUserSettings] = useState({
    name: 'Yero',
    email: 'yero@jokard.com',
    company: 'Jokard Digital',
    phone: '+237 123 456 789',
    bio: 'Développeur passionné par les solutions numériques innovantes.',
    language: 'fr',
    timezone: 'Africa/Douala',
    notifications: {
      email: true,
      push: true,
      sms: false
    }
  });

  const handleSave = () => {
    // Handle save logic here
    console.log('Settings saved:', userSettings);
  };

  const handleInputChange = (field, value) => {
    setUserSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type, value) => {
    setUserSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  return (
    <div className={`flex flex-col lg:flex-row min-h-screen lg:h-screen relative overflow-hidden transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${isDark ? 'ffffff' : '000000'}' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Sidebar */}
      <div className={`lg:w-64 w-full lg:h-screen h-auto lg:relative absolute lg:translate-x-0 transition-transform duration-300 lg:z-10 z-50 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />
      </div>
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 lg:ml-0 ml-0 min-h-screen lg:min-h-0">
        {/* Header */}
        <div className={`backdrop-blur-xl border-b p-4 lg:p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 transition-all duration-500 ${
          isDark 
            ? 'bg-white/5 border-white/10' 
            : 'bg-white/80 border-gray-200/50'
        }`}>
          <div>
            <h1 className={`text-xl lg:text-2xl font-semibold transition-colors duration-500 ${
              isDark ? 'text-white' : 'text-gray-800'
            }`}>
              Paramètres
            </h1>
            <p className={`text-sm transition-colors duration-500 ${
              isDark ? 'text-white/60' : 'text-gray-500'
            }`}>
              Gérez vos préférences et informations personnelles
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={handleSave} className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              Sauvegarder
            </Button>
            <ThemeToggle />
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-105 lg:hidden ${
                isDark 
                  ? 'hover:bg-white/10 text-white/80' 
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        {/* Content */}
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto pb-20 lg:pb-6">
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Profile Settings */}
            <Card className={`transition-all duration-500 ${
              isDark 
                ? 'bg-white/10 border-white/20 backdrop-blur-xl' 
                : 'bg-white border-gray-200'
            }`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30' 
                      : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                  }`}>
                    <User className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <CardTitle className={`transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      Informations personnelles
                    </CardTitle>
                    <CardDescription className={`transition-colors duration-500 ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      Mettez à jour vos informations de profil
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className={`transition-colors duration-500 ${
                      isDark ? 'text-white/80' : 'text-gray-700'
                    }`}>
                      Nom complet
                    </Label>
                    <Input
                      id="name"
                      value={userSettings.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`mt-1 transition-all duration-500 ${
                        isDark 
                          ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className={`transition-colors duration-500 ${
                      isDark ? 'text-white/80' : 'text-gray-700'
                    }`}>
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={userSettings.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`mt-1 transition-all duration-500 ${
                        isDark 
                          ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company" className={`transition-colors duration-500 ${
                      isDark ? 'text-white/80' : 'text-gray-700'
                    }`}>
                      Entreprise
                    </Label>
                    <Input
                      id="company"
                      value={userSettings.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`mt-1 transition-all duration-500 ${
                        isDark 
                          ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className={`transition-colors duration-500 ${
                      isDark ? 'text-white/80' : 'text-gray-700'
                    }`}>
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      value={userSettings.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`mt-1 transition-all duration-500 ${
                        isDark 
                          ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio" className={`transition-colors duration-500 ${
                    isDark ? 'text-white/80' : 'text-gray-700'
                  }`}>
                    Biographie
                  </Label>
                  <Textarea
                    id="bio"
                    value={userSettings.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className={`mt-1 transition-all duration-500 ${
                      isDark 
                        ? 'bg-white/10 border-white/20 text-white placeholder-white/50' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className={`transition-all duration-500 ${
              isDark 
                ? 'bg-white/10 border-white/20 backdrop-blur-xl' 
                : 'bg-white border-gray-200'
            }`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isDark 
                      ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30' 
                      : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20'
                  }`}>
                    <Globe className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <CardTitle className={`transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      Préférences
                    </CardTitle>
                    <CardDescription className={`transition-colors duration-500 ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      Personnalisez votre expérience
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language" className={`transition-colors duration-500 ${
                      isDark ? 'text-white/80' : 'text-gray-700'
                    }`}>
                      Langue
                    </Label>
                    <Select
                      value={userSettings.language}
                      onValueChange={(value) => handleInputChange('language', value)}
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone" className={`transition-colors duration-500 ${
                      isDark ? 'text-white/80' : 'text-gray-700'
                    }`}>
                      Fuseau horaire
                    </Label>
                    <Select
                      value={userSettings.timezone}
                      onValueChange={(value) => handleInputChange('timezone', value)}
                    >
                      <option value="Africa/Douala">Douala (GMT+1)</option>
                      <option value="Africa/Yaounde">Yaoundé (GMT+1)</option>
                      <option value="Europe/Paris">Paris (GMT+1)</option>
                      <option value="America/New_York">New York (GMT-5)</option>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className={`transition-all duration-500 ${
              isDark 
                ? 'bg-white/10 border-white/20 backdrop-blur-xl' 
                : 'bg-white border-gray-200'
            }`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isDark 
                      ? 'bg-gradient-to-r from-orange-500/30 to-red-500/30' 
                      : 'bg-gradient-to-r from-orange-500/20 to-red-500/20'
                  }`}>
                    <Bell className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <CardTitle className={`transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      Notifications
                    </CardTitle>
                    <CardDescription className={`transition-colors duration-500 ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      Configurez vos préférences de notification
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className={`transition-colors duration-500 ${
                        isDark ? 'text-white/80' : 'text-gray-700'
                      }`}>
                        Notifications par email
                      </Label>
                      <p className={`text-sm transition-colors duration-500 ${
                        isDark ? 'text-white/60' : 'text-gray-500'
                      }`}>
                        Recevez des notifications par email
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={userSettings.notifications.email}
                      onChange={(e) => handleNotificationChange('email', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className={`transition-colors duration-500 ${
                        isDark ? 'text-white/80' : 'text-gray-700'
                      }`}>
                        Notifications push
                      </Label>
                      <p className={`text-sm transition-colors duration-500 ${
                        isDark ? 'text-white/60' : 'text-gray-500'
                      }`}>
                        Recevez des notifications push
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={userSettings.notifications.push}
                      onChange={(e) => handleNotificationChange('push', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className={`transition-colors duration-500 ${
                        isDark ? 'text-white/80' : 'text-gray-700'
                      }`}>
                        Notifications SMS
                      </Label>
                      <p className={`text-sm transition-colors duration-500 ${
                        isDark ? 'text-white/60' : 'text-gray-500'
                      }`}>
                        Recevez des notifications par SMS
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={userSettings.notifications.sms}
                      onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className={`transition-all duration-500 ${
              isDark 
                ? 'bg-white/10 border-white/20 backdrop-blur-xl' 
                : 'bg-white border-gray-200'
            }`}>
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isDark 
                      ? 'bg-gradient-to-r from-red-500/30 to-pink-500/30' 
                      : 'bg-gradient-to-r from-red-500/20 to-pink-500/20'
                  }`}>
                    <Shield className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <CardTitle className={`transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      Sécurité
                    </CardTitle>
                    <CardDescription className={`transition-colors duration-500 ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      Gérez la sécurité de votre compte
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="flex-1">
                    Changer le mot de passe
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Activer l'authentification à deux facteurs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

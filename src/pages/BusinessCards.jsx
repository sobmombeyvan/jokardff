import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Plus, Trash2, Eye, Edit, QrCode, Menu, BarChart3, Calendar, TrendingUp, Copy, Share2, CreditCard } from 'lucide-react';
import Sidebar from '../components/ui/Sidebar';
import ThemeToggle from '../components/ui/ThemeToggle';

const BusinessCards = () => {
  const navigate = useNavigate();
  const { isDark } = useTheme();
  const [activeItem, setActiveItem] = useState('cards');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'Yero - CEO',
      company: 'Jokard Digital',
      url: 'yero',
      views: 1247,
      clicks: 324,
      status: 'active',
      createdAt: '2024-01-15',
      lastViewed: '2024-01-25'
    },
    {
      id: 2,
      name: 'Yero - Marketing',
      company: 'Jokard Digital',
      url: 'yero-marketing',
      views: 892,
      clicks: 156,
      status: 'active',
      createdAt: '2024-01-20',
      lastViewed: '2024-01-24'
    },
    {
      id: 3,
      name: 'Yero - Developer',
      company: 'Jokard Digital',
      url: 'yero-dev',
      views: 567,
      clicks: 89,
      status: 'draft',
      createdAt: '2024-01-22',
      lastViewed: '2024-01-23'
    }
  ]);

  const handleDelete = (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      setCards(cards.filter(card => card.id !== cardId));
    }
  };

  const handleAddCard = () => {
    navigate('/dashboard/bcards/add');
  };

  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(`https://jokard.com/${url}`);
    // You could add a toast notification here
  };

  const handleShare = (url) => {
    if (navigator.share) {
      navigator.share({
        title: 'Ma carte de visite numérique',
        text: 'Découvrez ma carte de visite numérique',
        url: `https://jokard.com/${url}`
      });
    } else {
      handleCopyUrl(url);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return isDark ? 'bg-white/10 text-white/80 border-white/20' : 'bg-gray-100 text-gray-700 border-gray-200';
      case 'draft':
        return isDark ? 'bg-white/5 text-white/60 border-white/10' : 'bg-gray-50 text-gray-600 border-gray-100';
      case 'paused':
        return isDark ? 'bg-white/5 text-white/60 border-white/10' : 'bg-gray-50 text-gray-600 border-gray-100';
      default:
        return isDark ? 'bg-white/5 text-white/60 border-white/10' : 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'draft':
        return 'Brouillon';
      case 'paused':
        return 'En pause';
      default:
        return 'Inconnu';
    }
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
              Cartes de visite numériques
            </h1>
            <p className={`text-sm transition-colors duration-500 ${
              isDark ? 'text-white/60' : 'text-gray-500'
            }`}>
              Gérez vos cartes de visite numériques
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button onClick={handleAddCard} className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une carte
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
          <div className="max-w-5xl w-full mx-auto">
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-500 hover:scale-[1.02] group ${
                isDark 
                  ? 'bg-white/5 border border-white/10 backdrop-blur-xl' 
                  : 'bg-white/80 border border-gray-200/50 shadow-lg'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {cards.length}
                    </div>
                    <div className={`text-sm transition-colors duration-500 ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      Total Cartes
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    isDark 
                      ? 'bg-white/10' 
                      : 'bg-gray-100'
                  }`}>
                    <CreditCard className={`h-6 w-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`} />
                  </div>
                </div>
              </div>

              <div className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-500 hover:scale-[1.02] group ${
                isDark 
                  ? 'bg-white/5 border border-white/10 backdrop-blur-xl' 
                  : 'bg-white/80 border border-gray-200/50 shadow-lg'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {cards.reduce((sum, card) => sum + card.views, 0).toLocaleString()}
                    </div>
                    <div className={`text-sm transition-colors duration-500 ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      Total Vues
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    isDark 
                      ? 'bg-white/10' 
                      : 'bg-gray-100'
                  }`}>
                    <Eye className={`h-6 w-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`} />
                  </div>
                </div>
              </div>

              <div className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-500 hover:scale-[1.02] group ${
                isDark 
                  ? 'bg-white/5 border border-white/10 backdrop-blur-xl' 
                  : 'bg-white/80 border border-gray-200/50 shadow-lg'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {cards.reduce((sum, card) => sum + card.clicks, 0).toLocaleString()}
                    </div>
                    <div className={`text-sm transition-colors duration-500 ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      Total Clics
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    isDark 
                      ? 'bg-white/10' 
                      : 'bg-gray-100'
                  }`}>
                    <TrendingUp className={`h-6 w-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`} />
                  </div>
                </div>
              </div>

              <div className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-500 hover:scale-[1.02] group ${
                isDark 
                  ? 'bg-white/5 border border-white/10 backdrop-blur-xl' 
                  : 'bg-white/80 border border-gray-200/50 shadow-lg'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      {Math.round((cards.reduce((sum, card) => sum + card.clicks, 0) / cards.reduce((sum, card) => sum + card.views, 0)) * 100) || 0}%
                    </div>
                    <div className={`text-sm transition-colors duration-500 ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      Taux de Clic
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                    isDark 
                      ? 'bg-white/10' 
                      : 'bg-gray-100'
                  }`}>
                    <BarChart3 className={`h-6 w-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Cards Grid */}
            {cards.length > 0 ? (
              <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                  <Card key={card.id} className={`hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group ${
                    isDark 
                      ? 'bg-white/10 border-white/20 backdrop-blur-xl hover:bg-white/15' 
                      : 'bg-white border-gray-200 hover:shadow-2xl'
                  }`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <CardTitle className={`text-lg transition-colors duration-500 ${
                              isDark ? 'text-white' : 'text-gray-800'
                            }`}>{card.name}</CardTitle>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(card.status)}`}>
                              {getStatusText(card.status)}
                            </span>
                          </div>
                          <CardDescription className={`transition-colors duration-500 ${
                            isDark ? 'text-white/60' : 'text-gray-500'
                          }`}>{card.company}</CardDescription>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => navigate(`/dashboard/bcards/${card.id}`)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(card.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* URL Section */}
                        <div className="flex items-center justify-between">
                          <span className={`text-sm transition-colors duration-500 ${
                            isDark ? 'text-white/60' : 'text-gray-500'
                          }`}>URL:</span>
                          <div className="flex items-center space-x-2">
                            <span className={`font-mono text-sm transition-colors duration-500 ${
                              isDark ? 'text-white' : 'text-gray-800'
                            }`}>jokard.com/{card.url}</span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleCopyUrl(card.url)}
                              className="p-1 h-6 w-6"
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className={`p-3 rounded-lg transition-all duration-500 ${
                            isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'
                          }`}>
                            <div className="flex items-center space-x-2">
                              <Eye className={`h-4 w-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`} />
                              <div>
                                <div className={`text-lg font-bold transition-colors duration-500 ${
                                  isDark ? 'text-white' : 'text-gray-800'
                                }`}>
                                  {card.views.toLocaleString()}
                                </div>
                                <div className={`text-xs transition-colors duration-500 ${
                                  isDark ? 'text-white/60' : 'text-gray-500'
                                }`}>
                                  Vues
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={`p-3 rounded-lg transition-all duration-500 ${
                            isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'
                          }`}>
                            <div className="flex items-center space-x-2">
                              <TrendingUp className={`h-4 w-4 ${isDark ? 'text-white/70' : 'text-gray-600'}`} />
                              <div>
                                <div className={`text-lg font-bold transition-colors duration-500 ${
                                  isDark ? 'text-white' : 'text-gray-800'
                                }`}>
                                  {card.clicks.toLocaleString()}
                                </div>
                                <div className={`text-xs transition-colors duration-500 ${
                                  isDark ? 'text-white/60' : 'text-gray-500'
                                }`}>
                                  Clics
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Date Info */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-1">
                            <Calendar className={`h-3 w-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                            <span className={`transition-colors duration-500 ${
                              isDark ? 'text-white/60' : 'text-gray-500'
                            }`}>
                              Créé: {new Date(card.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BarChart3 className={`h-3 w-3 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
                            <span className={`transition-colors duration-500 ${
                              isDark ? 'text-white/60' : 'text-gray-500'
                            }`}>
                              Dernière vue: {new Date(card.lastViewed).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => navigate(`/page/${card.url}`)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleShare(card.url)}
                          >
                            <Share2 className="h-4 w-4 mr-1" />
                            Partager
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                          >
                            <QrCode className="h-4 w-4 mr-1" />
                            QR
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center w-full mx-auto py-12">
                <div className="text-center">
                  <div className={`mx-auto h-12 w-12 mb-4 transition-colors duration-500 ${
                    isDark ? 'text-white/40' : 'text-gray-400'
                  }`}>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className={`text-lg font-medium mb-2 transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>No business cards yet</h3>
                  <p className={`mb-4 transition-colors duration-500 ${
                    isDark ? 'text-white/60' : 'text-gray-500'
                  }`}>Get started by creating your first digital business card.</p>
                  <Button onClick={handleAddCard}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first card
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCards;

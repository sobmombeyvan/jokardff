import React, { useState } from 'react';
import { Menu, Eye, CreditCard, MousePointer, MapPin, TrendingUp, Users, Activity } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Sidebar from '../components/ui/Sidebar';
import AreaChart from '../components/ui/AreaChart';
import ThemeToggle from '../components/ui/ThemeToggle';
import Tooltip from '../components/ui/Tooltip';

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark } = useTheme();

  // Données pour le graphique de vues d'ensemble (7 derniers jours)
  const viewsData = [
    { name: 'Lun', total: 45 },
    { name: 'Mar', total: 52 },
    { name: 'Mer', total: 38 },
    { name: 'Jeu', total: 67 },
    { name: 'Ven', total: 89 },
    { name: 'Sam', total: 34 },
    { name: 'Dim', total: 28 }
  ];

  // Données des vues par ville
  const cityViews = [
    { city: 'Douala', views: 156, max: 200 },
    { city: 'Yaoundé', views: 134, max: 200 },
    { city: 'Bamenda', views: 98, max: 200 },
    { city: 'Bafoussam', views: 87, max: 200 },
    { city: 'Garoua', views: 76, max: 200 },
    { city: 'Maroua', views: 65, max: 200 },
    { city: 'Ngaoundéré', views: 54, max: 200 },
    { city: 'Bertoua', views: 43, max: 200 }
  ];

  // Métriques principales
  const totalCards = 1247;
  const totalViews = 15600;
  const totalClicks = 3240;

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
                  Dashboard Yero
                </h1>
                <p className={`text-sm transition-colors duration-500 ${
                  isDark ? 'text-white/60' : 'text-gray-500'
                }`}>
                  Bienvenue sur votre tableau de bord
                </p>
              </div>
          <div className="flex items-center space-x-3">
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
          {/* Top Row - Métriques principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                {/* Carte Total Cartes */}
                <div className={`relative overflow-hidden rounded-2xl p-4 lg:p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group ${
                  isDark 
                    ? 'bg-white/5 border border-white/10 backdrop-blur-xl' 
                    : 'bg-white/80 border border-gray-200/50 shadow-lg'
                }`}>
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                          isDark 
                            ? 'bg-white/10' 
                            : 'bg-gray-100'
                        }`}>
                          <CreditCard className={`h-6 w-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className={`text-sm font-semibold transition-colors duration-500 ${
                        isDark ? 'text-white/90' : 'text-gray-700'
                      }`}>
                        Total Cartes
                      </h3>
                      <p className={`text-xs transition-colors duration-500 ${
                        isDark ? 'text-white/60' : 'text-gray-500'
                      }`}>
                        Cartes numériques
                      </p>
                    </div>
                  </div>
                      <Tooltip content="Croissance de 12.5% par rapport au mois dernier">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium cursor-help transition-all duration-300 hover:scale-105 ${
                          isDark 
                            ? 'bg-white/10 text-white/80 border border-white/20' 
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-3 w-3" />
                        <span>+12.5%</span>
                      </div>
                    </div>
                  </Tooltip>
                </div>
                
                <div className={`text-2xl lg:text-4xl font-bold mb-2 transition-colors duration-500 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {totalCards.toLocaleString()}
                </div>
                
                <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-white/60' : 'bg-gray-500'}`}></div>
                        <span className={`text-sm font-medium transition-colors duration-500 ${
                          isDark ? 'text-white/80' : 'text-gray-600'
                        }`}>
                          +156 ce mois
                        </span>
                      </div>
                  <div className={`text-xs transition-colors duration-500 ${
                    isDark ? 'text-white/50' : 'text-gray-400'
                  }`}>
                    vs mois dernier
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte Total Vues */}
            <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group ${
              isDark 
                ? 'bg-white/5 border border-white/10 backdrop-blur-xl' 
                : 'bg-white/80 border border-gray-200/50 shadow-lg'
            }`}>
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      isDark 
                        ? 'bg-white/10' 
                        : 'bg-gray-100'
                    }`}>
                      <Eye className={`h-6 w-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className={`text-sm font-semibold transition-colors duration-500 ${
                        isDark ? 'text-white/90' : 'text-gray-700'
                      }`}>
                        Total Vues
                      </h3>
                      <p className={`text-xs transition-colors duration-500 ${
                        isDark ? 'text-white/60' : 'text-gray-500'
                      }`}>
                        Vues de cartes
                      </p>
                    </div>
                  </div>
                  <Tooltip content="Augmentation de 8.2% cette semaine">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium cursor-help transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-white/10 text-white/80 border border-white/20' 
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-1">
                        <Activity className="h-3 w-3" />
                        <span>+8.2%</span>
                      </div>
                    </div>
                  </Tooltip>
                </div>
                
                <div className={`text-4xl font-bold mb-2 transition-colors duration-500 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {totalViews.toLocaleString()}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-white/60' : 'bg-gray-500'}`}></div>
                    <span className={`text-sm font-medium transition-colors duration-500 ${
                      isDark ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      +1,280 cette semaine
                    </span>
                  </div>
                  <div className={`text-xs transition-colors duration-500 ${
                    isDark ? 'text-white/50' : 'text-gray-400'
                  }`}>
                    vs semaine dernière
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte Total Clics */}
            <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group ${
              isDark 
                ? 'bg-white/5 border border-white/10 backdrop-blur-xl' 
                : 'bg-white/80 border border-gray-200/50 shadow-lg'
            }`}>
              {/* Effet de brillance */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      isDark 
                        ? 'bg-white/10' 
                        : 'bg-gray-100'
                    }`}>
                      <MousePointer className={`h-6 w-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className={`text-sm font-semibold transition-colors duration-500 ${
                        isDark ? 'text-white/90' : 'text-gray-700'
                      }`}>
                        Total Clics
                      </h3>
                      <p className={`text-xs transition-colors duration-500 ${
                        isDark ? 'text-white/60' : 'text-gray-500'
                      }`}>
                        Interactions
                      </p>
                    </div>
                  </div>
                  <Tooltip content="Hausse de 15.3% aujourd'hui">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium cursor-help transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-white/10 text-white/80 border border-white/20' 
                        : 'bg-gray-100 text-gray-700 border border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>+15.3%</span>
                      </div>
                    </div>
                  </Tooltip>
                </div>
                
                <div className={`text-4xl font-bold mb-2 transition-colors duration-500 ${
                  isDark ? 'text-white' : 'text-gray-800'
                }`}>
                  {totalClicks.toLocaleString()}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-white/60' : 'bg-gray-500'}`}></div>
                    <span className={`text-sm font-medium transition-colors duration-500 ${
                      isDark ? 'text-white/80' : 'text-gray-600'
                    }`}>
                      +432 aujourd'hui
                    </span>
                  </div>
                  <div className={`text-xs transition-colors duration-500 ${
                    isDark ? 'text-white/50' : 'text-gray-400'
                  }`}>
                    vs hier
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Middle Row - Graphique de vues d'ensemble */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {/* Graphique principal */}
            <div className={`relative overflow-hidden rounded-2xl p-4 lg:p-6 transition-all duration-500 hover:shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-slate-900/40 to-gray-900/40 border border-slate-700/50 backdrop-blur-xl' 
                : 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-gray-200/50 shadow-xl'
            }`}>
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 lg:mb-6 gap-2 lg:gap-0">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    isDark 
                      ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30' 
                      : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                  }`}>
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className={`text-base lg:text-lg font-bold transition-colors duration-500 ${
                      isDark ? 'text-white' : 'text-gray-800'
                    }`}>
                      Vue d'ensemble des vues
                    </h3>
                    <p className={`text-xs lg:text-sm transition-colors duration-500 ${
                      isDark ? 'text-white/60' : 'text-gray-500'
                    }`}>
                      7 derniers jours
                    </p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isDark 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-green-100 text-green-600 border border-green-200'
                }`}>
                  +12.3% vs semaine dernière
                </div>
              </div>
              <AreaChart data={viewsData} />
            </div>
            
            {/* Métriques rapides */}
            <div className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl ${
              isDark 
                ? 'bg-gradient-to-br from-slate-900/40 to-gray-900/40 border border-slate-700/50 backdrop-blur-xl' 
                : 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-gray-200/50 shadow-xl'
            }`}>
              <div className="flex items-center space-x-3 mb-6">
                <div className={`p-2 rounded-lg ${
                  isDark 
                    ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30' 
                    : 'bg-gradient-to-r from-green-500/20 to-emerald-500/20'
                }`}>
                  <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className={`text-lg font-bold transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Statistiques rapides
                  </h3>
                  <p className={`text-sm transition-colors duration-500 ${
                    isDark ? 'text-white/60' : 'text-gray-500'
                  }`}>
                    Performance clés
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Taux de conversion */}
                <div className={`relative overflow-hidden p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] group ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30' 
                    : 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-bold transition-colors duration-500 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        78%
                      </div>
                      <div className={`text-sm transition-colors duration-500 ${
                        isDark ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        Taux de conversion
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                      isDark 
                        ? 'bg-blue-500/20' 
                        : 'bg-blue-100'
                    }`}>
                      <div className={`w-6 h-6 rounded-full border-2 border-blue-500 ${
                        isDark ? 'bg-blue-500/20' : 'bg-blue-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
                
                {/* Temps de chargement */}
                <div className={`relative overflow-hidden p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] group ${
                  isDark 
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30' 
                    : 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-bold transition-colors duration-500 ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`}>
                        2.3s
                      </div>
                      <div className={`text-sm transition-colors duration-500 ${
                        isDark ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        Temps de chargement moyen
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                      isDark 
                        ? 'bg-green-500/20' 
                        : 'bg-green-100'
                    }`}>
                      <div className={`w-6 h-6 rounded-full border-2 border-green-500 ${
                        isDark ? 'bg-green-500/20' : 'bg-green-500'
                      }`}></div>
                    </div>
                  </div>
                </div>
                
                {/* Note utilisateur */}
                <div className={`relative overflow-hidden p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] group ${
                  isDark 
                    ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-400/30' 
                    : 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`text-2xl font-bold transition-colors duration-500 ${
                        isDark ? 'text-orange-400' : 'text-orange-600'
                      }`}>
                        4.8/5
                      </div>
                      <div className={`text-sm transition-colors duration-500 ${
                        isDark ? 'text-white/80' : 'text-gray-600'
                      }`}>
                        Note utilisateur
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg transition-all duration-300 group-hover:scale-110 ${
                      isDark 
                        ? 'bg-orange-500/20' 
                        : 'bg-orange-100'
                    }`}>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-1 h-4 rounded-full ${
                            i < 4 ? (isDark ? 'bg-orange-400' : 'bg-orange-500') : (isDark ? 'bg-orange-400/30' : 'bg-orange-200')
                          }`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Row - Vues par ville */}
          <div className={`relative overflow-hidden rounded-2xl p-4 lg:p-6 transition-all duration-500 hover:shadow-2xl ${
            isDark 
              ? 'bg-gradient-to-br from-slate-900/40 to-gray-900/40 border border-slate-700/50 backdrop-blur-xl' 
              : 'bg-gradient-to-br from-white/90 to-gray-50/90 border border-gray-200/50 shadow-xl'
          }`}>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 lg:mb-6 gap-2 lg:gap-0">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30' 
                    : 'bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                }`}>
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <h3 className={`text-base lg:text-lg font-bold transition-colors duration-500 ${
                    isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                    Vues par ville
                  </h3>
                  <p className={`text-xs lg:text-sm transition-colors duration-500 ${
                    isDark ? 'text-white/60' : 'text-gray-500'
                  }`}>
                    Répartition géographique
                  </p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                isDark 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-blue-100 text-blue-600 border border-blue-200'
              }`}>
                Top 8 villes
              </div>
            </div>
            
            <div className="space-y-4">
              {cityViews.map((city, index) => {
                const percentage = Math.round((city.views / city.max) * 100);
                const isTopCity = index < 3;
                const cityColors = [
                  'from-yellow-400 to-orange-500',
                  'from-gray-300 to-gray-500', 
                  'from-orange-400 to-red-500',
                  'from-blue-400 to-purple-500',
                  'from-green-400 to-emerald-500',
                  'from-pink-400 to-rose-500',
                  'from-indigo-400 to-blue-500',
                  'from-teal-400 to-cyan-500'
                ];
                
                return (
                  <div key={index} className={`relative overflow-hidden p-4 lg:p-5 rounded-2xl transition-all duration-500 hover:scale-[1.02] group ${
                    isDark 
                      ? 'bg-gradient-to-r from-white/5 to-white/10 hover:from-white/10 hover:to-white/15 border border-white/20' 
                      : 'bg-gradient-to-r from-white/70 to-white/90 hover:from-white/80 hover:to-white shadow-lg border border-gray-200/50'
                  }`}>
                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-3 lg:mb-4 gap-2 lg:gap-0">
                        <div className="flex items-center space-x-2 lg:space-x-4">
                          {isTopCity && (
                            <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs lg:text-sm font-bold shadow-lg ${
                              index === 0 ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' :
                              index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' :
                              'bg-gradient-to-r from-orange-400 to-red-500 text-white'
                            }`}>
                              {index + 1}
                            </div>
                          )}
                          <div className="flex items-center space-x-2 lg:space-x-3">
                            <div className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 group-hover:scale-150 bg-gradient-to-r ${cityColors[index]}`}></div>
                            <span className={`font-bold text-sm lg:text-lg transition-colors duration-500 ${
                              isDark ? 'text-white' : 'text-gray-800'
                            }`}>
                              {city.city}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 lg:space-x-4">
                          <div className="text-right">
                            <div className={`text-sm lg:text-lg font-bold transition-colors duration-500 ${
                              isDark ? 'text-white' : 'text-gray-800'
                            }`}>
                              {city.views.toLocaleString()}
                            </div>
                            <div className={`text-xs transition-colors duration-500 ${
                              isDark ? 'text-white/60' : 'text-gray-500'
                            }`}>
                              vues
                            </div>
                          </div>
                          <div className={`px-2 lg:px-3 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-bold shadow-lg ${
                            isTopCity 
                              ? (isDark ? 'bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-400 border border-green-500/50' : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200')
                              : (isDark ? 'bg-gradient-to-r from-gray-500/30 to-gray-600/30 text-gray-400 border border-gray-500/50' : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300')
                          }`}>
                            {percentage}%
                          </div>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className={`w-full rounded-full h-3 overflow-hidden shadow-inner ${
                          isDark ? 'bg-white/10' : 'bg-gray-200'
                        }`}>
                          <div 
                            className={`h-full rounded-full transition-all duration-1500 ease-out relative bg-gradient-to-r ${cityColors[index]}`}
                            style={{ width: `${percentage}%` }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                          </div>
                        </div>
                        
                        {/* Indicateur de pourcentage sur la barre */}
                        <div 
                          className={`absolute top-0 h-3 w-0.5 bg-white/80 rounded-full transition-all duration-1500 ease-out ${
                            percentage > 10 ? 'opacity-100' : 'opacity-0'
                          }`}
                          style={{ left: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

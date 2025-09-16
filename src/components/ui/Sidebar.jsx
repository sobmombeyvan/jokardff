import React from 'react';
import { LayoutDashboard, CreditCard, User, Settings, LogOut } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeItem, onItemClick }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'cards', label: 'Cartes numérique', icon: CreditCard, path: '/dashboard/bcards' }
  ];

  const handleItemClick = (item) => {
    onItemClick(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
    navigate('/login');
  };

  return (
    <div className={`w-full lg:w-64 h-full lg:h-screen shadow-2xl flex flex-col transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-b from-slate-900 via-gray-900 to-slate-800' 
        : 'bg-gradient-to-b from-indigo-600 via-purple-600 to-indigo-700'
    }`}>
      {/* Brand Logo */}
      <div className={`p-4 lg:p-6 border-b transition-colors duration-500 ${
        isDark ? 'border-slate-700' : 'border-purple-500/30'
      }`}>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
            isDark 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
              : 'bg-gradient-to-r from-white to-indigo-100'
          }`}>
            <span className={`font-bold text-xl ${
              isDark ? 'text-white' : 'text-indigo-600'
            }`}>J</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-base lg:text-lg">JoKard</h3>
            <p className={`text-xs lg:text-sm transition-colors duration-500 ${
              isDark ? 'text-slate-300' : 'text-indigo-200'
            }`}>
              Digital Business Cards
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-4 lg:mt-6 flex-1 px-2 lg:px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 text-left transition-all duration-300 rounded-xl mb-2 group relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30 text-white shadow-lg border border-indigo-400/50'
                  : 'text-slate-300 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 hover:text-white hover:shadow-md'
              }`}
            >
              {/* Effet de brillance pour l'élément actif */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              )}
              
              <div className={`p-2 rounded-lg transition-all duration-300 ${
                isActive 
                  ? 'bg-gradient-to-r from-indigo-500/40 to-purple-500/40' 
                  : 'bg-slate-700/50 group-hover:bg-gradient-to-r group-hover:from-indigo-500/30 group-hover:to-purple-500/30'
              }`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-semibold relative z-10 text-sm lg:text-base">{item.label}</span>
              
              {/* Indicateur actif */}
              {isActive && (
                <div className="ml-auto w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </nav>

              {/* User Profile Section */}
              <div className={`border-t p-4 lg:p-6 transition-colors duration-500 ${
                isDark ? 'border-slate-700' : 'border-purple-500/30'
              }`}>
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <User className="h-6 w-6 text-blue-900" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm lg:text-lg">Yero</h3>
                    <p className={`text-xs lg:text-sm transition-colors duration-500 ${
                      isDark ? 'text-blue-200' : 'text-blue-100'
                    }`}>
                      yero@jokard.com
                    </p>
                  </div>
                </div>

              {/* User Actions */}
              <div className="space-y-2 px-2 lg:px-3">
            <button
              onClick={() => {
                onItemClick('settings');
                navigate('/dashboard/settings');
              }}
              className={`w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 text-left transition-all duration-300 rounded-xl group relative overflow-hidden ${
                activeItem === 'settings'
                  ? 'bg-white/20 text-white shadow-lg border border-white/30'
                  : 'text-blue-200 hover:bg-white/10 hover:text-white hover:shadow-md'
              }`}
            >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    activeItem === 'settings' 
                      ? 'bg-white/20' 
                      : 'bg-white/10 group-hover:bg-white/20'
                  }`}>
                    <Settings className="h-4 w-4" />
                  </div>
                  <span className="text-xs lg:text-sm font-semibold">Paramètres</span>
                  {activeItem === 'settings' && (
                    <div className="ml-auto w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  )}
                </button>
                
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 text-left transition-all duration-300 rounded-xl group relative overflow-hidden text-red-300 hover:bg-red-500/20 hover:text-white hover:shadow-md"
                >
                  <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-all duration-300">
                    <LogOut className="h-4 w-4" />
                  </div>
                  <span className="text-xs lg:text-sm font-semibold">Déconnexion</span>
                </button>
              </div>
      </div>
    </div>
  );
};

export default Sidebar;


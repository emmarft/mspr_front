import React from 'react';
import { Bell, Search, User, Coffee, LogIn, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const Header: React.FC = () => {
  const { user, openLoginModal } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Coffee className="h-8 w-8 text-coffee-600" />
            <h1 className="text-2xl font-bold text-coffee-800">PayeTonKawa</h1>
          </div>
          <div className="hidden md:block text-sm text-gray-500">
            Votre boutique de café en ligne
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Barre de recherche */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            />
          </div>

          {user ? (
            <>
              {/* Panier */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-coffee-600 text-white text-xs rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profil utilisateur */}
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-coffee-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-coffee-600" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  {user.nom}
                </span>
              </div>
            </>
          ) : (
            <button
              onClick={openLoginModal}
              className="flex items-center space-x-2 px-4 py-2 bg-coffee-600 text-white rounded-lg hover:bg-coffee-700 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span>Se connecter</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
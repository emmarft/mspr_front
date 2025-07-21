import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  User,
  LogOut,
  Coffee
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Boutique', href: '/', icon: LayoutDashboard },
  { name: 'Produits', href: '/produits', icon: Package },
  { name: 'Mes Commandes', href: '/mes-commandes', icon: ShoppingCart },
  { name: 'Mon Profil', href: '/profil', icon: User },
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg border-r border-gray-200">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <Coffee className="h-8 w-8 text-coffee-600" />
          <span className="text-xl font-bold text-coffee-800">PayeTonKawa</span>
        </div>
        
        {user ? (
          <>
            <div className="mb-6 p-3 bg-coffee-50 rounded-lg">
              <p className="text-sm text-coffee-600">Connecté en tant que</p>
              <p className="font-medium text-coffee-800">{user.nom}</p>
            </div>
            
            <nav className="space-y-2">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-coffee-100 text-coffee-700 border-r-2 border-coffee-600'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </nav>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                onClick={logout}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 w-full transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Déconnexion</span>
              </button>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <p className="text-sm">Connectez-vous pour accéder à votre espace</p>
          </div>
        )}
      </div>

      {/* Status des services */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Status des Services
          </h4>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Produits API</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-600">Commandes API</span>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
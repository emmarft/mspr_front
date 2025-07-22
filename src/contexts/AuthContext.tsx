import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  nom: string;
  email: string;
  telephone?: string;
  adresse?: string;
  type: 'particulier' | 'professionnel';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  loading: boolean;
}

interface RegisterData {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  phone?: string;
  role: "Professionnel" | "Particulier" | "admin"
  company: {
    name?: string;
    siret?: string;
  };
  address: {
    line1?: string;
    line2?: string;
    postal_code?: string;
    city?: string;
    country?: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // Vérifier si un token existe au démarrage
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Erreur lors du parsing des données utilisateur:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log("Payload envoyé :", user);

      const response = await fetch('http://localhost:8081/payetonkawa/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Réponse brute :", response);

      if (!response.ok) {
        try {
          const errorText = await response.text();
          console.error("Erreur backend brute :", errorText);
        } catch (err) {
          console.error("Impossible de lire le corps de l'erreur :", err);
        }
        throw new Error("Erreur lors de la connexion");
      }


      const data = await response.json();

      // Stocker le token et les données utilisateur
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));

      setUser(data.user);
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      // Simulation d'appel API - remplacez par votre vraie API
      const response = await fetch('http://localhost:8081/payetonkawa/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription');
      }

      const data = await response.json();

      // Connexion automatique après inscription
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('user_data', JSON.stringify(data.user));

      setUser(data.user);
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const value = {
    user,
    login,
    register,
    logout,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
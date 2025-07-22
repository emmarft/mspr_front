import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { Layout } from './components/Layout/Layout';
import { LoginModal } from './components/Auth/LoginModal';
import { Boutique } from './pages/Boutique';
import { Produits } from './pages/Produits';
import { MesCommandes } from './pages/MesCommandes';
import { Profil } from './pages/Profil';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Dashboard } from './pages/Dashboard';
import { Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Composant pour gérer la redirection de la page d'accueil
const HomePage: React.FC = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  // Si l'utilisateur est connecté, rediriger vers le dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  // Sinon, afficher la boutique
  return <Boutique />;
};

// Configuration React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/boutique" element={<Boutique />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/produits" element={<Produits />} />
              <Route path="/mes-commandes" element={<MesCommandes />} />
              <Route path="/profil" element={<Profil />} />
            </Routes>
          </Layout>
          <LoginModal />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
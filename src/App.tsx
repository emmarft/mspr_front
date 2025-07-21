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
import { ProtectedRoute } from './components/protectedRoute';
import { Dashboard } from './pages/Dashboard';

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
              <Route path="/" element={<Boutique />} />
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
import React, { useEffect, useState } from 'react';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Users, Package, ShoppingCart, TrendingUp, Coffee, AlertCircle } from 'lucide-react';

// Données de démonstration
const mockStats = {
  totalClients: 1247,
  totalProduits: 89,
  totalCommandes: 3456,
  chiffreAffaires: 125430,
  commandesRecentes: [
    {
      id: '1',
      clientId: '1',
      client: { nom: 'Café Central', type: 'professionnel' },
      total: 450.00,
      statut: 'confirmee',
      dateCommande: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      clientId: '2',
      client: { nom: 'Marie Dubois', type: 'particulier' },
      total: 89.50,
      statut: 'en_preparation',
      dateCommande: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      clientId: '3',
      client: { nom: 'Restaurant Le Grain', type: 'professionnel' },
      total: 1250.00,
      statut: 'expediee',
      dateCommande: '2024-01-14T16:45:00Z'
    }
  ]
};

const mockApiStatus = {
  clients: true,
  produits: true,
  commandes: false
};

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState(mockStats);
  const [apiStatus, setApiStatus] = useState(mockApiStatus);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation du chargement des données
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusBadge = (statut: string) => {
    const statusMap = {
      'en_attente': { variant: 'warning' as const, label: 'En attente' },
      'confirmee': { variant: 'info' as const, label: 'Confirmée' },
      'en_preparation': { variant: 'warning' as const, label: 'En préparation' },
      'expediee': { variant: 'info' as const, label: 'Expédiée' },
      'livree': { variant: 'success' as const, label: 'Livrée' },
      'annulee': { variant: 'error' as const, label: 'Annulée' }
    };
    
    return statusMap[statut as keyof typeof statusMap] || { variant: 'default' as const, label: statut };
  };

  if (loading) {
    return <LoadingSpinner size="lg" text="Chargement du dashboard..." />;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Vue d'ensemble de votre plateforme PayeTonKawa
        </p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Clients</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalClients.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Produits</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProduits}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-coffee-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-coffee-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCommandes.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">CA Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.chiffreAffaires.toLocaleString()} €</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Commandes récentes */}
        <Card 
          title="Commandes Récentes" 
          subtitle="Les dernières commandes passées"
        >
          <div className="space-y-4">
            {stats.commandesRecentes.map((commande) => (
              <div key={commande.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Coffee className="h-8 w-8 text-coffee-600" />
                  <div>
                    <p className="font-medium text-gray-900">{commande.client?.nom}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(commande.dateCommande).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{commande.total.toFixed(2)} €</p>
                  <Badge variant={getStatusBadge(commande.statut).variant} size="sm">
                    {getStatusBadge(commande.statut).label}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Status des APIs */}
        <Card 
          title="Status des Microservices" 
          subtitle="État en temps réel des services"
        >
          <div className="space-y-4">
            {Object.entries(apiStatus).map(([service, status]) => (
              <div key={service} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${status ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{service} API</p>
                    <p className="text-sm text-gray-600">
                      Port 808{service === 'clients' ? '1' : service === 'produits' ? '2' : '3'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!status && <AlertCircle className="h-4 w-4 text-red-500" />}
                  <Badge variant={status ? 'success' : 'error'} size="sm">
                    {status ? 'En ligne' : 'Hors ligne'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
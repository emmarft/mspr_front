import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Plus, Search, Filter, Eye, Edit, Trash2, ShoppingCart, TrendingUp } from 'lucide-react';

// Données de démonstration
const mockCommandes = [
  {
    id: '1',
    clientId: '1',
    client: { nom: 'Café Central', type: 'professionnel' },
    produits: [
      { produitId: '1', produit: { nom: 'Arabica Éthiopie' }, quantite: 10, prixUnitaire: 24.90 },
      { produitId: '2', produit: { nom: 'Robusta Vietnam' }, quantite: 5, prixUnitaire: 19.90 }
    ],
    statut: 'confirmee' as const,
    total: 348.50,
    dateCommande: '2024-01-15T10:30:00Z',
    dateLivraison: '2024-01-18T14:00:00Z',
    adresseLivraison: '123 Rue de la Paix, 75001 Paris'
  },
  {
    id: '2',
    clientId: '2',
    client: { nom: 'Marie Dubois', type: 'particulier' },
    produits: [
      { produitId: '3', produit: { nom: 'Blend Maison' }, quantite: 2, prixUnitaire: 22.50 }
    ],
    statut: 'en_preparation' as const,
    total: 45.00,
    dateCommande: '2024-01-15T09:15:00Z',
    adresseLivraison: '45 Avenue des Champs, 69001 Lyon'
  },
  {
    id: '3',
    clientId: '3',
    client: { nom: 'Restaurant Le Grain', type: 'professionnel' },
    produits: [
      { produitId: '1', produit: { nom: 'Arabica Éthiopie' }, quantite: 20, prixUnitaire: 24.90 },
      { produitId: '4', produit: { nom: 'Colombie Supremo' }, quantite: 15, prixUnitaire: 26.90 }
    ],
    statut: 'expediee' as const,
    total: 901.50,
    dateCommande: '2024-01-14T16:45:00Z',
    dateLivraison: '2024-01-17T10:00:00Z',
    adresseLivraison: '78 Boulevard du Commerce, 13001 Marseille'
  },
  {
    id: '4',
    clientId: '4',
    client: { nom: 'Pierre Martin', type: 'particulier' },
    produits: [
      { produitId: '2', produit: { nom: 'Robusta Vietnam' }, quantite: 1, prixUnitaire: 19.90 }
    ],
    statut: 'livree' as const,
    total: 19.90,
    dateCommande: '2024-01-12T11:20:00Z',
    dateLivraison: '2024-01-15T09:30:00Z',
    adresseLivraison: '12 Rue Victor Hugo, 33000 Bordeaux'
  },
  {
    id: '5',
    clientId: '2',
    client: { nom: 'Marie Dubois', type: 'particulier' },
    produits: [
      { produitId: '1', produit: { nom: 'Arabica Éthiopie' }, quantite: 3, prixUnitaire: 24.90 }
    ],
    statut: 'annulee' as const,
    total: 74.70,
    dateCommande: '2024-01-10T14:15:00Z',
    adresseLivraison: '45 Avenue des Champs, 69001 Lyon'
  }
];

export const Commandes: React.FC = () => {
  const [commandes] = useState(mockCommandes);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatut, setFilterStatut] = useState<string>('tous');

  const statuts = ['tous', 'en_attente', 'confirmee', 'en_preparation', 'expediee', 'livree', 'annulee'];

  const filteredCommandes = commandes.filter(commande => {
    const matchesSearch = commande.client?.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commande.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatut = filterStatut === 'tous' || commande.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

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

  const totalCA = commandes
    .filter(c => c.statut !== 'annulee')
    .reduce((acc, c) => acc + c.total, 0);

  if (loading) {
    return <LoadingSpinner size="lg" text="Chargement des commandes..." />;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Commandes</h1>
          <p className="text-gray-600 mt-2">
            Suivez et gérez toutes les commandes de vos clients
          </p>
        </div>
        <button className="btn btn-primary btn-md">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Commande
        </button>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher une commande..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterStatut}
              onChange={(e) => setFilterStatut(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            >
              <option value="tous">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="confirmee">Confirmée</option>
              <option value="en_preparation">En préparation</option>
              <option value="expediee">Expédiée</option>
              <option value="livree">Livrée</option>
              <option value="annulee">Annulée</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{commandes.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">CA Total</p>
              <p className="text-2xl font-bold text-gray-900">{totalCA.toFixed(2)} €</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En cours</p>
              <p className="text-2xl font-bold text-gray-900">
                {commandes.filter(c => ['en_attente', 'confirmee', 'en_preparation', 'expediee'].includes(c.statut)).length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-coffee-100 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-coffee-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Livrées</p>
              <p className="text-2xl font-bold text-gray-900">
                {commandes.filter(c => c.statut === 'livree').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Liste des commandes */}
      <Card title="Liste des Commandes" subtitle={`${filteredCommandes.length} commande(s) trouvée(s)`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commande
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCommandes.map((commande) => (
                <tr key={commande.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{commande.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{commande.client?.nom}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {commande.produits.map((p, index) => (
                        <div key={index} className="mb-1">
                          {p.produit?.nom} (x{p.quantite})
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{commande.total.toFixed(2)} €</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={getStatusBadge(commande.statut).variant}>
                      {getStatusBadge(commande.statut).label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>{new Date(commande.dateCommande).toLocaleDateString('fr-FR')}</div>
                    {commande.dateLivraison && (
                      <div className="text-xs text-gray-400">
                        Livraison: {new Date(commande.dateLivraison).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-coffee-600 hover:text-coffee-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Plus, Search, Filter, Edit, Trash2, User, Building } from 'lucide-react';

// Données de démonstration
const mockClients = [
  {
    id: '1',
    nom: 'Café Central',
    email: 'contact@cafecentral.fr',
    telephone: '01 23 45 67 89',
    adresse: '123 Rue de la Paix, 75001 Paris',
    type: 'professionnel' as const,
    dateCreation: '2023-06-15T10:00:00Z',
    actif: true
  },
  {
    id: '2',
    nom: 'Marie Dubois',
    email: 'marie.dubois@email.fr',
    telephone: '06 12 34 56 78',
    adresse: '45 Avenue des Champs, 69001 Lyon',
    type: 'particulier' as const,
    dateCreation: '2023-08-22T14:30:00Z',
    actif: true
  },
  {
    id: '3',
    nom: 'Restaurant Le Grain',
    email: 'legrain@restaurant.fr',
    telephone: '04 56 78 90 12',
    adresse: '78 Boulevard du Commerce, 13001 Marseille',
    type: 'professionnel' as const,
    dateCreation: '2023-09-10T09:15:00Z',
    actif: true
  },
  {
    id: '4',
    nom: 'Pierre Martin',
    email: 'pierre.martin@gmail.com',
    telephone: '07 89 01 23 45',
    adresse: '12 Rue Victor Hugo, 33000 Bordeaux',
    type: 'particulier' as const,
    dateCreation: '2023-11-05T16:45:00Z',
    actif: false
  }
];

export const Clients: React.FC = () => {
  const [clients] = useState(mockClients);
  const [loading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'tous' | 'particulier' | 'professionnel'>('tous');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'tous' || client.type === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return <LoadingSpinner size="lg" text="Chargement des clients..." />;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Clients</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos clients particuliers et professionnels
          </p>
        </div>
        <button className="btn btn-primary btn-md">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Client
        </button>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher un client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            >
              <option value="tous">Tous les types</option>
              <option value="particulier">Particuliers</option>
              <option value="professionnel">Professionnels</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Particuliers</p>
              <p className="text-2xl font-bold text-gray-900">
                {clients.filter(c => c.type === 'particulier').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Building className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Professionnels</p>
              <p className="text-2xl font-bold text-gray-900">
                {clients.filter(c => c.type === 'professionnel').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-coffee-100 rounded-lg">
              <User className="h-6 w-6 text-coffee-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clients Actifs</p>
              <p className="text-2xl font-bold text-gray-900">
                {clients.filter(c => c.actif).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Liste des clients */}
      <Card title="Liste des Clients" subtitle={`${filteredClients.length} client(s) trouvé(s)`}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date création
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-coffee-100 flex items-center justify-center">
                          {client.type === 'professionnel' ? (
                            <Building className="h-5 w-5 text-coffee-600" />
                          ) : (
                            <User className="h-5 w-5 text-coffee-600" />
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{client.nom}</div>
                        <div className="text-sm text-gray-500">{client.adresse}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{client.email}</div>
                    <div className="text-sm text-gray-500">{client.telephone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={client.type === 'professionnel' ? 'info' : 'default'}>
                      {client.type === 'professionnel' ? 'Professionnel' : 'Particulier'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={client.actif ? 'success' : 'error'}>
                      {client.actif ? 'Actif' : 'Inactif'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(client.dateCreation).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
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
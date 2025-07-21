import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_PRODUITS } from '../config';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Plus, Search, Filter, Edit, Trash2, Package, Coffee } from 'lucide-react';

type Produit = {
  id: string;
  nom: string;
  description: string;
  prix: number;
  stock: number;
  origine: string;
  intensite: number;
  image: string;
  actif: boolean;
  dateCreation: string;
};

export const Produits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrigine, setFilterOrigine] = useState<string>('tous');

  const { data: produits, error, isLoading } = useQuery<Produit[], Error>({
    queryKey: ['produits'],
    queryFn: async () => {
      const res = await fetch(API_PRODUITS);
      if (!res.ok) throw new Error('Erreur');
      return res.json();
    },
  });

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Chargement des produits..." />;
  }

  if (error) {
    return <div className="text-red-600 p-4">Erreur : {error.message}</div>;
  }

  // Générer la liste des origines dynamiquement (avec "tous")
  const origines = ['tous', ...Array.from(new Set(produits?.map(p => p.origine) ?? []))];

  // Filtrer les produits selon recherche et filtre origine
  const filteredProduits = (produits ?? []).filter((produit) => {
    const nom = produit.nom?.toLowerCase() ?? '';
    const description = produit.description?.toLowerCase() ?? '';
    const matchesSearch =
      nom.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
    const matchesOrigine = filterOrigine === 'tous' || produit.origine === filterOrigine;
    return matchesSearch && matchesOrigine;
  });

  const getIntensiteColor = (intensite: number) => {
    if (intensite <= 2) return 'bg-green-500';
    if (intensite <= 3) return 'bg-yellow-500';
    if (intensite <= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) return { variant: 'error' as const, label: 'Rupture' };
    if (stock < 50) return { variant: 'warning' as const, label: 'Stock faible' };
    return { variant: 'success' as const, label: 'En stock' };
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
          <p className="text-gray-600 mt-2">Gérez votre catalogue de cafés du monde entier</p>
        </div>
        <button className="btn btn-primary btn-md">
          <Plus className="h-4 w-4 mr-2" />
          Nouveau Produit
        </button>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={filterOrigine}
              onChange={(e) => setFilterOrigine(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-coffee-500 focus:border-transparent"
            >
              {origines.map((origine, index) => (
                <option key={`${origine}-${index}`} value={origine}>
                  {origine === 'tous' ? 'Toutes les origines' : origine}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-coffee-100 rounded-lg">
              <Package className="h-6 w-6 text-coffee-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Produits</p>
              <p className="text-2xl font-bold text-gray-900">{(produits ?? []).length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Coffee className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En Stock</p>
              <p className="text-2xl font-bold text-gray-900">{(produits ?? []).filter((p) => p.stock > 0).length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <Package className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rupture</p>
              <p className="text-2xl font-bold text-gray-900">{(produits ?? []).filter((p) => p.stock === 0).length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Coffee className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Prix Moyen</p>
              <p className="text-2xl font-bold text-gray-900">
                {((produits ?? []).reduce((acc, p) => acc + p.prix, 0) / (produits ?? []).length).toFixed(2)} €
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Grille des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProduits.map((produit) => (
          <Card key={produit.id} className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img src={produit.image} alt={produit.nom} className="w-full h-48 object-cover" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{produit.nom}</h3>
                <Badge variant={produit.actif ? 'success' : 'error'} size="sm">
                  {produit.actif ? 'Actif' : 'Inactif'}
                </Badge>
              </div>

              <p className="text-gray-600 text-sm mb-3">{produit.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Origine:</span>
                  <span className="text-sm font-medium">{produit.origine}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Intensité:</span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`w-2 h-2 rounded-full ${level <= produit.intensite ? getIntensiteColor(produit.intensite) : 'bg-gray-200'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Stock:</span>
                  <Badge variant={getStockBadge(produit.stock).variant} size="sm">
                    {produit.stock > 0 ? `${produit.stock} unités` : getStockBadge(produit.stock).label}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-coffee-600">
                  {produit.prix !== undefined && produit.prix !== null ? produit.prix.toFixed(2) : '0.00'} €
                </span>
                <div className="flex space-x-2">
                  <button className="text-coffee-600 hover:text-coffee-900">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

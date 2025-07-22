import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_PRODUITS } from '../config';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Search, Filter, ShoppingCart, Coffee, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

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


export const Boutique: React.FC = () => {
  const { user, openLoginModal } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOrigine, setFilterOrigine] = useState<string>('tous');
  const [panier, setPanier] = useState<{ [key: string]: number }>({});

  const { data: produits, error, isLoading } = useQuery<Produit[], Error>({
    queryKey: ['produits'],
    queryFn: async () => {
      const res = await fetch(API_PRODUITS);
      if (!res.ok) throw new Error('Erreur');
      return res.json();
    },
  });

  const ajouterAuPanier = (produitId: string) => {
    if (!user) {
      openLoginModal();
      return;
    }
    
    setPanier(prev => ({
      ...prev,
      [produitId]: (prev[produitId] || 0) + 1
    }));
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Chargement de la boutique..." />;
  }

  if (error) {
    return <div className="text-red-600 p-4">Erreur : {error.message}</div>;
  }

  const origines = ['tous', ...Array.from(new Set(produits?.map(p => p.origine) ?? []))];

  const filteredProduits = (produits ?? []).filter((produit) => {
    const nom = produit.nom?.toLowerCase() ?? '';
    const description = produit.description?.toLowerCase() ?? '';
    const matchesSearch =
      nom.includes(searchTerm.toLowerCase()) || description.includes(searchTerm.toLowerCase());
    const matchesOrigine = filterOrigine === 'tous' || produit.origine === filterOrigine;
    return matchesSearch && matchesOrigine && produit.actif && produit.stock > 0;
  });

  const getIntensiteStars = (intensite: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < intensite ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Découvrez nos cafés d'exception
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Une sélection de cafés premium du monde entier, torréfiés avec passion pour vous offrir une expérience unique
        </p>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher un café..."
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

      {/* Grille des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProduits.map((produit) => (
          <Card key={produit.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img 
                src={produit.image} 
                alt={produit.nom} 
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="info" size="sm">
                  {produit.origine}
                </Badge>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{produit.nom}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{produit.description}</p>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  {getIntensiteStars(produit.intensite)}
                  <span className="text-sm text-gray-500 ml-1">({produit.intensite}/5)</span>
                </div>
                <Badge variant="success" size="sm">
                  {produit.stock} en stock
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-coffee-600">
                  {produit.prix?.toFixed(2) ?? '0.00'} €
                </span>
                
                <div className="flex items-center space-x-2">
                  {panier[produit.id] && (
                    <span className="text-sm bg-coffee-100 text-coffee-800 px-2 py-1 rounded">
                      {panier[produit.id]}
                    </span>
                  )}
                  <button
                    onClick={() => ajouterAuPanier(produit.id)}
                    className="flex items-center space-x-1 bg-coffee-600 text-white px-3 py-2 rounded-lg hover:bg-coffee-700 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="text-sm">Ajouter</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredProduits.length === 0 && (
        <div className="text-center py-12">
          <Coffee className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou de filtrage
          </p>
        </div>
      )}
    </div>
  );
};
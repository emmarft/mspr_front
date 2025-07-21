import React, { useState, useEffect } from 'react';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { LoadingSpinner } from '../components/UI/LoadingSpinner';
import { Eye, Package, Calendar, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Produit {
  produitId: string;
  produit: { nom: string };
  quantite: number;
  prixUnitaire: number;
}

interface Commande {
  id: string;
  clientId: string;
  produits: Produit[];
  statut: string;
  total: number;
  dateCommande: string;
  dateLivraison?: string;
  adresseLivraison: string;
}

export const MesCommandes: React.FC = () => {
  const { user } = useAuth();
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchMesCommandes = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const response = await fetch(`http://localhost:3003/api/commandes/client/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des commandes');
        }

        const data = await response.json();
        setCommandes(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMesCommandes();
  }, [user]);

  type BadgeVariant = "warning" | "info" | "success" | "error" | "default";

  const getStatusBadge = (statut: string): { variant: BadgeVariant; label: string } => {
    const statusMap: Record<string, { variant: BadgeVariant; label: string }> = {
      en_attente: { variant: "warning", label: "En attente" },
      confirmee: { variant: "info", label: "Confirmée" },
      en_preparation: { variant: "warning", label: "En préparation" },
      expediee: { variant: "info", label: "Expédiée" },
      livree: { variant: "success", label: "Livrée" },
      annulee: { variant: "error", label: "Annulée" },
    };
    return statusMap[statut] || { variant: "default", label: statut };
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Connexion requise</h3>
        <p className="text-gray-600">
          Vous devez être connecté pour voir vos commandes
        </p>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner size="lg" text="Chargement de vos commandes..." />;
  }

  if (error) {
    return <div className="text-red-600 p-4">Erreur : {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mes Commandes</h1>
        <p className="text-gray-600 mt-2">
          Suivez l'état de vos commandes et consultez votre historique
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Commandes</p>
              <p className="text-2xl font-bold text-gray-900">{commandes.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Package className="h-6 w-6 text-yellow-600" />
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
            <div className="p-2 bg-green-100 rounded-lg">
              <Package className="h-6 w-6 text-green-600" />
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
      {commandes.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande</h3>
            <p className="text-gray-600">
              Vous n'avez pas encore passé de commande. Découvrez nos cafés !
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {commandes.map((commande) => (
            <Card key={commande.id}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Commande #{commande.id}
                    </h3>
                    <Badge variant={getStatusBadge(commande.statut).variant}>
                      {getStatusBadge(commande.statut).label}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-coffee-600">
                      {commande.total.toFixed(2)} €
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Commandé le {new Date(commande.dateCommande).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {commande.dateLivraison && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Package className="h-4 w-4" />
                      <span>Livré le {new Date(commande.dateLivraison).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{commande.adresseLivraison}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Produits commandés :</h4>
                  <div className="space-y-2">
                    {commande.produits.map((produit, index) => (
                      <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">
                          {produit.produit?.nom} × {produit.quantite}
                        </span>
                        <span className="font-medium text-gray-900">
                          {(produit.prixUnitaire * produit.quantite).toFixed(2)} €
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button className="flex items-center space-x-2 text-coffee-600 hover:text-coffee-700 transition-colors">
                    <Eye className="h-4 w-4" />
                    <span>Voir les détails</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
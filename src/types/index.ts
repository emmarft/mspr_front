export interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  adresse: string;
  type: 'particulier' | 'professionnel';
  dateCreation: string;
  actif: boolean;
}

export interface Produit {
  id: string;
  nom: string;
  description: string;
  prix: number;
  stock: number;
  origine: string;
  intensite: number;
  image?: string;
  actif: boolean;
  dateCreation: string;
}

export interface Commande {
  id: string;
  clientId: string;
  client?: Client;
  produits: CommandeProduit[];
  statut: 'en_attente' | 'confirmee' | 'en_preparation' | 'expediee' | 'livree' | 'annulee';
  total: number;
  dateCommande: string;
  dateLivraison?: string;
  adresseLivraison: string;
}

export interface CommandeProduit {
  produitId: string;
  produit?: Produit;
  quantite: number;
  prixUnitaire: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  totalClients: number;
  totalProduits: number;
  totalCommandes: number;
  chiffreAffaires: number;
  commandesRecentes: Commande[];
}
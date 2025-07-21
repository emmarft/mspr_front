# PayeTonKawa - Frontend

Interface de gestion moderne pour la plateforme PayeTonKawa, spécialisée dans l'import et la vente de café.

## 🚀 Fonctionnalités

### Dashboard
- Vue d'ensemble avec statistiques en temps réel
- Monitoring des microservices (Clients, Produits, Commandes)
- Affichage des commandes récentes
- Indicateurs de performance

### Gestion des Clients
- Liste complète des clients (particuliers et professionnels)
- Recherche et filtrage avancés
- Création, modification et suppression
- Statistiques par type de client

### Gestion des Produits
- Catalogue complet des cafés
- Filtrage par origine et intensité
- Gestion des stocks et prix
- Interface visuelle avec images

### Gestion des Commandes
- Suivi complet des commandes
- Gestion des statuts (en attente, confirmée, expédiée, etc.)
- Calcul automatique des totaux
- Historique des livraisons

## 🛠️ Technologies

- **React 18** avec TypeScript
- **Tailwind CSS** pour le design
- **React Router** pour la navigation
- **React Query** pour la gestion des données
- **Axios** pour les appels API
- **Lucide React** pour les icônes

## 🏗️ Architecture

### Structure des services
```
src/
├── components/          # Composants réutilisables
│   ├── Layout/         # Layout principal et navigation
│   └── UI/             # Composants d'interface
├── pages/              # Pages principales
├── services/           # Services API pour chaque microservice
├── types/              # Types TypeScript
├── config/             # Configuration des APIs
└── utils/              # Utilitaires
```

### Microservices intégrés
- **Service Clients** (Port 8081) - Gestion des clients particuliers et professionnels
- **Service Produits** (Port 8082) - Catalogue et gestion des stocks
- **Service Commandes** (Port 8083) - Traitement et suivi des commandes

## 🚀 Installation et démarrage

1. **Installation des dépendances**
```bash
npm install
```

2. **Configuration**
Copiez `.env.example` vers `.env` et configurez les URLs de vos microservices :
```bash
cp .env.example .env
```

3. **Démarrage en développement**
```bash
npm run dev
```

4. **Build pour la production**
```bash
npm run build
```

## 🔧 Configuration

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|---------|
| `VITE_CLIENTS_API_URL` | URL du service clients | `http://localhost:8081` |
| `VITE_PRODUITS_API_URL` | URL du service produits | `http://localhost:8082` |
| `VITE_COMMANDES_API_URL` | URL du service commandes | `http://localhost:8083` |

### Authentification
L'application supporte l'authentification par token JWT. Le token est automatiquement ajouté aux en-têtes des requêtes API.

## 📊 Monitoring

L'interface inclut un monitoring en temps réel des microservices :
- Status de connexion de chaque service
- Indicateurs visuels de santé
- Alertes en cas de service indisponible

## 🎨 Design System

### Palette de couleurs
- **Coffee** : Thème principal inspiré du café
- **Primary** : Bleu pour les actions principales
- **Success/Warning/Error** : Codes couleur pour les statuts

### Composants
- Cards réutilisables avec en-têtes optionnels
- Badges pour les statuts et types
- Spinner de chargement thématique
- Layout responsive avec sidebar

## 🔄 Intégration API

### Structure des réponses
```typescript
interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

### Gestion des erreurs
- Intercepteurs Axios pour la gestion centralisée
- Redirection automatique en cas d'erreur d'authentification
- Messages d'erreur utilisateur-friendly

## 📱 Responsive Design

L'interface est entièrement responsive avec :
- Breakpoints adaptés mobile/tablette/desktop
- Navigation adaptative
- Grilles flexibles
- Composants optimisés pour tous les écrans

## 🚀 Déploiement

L'application peut être déployée sur :
- Netlify (configuration automatique)
- Vercel
- Serveur web statique

## 📄 Licence

Projet développé pour PayeTonKawa - Tous droits réservés.
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost',
  CLIENTS_SERVICE: {
    URL: import.meta.env.VITE_CLIENTS_API_URL || 'http://localhost:8081',
    ENDPOINTS: {
      LIST: '/api/clients',
      CREATE: '/api/clients',
      UPDATE: (id: string) => `/api/clients/${id}`,
      DELETE: (id: string) => `/api/clients/${id}`,
      GET: (id: string) => `/api/clients/${id}`,
    }
  },
  PRODUITS_SERVICE: {
    URL: import.meta.env.VITE_PRODUITS_API_URL || 'http://localhost:8082',
    ENDPOINTS: {
      LIST: '/api/produits',
      CREATE: '/api/produits',
      UPDATE: (id: string) => `/api/produits/${id}`,
      DELETE: (id: string) => `/api/produits/${id}`,
      GET: (id: string) => `/api/produits/${id}`,
    }
  },
  COMMANDES_SERVICE: {
    URL: import.meta.env.VITE_COMMANDES_API_URL || 'http://localhost:8083',
    ENDPOINTS: {
      LIST: '/api/commandes',
      CREATE: '/api/commandes',
      UPDATE: (id: string) => `/api/commandes/${id}`,
      DELETE: (id: string) => `/api/commandes/${id}`,
      GET: (id: string) => `/api/commandes/${id}`,
      STATS: '/api/commandes/stats',
    }
  },
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};
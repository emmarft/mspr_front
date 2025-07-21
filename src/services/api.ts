import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '../config/api';

class ApiService {
  private clients: AxiosInstance;
  private produits: AxiosInstance;
  private commandes: AxiosInstance;

  constructor() {
    this.clients = this.createInstance(API_CONFIG.CLIENTS_SERVICE.URL);
    this.produits = this.createInstance(API_CONFIG.PRODUITS_SERVICE.URL);
    this.commandes = this.createInstance(API_CONFIG.COMMANDES_SERVICE.URL);
  }

  private createInstance(baseURL: string): AxiosInstance {
    const instance = axios.create({
      baseURL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Intercepteur de requête
    instance.interceptors.request.use(
      (config) => {
        // Ajouter le token d'authentification si disponible
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Intercepteur de réponse
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Rediriger vers la page de connexion
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  // Méthodes pour le service clients
  get clientsApi() {
    return this.clients;
  }

  // Méthodes pour le service produits
  get produitsApi() {
    return this.produits;
  }

  // Méthodes pour le service commandes
  get commandesApi() {
    return this.commandes;
  }

  // Méthode générique pour les requêtes
  async request<T>(
    service: 'clients' | 'produits' | 'commandes',
    config: AxiosRequestConfig
  ): Promise<T> {
    try {
      const api = this[`${service}Api`];
      const response = await api.request<T>(config);
      return response.data;
    } catch (error) {
      console.error(`Erreur API ${service}:`, error);
      throw error;
    }
  }

  // Vérifier la santé des services
  async checkHealth() {
    const services = ['clients', 'produits', 'commandes'] as const;
    const healthStatus: Record<string, boolean> = {};

    for (const service of services) {
      try {
        await this[`${service}Api`].get('/health');
        healthStatus[service] = true;
      } catch {
        healthStatus[service] = false;
      }
    }

    return healthStatus;
  }
}

export const apiService = new ApiService();
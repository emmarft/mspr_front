import { apiService } from './api';
import { Commande, ApiResponse, PaginatedResponse, DashboardStats } from '../types';
import { API_CONFIG } from '../config/api';

export class CommandesService {
  async getCommandes(page = 1, limit = 10): Promise<PaginatedResponse<Commande>> {
    return apiService.request<PaginatedResponse<Commande>>('commandes', {
      method: 'GET',
      url: API_CONFIG.COMMANDES_SERVICE.ENDPOINTS.LIST,
      params: { page, limit },
    });
  }

  async getCommande(id: string): Promise<ApiResponse<Commande>> {
    return apiService.request<ApiResponse<Commande>>('commandes', {
      method: 'GET',
      url: API_CONFIG.COMMANDES_SERVICE.ENDPOINTS.GET(id),
    });
  }

  async createCommande(commande: Omit<Commande, 'id' | 'dateCommande'>): Promise<ApiResponse<Commande>> {
    return apiService.request<ApiResponse<Commande>>('commandes', {
      method: 'POST',
      url: API_CONFIG.COMMANDES_SERVICE.ENDPOINTS.CREATE,
      data: commande,
    });
  }

  async updateCommande(id: string, commande: Partial<Commande>): Promise<ApiResponse<Commande>> {
    return apiService.request<ApiResponse<Commande>>('commandes', {
      method: 'PUT',
      url: API_CONFIG.COMMANDES_SERVICE.ENDPOINTS.UPDATE(id),
      data: commande,
    });
  }

  async deleteCommande(id: string): Promise<ApiResponse<void>> {
    return apiService.request<ApiResponse<void>>('commandes', {
      method: 'DELETE',
      url: API_CONFIG.COMMANDES_SERVICE.ENDPOINTS.DELETE(id),
    });
  }

  async getCommandesParClient(clientId: string): Promise<PaginatedResponse<Commande>> {
    return apiService.request<PaginatedResponse<Commande>>('commandes', {
      method: 'GET',
      url: API_CONFIG.COMMANDES_SERVICE.ENDPOINTS.LIST,
      params: { clientId },
    });
  }

  async getCommandesParStatut(statut: string): Promise<PaginatedResponse<Commande>> {
    return apiService.request<PaginatedResponse<Commande>>('commandes', {
      method: 'GET',
      url: API_CONFIG.COMMANDES_SERVICE.ENDPOINTS.LIST,
      params: { statut },
    });
  }

  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    return apiService.request<ApiResponse<DashboardStats>>('commandes', {
      method: 'GET',
      url: API_CONFIG.COMMANDES_SERVICE.ENDPOINTS.STATS,
    });
  }
}

export const commandesService = new CommandesService();
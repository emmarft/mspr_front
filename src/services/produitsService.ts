import { apiService } from './api';
import { Produit, ApiResponse, PaginatedResponse } from '../types';
import { API_CONFIG } from '../config/api';

export class ProduitsService {
  async getProduits(page = 1, limit = 10): Promise<PaginatedResponse<Produit>> {
    return apiService.request<PaginatedResponse<Produit>>('produits', {
      method: 'GET',
      url: API_CONFIG.PRODUITS_SERVICE.ENDPOINTS.LIST,
      params: { page, limit },
    });
  }

  async getProduit(id: string): Promise<ApiResponse<Produit>> {
    return apiService.request<ApiResponse<Produit>>('produits', {
      method: 'GET',
      url: API_CONFIG.PRODUITS_SERVICE.ENDPOINTS.GET(id),
    });
  }

  async createProduit(produit: Omit<Produit, 'id' | 'dateCreation'>): Promise<ApiResponse<Produit>> {
    return apiService.request<ApiResponse<Produit>>('produits', {
      method: 'POST',
      url: API_CONFIG.PRODUITS_SERVICE.ENDPOINTS.CREATE,
      data: produit,
    });
  }

  async updateProduit(id: string, produit: Partial<Produit>): Promise<ApiResponse<Produit>> {
    return apiService.request<ApiResponse<Produit>>('produits', {
      method: 'PUT',
      url: API_CONFIG.PRODUITS_SERVICE.ENDPOINTS.UPDATE(id),
      data: produit,
    });
  }

  async deleteProduit(id: string): Promise<ApiResponse<void>> {
    return apiService.request<ApiResponse<void>>('produits', {
      method: 'DELETE',
      url: API_CONFIG.PRODUITS_SERVICE.ENDPOINTS.DELETE(id),
    });
  }

  async searchProduits(query: string): Promise<PaginatedResponse<Produit>> {
    return apiService.request<PaginatedResponse<Produit>>('produits', {
      method: 'GET',
      url: API_CONFIG.PRODUITS_SERVICE.ENDPOINTS.LIST,
      params: { search: query },
    });
  }

  async getProduitsParOrigine(origine: string): Promise<PaginatedResponse<Produit>> {
    return apiService.request<PaginatedResponse<Produit>>('produits', {
      method: 'GET',
      url: API_CONFIG.PRODUITS_SERVICE.ENDPOINTS.LIST,
      params: { origine },
    });
  }
}

export const produitsService = new ProduitsService();
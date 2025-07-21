import { apiService } from './api';
import { Client, ApiResponse, PaginatedResponse } from '../types';
import { API_CONFIG } from '../config/api';

export class ClientsService {
  async getClients(page = 1, limit = 10): Promise<PaginatedResponse<Client>> {
    return apiService.request<PaginatedResponse<Client>>('clients', {
      method: 'GET',
      url: API_CONFIG.CLIENTS_SERVICE.ENDPOINTS.LIST,
      params: { page, limit },
    });
  }

  async getClient(id: string): Promise<ApiResponse<Client>> {
    return apiService.request<ApiResponse<Client>>('clients', {
      method: 'GET',
      url: API_CONFIG.CLIENTS_SERVICE.ENDPOINTS.GET(id),
    });
  }

  async createClient(client: Omit<Client, 'id' | 'dateCreation'>): Promise<ApiResponse<Client>> {
    return apiService.request<ApiResponse<Client>>('clients', {
      method: 'POST',
      url: API_CONFIG.CLIENTS_SERVICE.ENDPOINTS.CREATE,
      data: client,
    });
  }

  async updateClient(id: string, client: Partial<Client>): Promise<ApiResponse<Client>> {
    return apiService.request<ApiResponse<Client>>('clients', {
      method: 'PUT',
      url: API_CONFIG.CLIENTS_SERVICE.ENDPOINTS.UPDATE(id),
      data: client,
    });
  }

  async deleteClient(id: string): Promise<ApiResponse<void>> {
    return apiService.request<ApiResponse<void>>('clients', {
      method: 'DELETE',
      url: API_CONFIG.CLIENTS_SERVICE.ENDPOINTS.DELETE(id),
    });
  }

  async searchClients(query: string): Promise<PaginatedResponse<Client>> {
    return apiService.request<PaginatedResponse<Client>>('clients', {
      method: 'GET',
      url: API_CONFIG.CLIENTS_SERVICE.ENDPOINTS.LIST,
      params: { search: query },
    });
  }
}

export const clientsService = new ClientsService();
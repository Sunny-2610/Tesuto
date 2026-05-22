import axios, { AxiosRequestConfig } from 'axios';
import { TokenStorage } from '../storage/tokenStorage';

export class ApiService {
  async sendRequest(request: any): Promise<any> {
    const startTime = Date.now();
    try {
      // Inject active token if available
      const activeToken = TokenStorage.getActiveToken();
      const headers = { ...(request.headers || {}) };
      if (activeToken && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${activeToken}`;
      }

      const config: AxiosRequestConfig = {
        method: request.method,
        url: request.url,
        headers,
        data: request.body,
        timeout: 30000
      };
      const response = await axios(config);
      const duration = Date.now() - startTime;
      return {
        success: true,
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        duration,
        size: JSON.stringify(response.data).length
      };
    } catch (error: any) {
      const duration = Date.now() - startTime;
      return {
        success: false,
        status: error.response?.status || 0,
        statusText: error.message,
        data: error.response?.data || null,
        duration,
        size: 0,
        error: error.message
      };
    }
  }
}
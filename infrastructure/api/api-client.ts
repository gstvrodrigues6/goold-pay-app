import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiClient {
  private baseURL: string
  private token: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.loadToken();
  }

  private async loadToken() {
    try {
      const accessToken = await AsyncStorage.getItem("accessToken");
      this.token = accessToken;
    } catch (error) {
      console.error("Failed to load access token from storage", error);
    }
  }

  async setToken(token: string) {
    this.token = token;
    try {
      await AsyncStorage.setItem("accessToken", token);
    } catch (error) {
      console.error("Failed to save access token to storage", error);
    }
  }

  async removeToken() {
    this.token = null;
    try {
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
    } catch (error) {
      console.error("Failed to remove tokens from storage", error);
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const requestHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers as Record<string, string>,
    }

    if (!this.token) {
      await this.loadToken();
    }

    if (this.token) {
      requestHeaders.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: requestHeaders,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export const apiClient = new ApiClient("http://localhost:8084")

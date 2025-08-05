import { User } from "@/domain/entities/user";
import type { AuthRepository } from "@/domain/repositories/auth-repository";
import { ApiResponse, AuthTokens, LoginCredentials, RegisterData } from "@/shared/types/auth";
import { apiClient } from "../api/api-client";

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    // Simulando uma resposta de API real
    const response = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>("/auth/login", credentials)

    // Para demonstração, vamos simular uma resposta
    const mockResponse = {
      user: {
        id: "1",
        name: "John Doe",
        email: credentials.email,
        createdAt: new Date(),
      },
      tokens: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      },
    }

    apiClient.setToken(mockResponse.tokens.accessToken)
    return mockResponse
  }

  async register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>("/auth/register", data)

    // Mock response
    const mockResponse = {
      user: {
        id: "1",
        name: data.name,
        email: data.email,
        createdAt: new Date(),
      },
      tokens: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      },
    }

    apiClient.setToken(mockResponse.tokens.accessToken)
    return mockResponse
  }

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout")
    apiClient.removeToken()
  }

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>("/auth/me")

    // Mock response
    return {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      createdAt: new Date(),
    }
  }

  async refreshToken(): Promise<AuthTokens> {
    const refreshToken = typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null
    const response = await apiClient.post<ApiResponse<AuthTokens>>("/auth/refresh", { refreshToken })

    // Mock response
    const mockTokens = {
      accessToken: "new-mock-access-token",
      refreshToken: "new-mock-refresh-token",
    }

    apiClient.setToken(mockTokens.accessToken)
    return mockTokens
  }
}
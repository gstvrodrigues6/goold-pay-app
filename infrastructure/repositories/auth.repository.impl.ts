import { Account } from "@/domain/entities/account.entity";
import type { AuthRepository } from "@/domain/repositories/auth.repository";
import { AuthTokens, LoginCredentials } from "@/shared/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../http/axios.config";

export class AuthRepositoryImpl implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<{ account: Account; tokens: AuthTokens }> {
    await api.post("/auth/login", credentials);

    const mockResponse = {
      account: {
        id: "1",
        profilePic: 'https://unsplash.com/pt-br/fotografias/closeup-photography-of-woman-smiling-mEZ3PoFGs_k',
        fullName: "John Doe",
        cpf: '805.494.230-36',
        email: 'jhondoe@mail.com',
        whatsapp: '9999999999',
        password: '111111',
        location: 'sao paulo - sp',
        birthDate: '10/10/2000',
        managerCode: 'asdasd',
        instagram: 'jhondoem',
      },
      tokens: {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      },
    }

    await AsyncStorage.setItem("accessToken", mockResponse.tokens.accessToken);
    await AsyncStorage.setItem("refreshToken", mockResponse.tokens.refreshToken);

    return mockResponse
  }

  async logout(): Promise<void> {
    await api.post("/auth/logout")
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
  }

  async refreshToken(): Promise<AuthTokens> {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    await api.post("/auth/refresh", { refreshToken });

    const mockTokens = {
      accessToken: "new-mock-access-token",
      refreshToken: "new-mock-refresh-token",
    }

    return mockTokens
  }
}
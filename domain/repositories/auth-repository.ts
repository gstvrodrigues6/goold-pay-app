import { AuthTokens, LoginCredentials, RegisterData } from "@/shared/types/auth";
import { User } from "../entities/user";

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }>
  register(data: RegisterData): Promise<{ user: User; tokens: AuthTokens }>
  logout(): Promise<void>
  getCurrentUser(): Promise<User>
  refreshToken(): Promise<AuthTokens>
}
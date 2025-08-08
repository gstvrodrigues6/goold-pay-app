import { AuthTokens, LoginCredentials } from "@/shared/types/auth";
import { User } from "../entities/user.entity";

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }>
  logout(): Promise<void>
  refreshToken(): Promise<AuthTokens>
}

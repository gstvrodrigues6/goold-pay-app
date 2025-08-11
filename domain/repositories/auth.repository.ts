import { AuthTokens, LoginCredentials } from "@/shared/types/auth";
import { Account } from "../entities/account.entity";

export interface AuthRepository {
  login(credentials: LoginCredentials): Promise<{ account: Account; tokens: AuthTokens }>
  logout(): Promise<void>
  refreshToken(): Promise<AuthTokens>
}

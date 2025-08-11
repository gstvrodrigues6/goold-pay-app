import { AuthTokens, LoginCredentials } from "@/shared/types/auth";
import { Account } from "../entities/account.entity";
import { AuthRepository } from "../repositories/auth.repository";

export class AuthUseCases {
  constructor(private authRepository: AuthRepository) {}

  async login(credentials: LoginCredentials): Promise<{ account: Account; tokens: AuthTokens }> {
    return await this.authRepository.login(credentials)
  }

  async logout() {
    return await this.authRepository.logout()
  }

  async refreshToken() {
    return await this.authRepository.refreshToken()
  }
}

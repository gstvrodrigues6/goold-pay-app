import { AuthTokens, LoginCredentials, User } from "@/shared/types/auth";
import { AuthRepository } from "../repositories/auth.repository";

export class AuthUseCases {
  constructor(private authRepository: AuthRepository) {}

  async login(credentials: LoginCredentials): Promise<{ user: User; tokens: AuthTokens }> {
    return await this.authRepository.login(credentials)
  }

  async logout() {
    return await this.authRepository.logout()
  }
}
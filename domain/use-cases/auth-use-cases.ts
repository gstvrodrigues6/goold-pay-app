import { LoginCredentials, RegisterData } from "@/shared/types/auth"
import { AuthRepository } from "../repositories/auth-repository"

export class AuthUseCases {
  constructor(private authRepository: AuthRepository) {}

  async login(credentials: LoginCredentials) {
    return await this.authRepository.login(credentials)
  }

  async register(data: RegisterData) {
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match")
    }
    return await this.authRepository.register(data)
  }

  async logout() {
    return await this.authRepository.logout()
  }

  async getCurrentUser() {
    return await this.authRepository.getCurrentUser()
  }
}
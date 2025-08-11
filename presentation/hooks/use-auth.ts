import { AuthUseCases } from "@/domain/use-cases/auth.usecase"
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth.repository.impl"
import { useState } from "react"
import { useAuthStore } from "../stores/auth-store"

const authRepository = new AuthRepositoryImpl()
const authUseCases = new AuthUseCases(authRepository)

export function useAuth() {
  const { myAccount, tokens, setMyAccount, setTokens, clearAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (cpf: string, password: string, code: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authUseCases.login({ cpf, password, code })
      setMyAccount(result.account)
      setTokens(result.tokens)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao fazer login"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false) 
    }
  }

  const logout = async () => {
    setIsLoading(true)
    
    try {
      await authUseCases.logout()
      clearAuth()
    } catch (err) {
      console.error("Erro ao fazer logout:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    myAccount,
    tokens,
    isLoading,
    error,
    login,
    logout,
    isAuthenticated: !!tokens?.accessToken,
  }
}

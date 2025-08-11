"use client"

import { User } from "@/domain/entities/user.entity"
import { AuthUseCases } from "@/domain/use-cases/auth.usecase"
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth.repository.impl"
import { useState } from "react"

const authRepository = new AuthRepositoryImpl()
const authUseCases = new AuthUseCases(authRepository)

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false) // ← LOADING AQUI
  const [error, setError] = useState<string | null>(null)

  const login = async (email: string, password: string) => {
    setIsLoading(true) // ← Inicia loading
    setError(null)

    try {
      const result = await authUseCases.login({ email, password })
      setUser(result.user)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao fazer login"
      setError(errorMessage)
      throw err // Re-throw para o componente tratar se necessário
    } finally {
      setIsLoading(false) // ← Finaliza loading SEMPRE
    }
  }

  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await authUseCases.register({ name, email, password, confirmPassword })
      setUser(result.user)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro ao criar conta"
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
      setUser(null)
    } catch (err) {
      console.error("Erro ao fazer logout:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    user,
    isLoading, // ← Expõe o loading
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  }
}

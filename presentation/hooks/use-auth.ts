import { AuthUseCases } from "@/domain/use-cases/auth.usecase"
import { AuthRepositoryImpl } from "@/infrastructure/repositories/auth.repository.impl"
import { router } from "expo-router"
import { useState } from "react"
import Toast from "react-native-toast-message"
import { useAuthStore } from "../stores/auth-store"

const authRepository = new AuthRepositoryImpl()
const authUseCases = new AuthUseCases(authRepository)

export function useAuth() {
  const { myAccount, tokens, setMyAccount, setTokens, clearAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const login = async (cpf: string, password: string, code: string) => {
    setIsLoading(true)

    try {
      const result = await authUseCases.login({ cpf, password, code })
      if (result && result.tokens) {
        setMyAccount(result.account)
        setTokens(result.tokens)
        router.replace('/(protected)');
      } else {
        Toast.show({
					type: 'erroToast',
					text1: 'Credenciais inválidas!',
					visibilityTime: 3000,
				});
      }
    } catch (error) {
      Toast.show({
        type: 'erroToast',
        text1: 'Credenciais inválidas!',
        visibilityTime: 3000,
      });
      console.error('Login error:', error);
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
    login,
    logout,
    isAuthenticated: !!tokens?.accessToken,
  }
}

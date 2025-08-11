import { Account } from '@/domain/entities/account.entity';
import { AuthTokens } from '@/shared/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  myAccount: Account | null;
  tokens: AuthTokens | null;
  setMyAccount: (account: Account | null) => void;
  setTokens: (tokens: AuthTokens | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      myAccount: null,
      tokens: null,
      setMyAccount: (account) => set({ myAccount: account }),
      setTokens: (tokens) => set({ tokens }),
      clearAuth: () => set({ myAccount: null, tokens: null }),
    }),
    {
      name: 'authStorage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        myAccount: state.myAccount,
        tokens: state.tokens,
      }),
    }
  )
);

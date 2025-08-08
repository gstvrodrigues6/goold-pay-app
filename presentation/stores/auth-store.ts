import { User } from '@/domain/entities/user.entity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  myAccount: User | null;
  token: string | null;
  setMyAccount: (account: User | null) => void;
  setToken: (token: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      myAccount: null,
      token: null,
      setMyAccount: (account) =>
        set(() => ({
          myAccount: account,
        })),
      setToken: (tokenValue) =>
        set(() => ({
          token: tokenValue,
        })),
      clearAuth: () =>
        set(() => ({
          myAccount: null,
          token: null,
        })),
    }),
    {
      name: 'authStorage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        token: state.token,
        myAccount: state.myAccount,
      }),
    }
  )
);

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AccountState = {
  profilePic: string | null;
  fullName: string;
  cpf: string;
  email: string;
  whatsapp: string;
  password: string;
  location: string;
  birthDate: string;
  managerCode: string;
  instagram: string;
};

const initialFormData: AccountState = {
  profilePic: null,
  fullName: '',
  cpf: '',
  email: '',
  whatsapp: '',
  password: ['', '', '', ''],
  location: '',
  birthDate: '',
  managerCode: '',
  instagram: '',
};

interface CreateAccountStore {
  formData: AccountState
  setFormData: (update: Partial<AccountState>) => void
  resetFormData: () => void
}

export const useCreateAccountStore = create<CreateAccountStore>()(
  persist(
    (set) => ({
      formData: initialFormData,      
      setFormData: (update) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...update,
          },
        })),
      resetFormData: () => set({ formData: initialFormData }),
    }),
    {
      name: 'createAccountStorage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

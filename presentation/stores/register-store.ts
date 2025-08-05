import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const initialFormData: any = {
  email: '',
  password: '',

  full_name: '',
  avatar: '',
  banner: '',
  bio: '',
  specialization: '',
  registration_number: '',
  location: '',
};

interface RegistrationStore {
  formData: any
  setFormData: (update: Partial<any>) => void
  resetFormData: () => void
}

export const useRegistrationStore = create<RegistrationStore>()(
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
      name: 'registrationStorage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

import { LongArrowLeftIcon } from '@/presentation/assets/svg/long-arrow-left-icon';
import { SafeIcon } from '@/presentation/assets/svg/safe-icon';
import CreateAccountStep1 from '@/presentation/components/pages/create-account/create-account-step-1';
import CreateAccountStep2 from '@/presentation/components/pages/create-account/create-account-step-2';
import CreateAccountStep3 from '@/presentation/components/pages/create-account/create-account-step-3';
import VerifyAccountStep1 from '@/presentation/components/pages/create-account/verify-account-step-1';
import VerifyAccountStep2 from '@/presentation/components/pages/create-account/verify-account-step-2';
import VerifyAccountStep3 from '@/presentation/components/pages/create-account/verify-account-step-3';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function CreateAccountScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-5 pt-8 border-b border-border flex-row justify-between">
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => {
              if (step === 1) {
                router.back();
              } else {
                setStep(prevStep => prevStep - 1);
              }
            }}
          >
            <LongArrowLeftIcon />
          </TouchableOpacity>
          {step < 3 && <Text className="font-medium text-xl">Criar conta</Text>}
          {step > 3 && <Text className="font-medium text-xl">Verificação</Text>}
        </View>
        
        <View className="flex-row items-center gap-1">
          <SafeIcon/>
          <Text className="text-base">Ambiente 100% seguro!</Text>
        </View>
      </View>

      {step === 1 && <CreateAccountStep1 step={step} incrementStep={() => setStep(2)}/> }
      {step === 2 && <CreateAccountStep2 step={step} incrementStep={() => setStep(3)}/> }
      {step === 3 && <CreateAccountStep3 step={step} incrementStep={() => setStep(4)}/>}
      {step === 4 && <VerifyAccountStep1 incrementStep={() => setStep(5)}/>}
      {step === 5 && <VerifyAccountStep2 incrementStep={() => setStep(6)}/>}
      {step === 6 && <VerifyAccountStep3 incrementStep={() => setStep(7)}/>}
    </SafeAreaView>
  );
}

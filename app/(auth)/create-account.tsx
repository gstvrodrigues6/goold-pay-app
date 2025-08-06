import { LongArrowLeftIcon } from '@/presentation/assets/svg/long-arrow-left-icon';
import { SafeIcon } from '@/presentation/assets/svg/safe-icon';
import { Button } from '@/presentation/components/ui/button';
import { ProgressIndicator } from '@/presentation/components/ui/progress-indicator';
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
          <Text className="font-medium text-xl">Criar conta</Text>
        </View>
        
        <View className="flex-row items-center gap-1">
          <SafeIcon/>
          <Text className="text-base">Ambiente 100% seguro!</Text>
        </View>
      </View>
      <View className="flex-1">
        
      </View>
    </SafeAreaView>
  );
}

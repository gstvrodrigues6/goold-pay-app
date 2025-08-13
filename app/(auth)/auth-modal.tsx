import { CloseIcon } from "@/presentation/assets/svg/close-icon";
import { LongArrowLeftIcon } from "@/presentation/assets/svg/long-arrow-left-icon";
import { SafeIcon } from "@/presentation/assets/svg/safe-icon";
import { AuthLogin } from "@/presentation/components/pages/auth/auth-login";
import { ConfirmCode } from "@/presentation/components/pages/auth/confirm-code";
import { NewPassword } from "@/presentation/components/pages/auth/new-password";
import { RequestCode } from "@/presentation/components/pages/auth/request-code";
import { ModalRouter } from "@/presentation/components/ui/modal-router";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function AuthModalScreen() {
  const navigation = useNavigation();
  
  const [step, setStep] = useState(1);

  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <ModalRouter>
      {step === 1 &&
        <View className="p-5 border-b border-border flex-row justify-between">
          <View className="flex-row items-center gap-3">
             <TouchableOpacity onPress={closeModal}>
              <LongArrowLeftIcon/>
            </TouchableOpacity>
            <Text className="font-medium text-xl">Acessar conta</Text>
          </View>

          <View className="flex-row items-center gap-1">
            <SafeIcon/>
            <Text className="text-base">Ambiente 100% seguro!</Text>
          </View>
        </View>
      }
      {step > 1 && 
        <TouchableOpacity onPress={() => { closeModal(); setStep(1) }} className="absolute right-3 top-3 z-10">
          <CloseIcon width={12} />
        </TouchableOpacity>
      }

      <View>
        {step === 1 && <AuthLogin incrementStep={() => setStep(2)}/>}
        {step === 2 && <RequestCode incrementStep={() => setStep(3)}/>}
        {step === 3 && <ConfirmCode incrementStep={() => setStep(4)}/>}
        {step === 4 && <NewPassword incrementStep={closeModal}/>}
      </View>
    </ModalRouter>
  )
}

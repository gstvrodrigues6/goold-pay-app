import { CloseIcon } from "@/presentation/assets/svg/CloseIcon";
import { ConfirmCode } from "@/presentation/components/pages/auth/confirm-code";
import { NewPassword } from "@/presentation/components/pages/auth/new-password";
import { RequestCode } from "@/presentation/components/pages/auth/request-code";
import { ModalRouter } from "@/presentation/components/ui/modal-router";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function RecoveryModalScreen() {
  const navigation = useNavigation();
  
  const [step, setStep] = useState(1);

  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <ModalRouter>
      <TouchableOpacity onPress={() => { closeModal(); setStep(1) }} className="absolute right-3 top-3 z-10">
        <CloseIcon width={12} />
      </TouchableOpacity>
      <View>
        {step === 1 && <RequestCode incrementStep={() => setStep(2)}/>}
        {step === 2 && <ConfirmCode incrementStep={() => setStep(3)}/>}
        {step === 3 && <NewPassword incrementStep={closeModal}/>}
      </View>
    </ModalRouter>
  )
}

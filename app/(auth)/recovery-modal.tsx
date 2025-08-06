import { CloseIcon } from "@/presentation/assets/svg/CloseIcon";
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
      <View className="p-6">
        
      </View>
    </ModalRouter>
  )
}

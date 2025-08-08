import { Padlock2Icon } from "@/presentation/assets/svg/padlock-2-icon"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { Text, TextInput, View } from "react-native"
import { Button } from "../../ui/button"
import { CpfInput } from "../../ui/cpf-input"

interface FormData {
  cpf: string;
}

export function RequestCode({ incrementStep }: { incrementStep: () => void }) {
  const {
    control,
    formState: { errors },
  } = useForm<FormData>();
  
  const cpfRef = useRef<TextInput>(null);
  
  return (
    <View className="p-6">
      <View className="items-center">
        <Padlock2Icon />
      </View>

      <View className="gap-3 pb-5">
        <Text className="font-semibold text-xl text-center ">Recuperar senha...</Text>
        <Text className="text-sm font-medium text-center ">
          Insira seu CPF para receber o código de recuperação de senha diretamente no seu e-mail ❤️
        </Text>
      </View>
      <CpfInput
        ref={cpfRef}
        control={control}
        label="CPF"
        label2="(Obrigatorio)"
        name="cpf"
        placeholder="Insira seu CPF"
        error={errors.cpf}
        showSvg={true}
        onSubmitEditing={() => cpfRef.current?.blur()}
      />
     
      <View className="gap-8">
        <Button onPress={incrementStep}>
          Recuperar senha
        </Button>

        <View>
          <Text className="font-medium text-base text-center">Não tem mais acesso ao e-mail?</Text>
          <Text className="font-bold underline text-base text-center">Clique aqui para falar com nosso suporte</Text>
        </View>
      </View>
    </View>
  )
}

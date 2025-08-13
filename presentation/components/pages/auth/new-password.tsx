import { PadlockIcon } from "@/presentation/assets/svg/padlock-icon"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { Text, TextInput, View } from "react-native"
import { Button } from "../../ui/button"
import { PinInput } from "../../ui/pin-input"

interface FormData {
	password: string;
  confirm: string;
}
export function NewPassword({ incrementStep }: { incrementStep: () => void }) {
  const {
    formState: { errors },
    control,
  } = useForm<FormData>();
  
  const passwordRef = useRef<TextInput>(null);
  const confirmRef = useRef<TextInput>(null);
  
  return (
    <View className="">
      <View className="relative h-[calc(100%-117px)] flex flex-col gap-3 items-center overflow-y-auto p-6 pt-10">
        <View className="items-center">
          <PadlockIcon />
        </View>

        <View className="gap-3">
          <Text className="font-semibold text-xl text-center ">Crie sua nova senha de acesso...</Text>
          <Text className="text-sm font-medium text-center px-8">
            Preencha abaixo a nova senha que deseja cadastrar para a sua conta Goold
          </Text>
        </View>

        <PinInput
          ref={passwordRef}
          label="Senha de acesso"
          label2="(Obrigatorio)"
          control={control}
          name="password"
          error={errors.password}
          rules={{
            required: 'Campo obrigatório',
            validate: (value) => {
              if (!value || value.length < 6) {
                return 'Senha deve ter 6 dígitos';
              }
              return true;
            },
          }}
          onSubmitEditing={() => confirmRef.current?.focus()}
        />

        <PinInput
          ref={confirmRef}
          label="Confirme sua nova senha"
          label2="(Obrigatorio)"
          control={control}
          name="confirm"
          error={errors.confirm}
          rules={{
            required: 'Campo obrigatório',
            validate: (value, formValues) => 
              value === formValues.password || 'Senhas não coincidem'
          }}
        />
      </View>

      <View className="gap-3 px-6 py-4 border-t border-border">
        <Button onPress={incrementStep}>
          Confirmar nova senha
        </Button>
      </View>
    </View>
  )
}

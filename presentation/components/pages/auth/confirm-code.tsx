import { MailPictureIcon } from "@/presentation/assets/svg/mail-picture-icon"
import React, { useRef } from "react"
import { useForm } from "react-hook-form"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { Button } from "../../ui/button"
import { PinInput } from "../../ui/pin-input"

interface FormData {
	password: string;
}
export function ConfirmCode({ incrementStep }: { incrementStep: () => void }) {
  const {
    formState: { errors },
    control,
  } = useForm<FormData>();
  
  const passwordRef = useRef<TextInput>(null);
  
  return (
    <View className="">
      <View className="relative h-[calc(100%-117px)] flex flex-col gap-3 items-center overflow-y-auto p-6 pt-10">
        <View className="items-center">
          <MailPictureIcon />
        </View>

        <View className="gap-3">
          <Text className="font-semibold text-xl text-center ">Código de recuperação — enviado por e-mail...</Text>
          <Text className="text-sm font-medium text-center px-8">
            Insira abaixo o código de verificação enviado para o seu e-mail <Text className="font-bold">test@maail.com</Text>
          </Text>
        </View>

        <PinInput
          ref={passwordRef}
          eyeBtn={false}
          numInputs={5}
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
        />

        <Text className="text-sm font-medium text-center">
					<Text className="font-bold">Dica: </Text>
          Caso não encontre o e-mail na sua caixa de entrada, verifique a pasta de spam
				</Text>
      </View>

      <View className="gap-3 px-6 py-4 border-t border-border">
        <Button onPress={incrementStep}>
          Confirmar código
        </Button>

        <TouchableOpacity>
          <Text className="font-bold underline text-base text-center">Reenviar código</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

import { LongArrowLeftIcon } from "@/presentation/assets/svg/LongArrowLeftIcon";
import { SafeIcon } from "@/presentation/assets/svg/SafeIcon";
import { CpfInput } from "@/presentation/components/ui/cpf-input";
import { InputField } from "@/presentation/components/ui/input-field";
import { ModalRouter } from "@/presentation/components/ui/modal-router";
import { PinInput } from "@/presentation/components/ui/pin-input";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface FormData {
	doc: string;
	password: string;
	code: string;
}

export default function AuthModalScreen() {
  const {
		formState: { errors },
		control,
	} = useForm<FormData>();

  const docRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);

  return (
    <ModalRouter>
      <View className="p-5 border-b border-border flex-row justify-between">
        <View className="flex-row items-center gap-3">
          <LongArrowLeftIcon/>
          <Text className="font-medium text-xl">Acessar conta</Text>
        </View>

        <View className="flex-row items-center gap-1">
          <SafeIcon/>
          <Text className="text-base">Ambiente 100% seguro!</Text>
        </View>
      </View>
      <View className="p-6">
        <CpfInput
          ref={docRef}
          label="CPF"
					label2="(Obrigatorio)"
          placeholder="Insira seu CPF"
          showSvg={true}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
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
        />
        <InputField
          ref={codeRef}
          control={control}
          rules={{
            required: 'Campo obrigatório',
          }}
          name="code"
          label="Código 2FA"
          label2="(Obrigatorio)"
          placeholder="Insira o código de segurança"
          error={errors?.code}
          returnKeyType="next"
          onSubmitEditing={() => codeRef.current?.blur()}
        />
      </View>
    </ModalRouter>
  )
}

import { useAuth } from "@/presentation/hooks/use-auth"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { Text, TextInput, View } from "react-native"
import { Button } from "../../ui/button"
import { CpfInput } from "../../ui/cpf-input"
import { InputField } from "../../ui/input-field"
import { PinInput } from "../../ui/pin-input"

interface FormData {
	cpf: string;
	password: string;
	code: string;
}

export function AuthLogin({ incrementStep }: { incrementStep: () => void }) {
  const { login, isLoading } = useAuth()
  
  const cpfRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    await login(data.cpf, data.password, data.code)
  }

  return (
    <View className="p-6">
      <CpfInput
        ref={cpfRef}
        control={control}
        label="CPF"
        label2="(Obrigatorio)"
        rules={{
          required: 'Campo obrigatório',
        }}
        name="cpf"
        placeholder="Insira seu CPF"
        error={errors.cpf}
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
        onSubmitEditing={() => codeRef.current?.focus()}
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

      <View className="gap-3 pt-5">
        <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
          Acessar conta
        </Button>

        <Button
          onPress={incrementStep}
          className='text-center px-5 py-2'
        >
          <Text className='font-bold text-base text-center text-black underline'>
            Esqueceu a senha? Clique aqui
          </Text>
        </Button>
      </View>
    </View>
  )
}

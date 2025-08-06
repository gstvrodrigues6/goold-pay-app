import { LongArrowLeftIcon } from "@/presentation/assets/svg/LongArrowLeftIcon"
import { SafeIcon } from "@/presentation/assets/svg/SafeIcon"
import { Link } from "expo-router"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { Text, TextInput, View } from "react-native"
import { CpfInput } from "../../ui/cpf-input"
import { InputField } from "../../ui/input-field"
import { ModalBottom } from "../../ui/modal-bottom"
import { PinInput } from "../../ui/pin-input"
import { Button } from "../../ui/button"

interface FormData {
	doc: string;
	password: string;
	code: string;
}

interface AuthLoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthLoginModal({
  isOpen,
  onClose,
}: AuthLoginModalProps) {
  const {
    formState: { errors },
    control,
  } = useForm<FormData>();
  
  const docRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const codeRef = useRef<TextInput>(null);
  
  return (
    <ModalBottom isOpen={isOpen} onClose={onClose}>
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

        <View className="gap-3">
          <Button>
            Acessar conta
          </Button>

          <Link
            href='/(auth)/recovery-modal'
            onPress={onClose}
            className='text-center px-5 py-2'
          >
            <Text className='font-bold text-base underline'>
              Esqueceu a senha? Clique aqui
            </Text>
          </Link>
        </View>
      </View>
    </ModalBottom>
  )
}

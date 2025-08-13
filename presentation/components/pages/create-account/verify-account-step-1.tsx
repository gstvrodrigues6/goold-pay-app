import { MailPictureIcon } from '@/presentation/assets/svg/mail-picture-icon';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../ui/button';
import { PinInput } from '../../ui/pin-input';

interface FormData {
	password: string;
}

export default function VerifyAccountStep1({ incrementStep }: { incrementStep: () => void }) {
  const {
    formState: { errors },
    control,
  } = useForm<FormData>();
  
  const passwordRef = useRef<TextInput>(null);

  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='p-6'>
          <View className="items-center">
            <MailPictureIcon />
          </View>

          <View className="gap-3 py-4">
            <Text className="font-semibold text-xl text-center ">Verificação de e-mail enviado</Text>
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
            onSubmitEditing={() => passwordRef.current?.blur()}
          />

          <Text className="text-sm font-medium text-center">
            <Text className="font-bold">Dica: </Text>
            Caso não encontre o e-mail na sua caixa de entrada, verifique a pasta de spam
          </Text>
        </View>
      </ScrollView>

      <View className="gap-3 px-6 py-4 pb-8 z-10 bg-white border-t border-border">
        <Button onPress={incrementStep}>
          Confirmar código
        </Button>

        <TouchableOpacity>
          <Text className="font-bold underline text-base text-center">Reenviar código</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

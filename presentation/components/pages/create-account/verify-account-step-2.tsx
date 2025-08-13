import { WhatsappPictureIcon } from '@/presentation/assets/svg/whatsapp-picture-icon';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../ui/button';
import { PinInput } from '../../ui/pin-input';

interface FormData {
	password: string;
}

export default function VerifyAccountStep2({ incrementStep }: { incrementStep: () => void }) {
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
            <WhatsappPictureIcon />
          </View>

          <View className="gap-3 py-4">
            <Text className="font-semibold text-xl text-center ">Verificação de WhatsApp enviado</Text>
            <Text className="text-sm font-medium text-center px-8">
              Insira abaixo o código de verificação enviado para o seu telefone <Text className="font-bold">11 97796-5692</Text>
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
            Se o código não chegar em até 2 minutos, clique no link de reenvio do código
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

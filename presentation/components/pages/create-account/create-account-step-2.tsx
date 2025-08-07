import { useCreateAccountStore } from '@/presentation/stores/create-account-store';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from '../../ui/button';
import { InputField } from '../../ui/input-field';
import { ProgressIndicator } from '../../ui/progress-indicator';

interface FormData {
  location: string;
  birthDate: string;
  managerCode: string;
  instagram: string;
}

export default function CreateAccountStep2({ step, incrementStep }: { step: number, incrementStep: () => void }) {
  const { formData, setFormData } = useCreateAccountStore();

  const {
    formState: { errors },
    control,
  } = useForm<FormData>();
  
  const locationRef = useRef<TextInput>(null);
  const birthDateRef = useRef<TextInput>(null);
  const managerCodeRef = useRef<TextInput>(null);
  const instagramRef = useRef<TextInput>(null);

  return (
    <View className='flex-1'>
      <ScrollView className='p-6'>
        <ProgressIndicator currentStep={step} totalSteps={3}/>

        <Text className="text-2xl font-semibold text-center">Fale um pouco sobre você</Text>
        <Text className="text-base font-medium text-center">
          Esses dados nos ajudam a analisar a aprovação da sua conta na Goold Pay.
        </Text>

        <View className="border-y border-border w-full py-4 my-4 flex-row items-center gap-4">
          <Image
            source={{ uri: 'https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/avatars/01.png' }}
            className="w-24 h-24 rounded-full"
          />
          <View className='flex-1 gap-y-1'>
            <Text className='font-semibold text-xl'>Joana ferreira</Text>
            <Text className='text-sm'>São Paulo - SP</Text>
            <Text className='text-sm'>@joanaferreira</Text>
          </View>
        </View>

        <InputField
          ref={locationRef}
          control={control}
          rules={{
            required: 'Campo obrigatório',
          }}
          name="location"
          label="Onde você mora?"
          label2="(Obrigatorio)"
          placeholder="Selecione"
          error={errors?.location}
          returnKeyType="next"
          onSubmitEditing={() => birthDateRef.current?.focus()}
        />

        <InputField
          ref={birthDateRef}
          control={control}
          rules={{
            required: 'Campo obrigatório',
          }}
          name="birthDate"
          label="Data de nascimento "
          label2="(Obrigatorio)"
          placeholder="Insira sua data de nascimento"
          error={errors?.birthDate}
          returnKeyType="next"
          onSubmitEditing={() => managerCodeRef.current?.focus()}
        />

        <InputField
          ref={managerCodeRef}
          control={control}
          rules={{
            required: 'Campo obrigatório',
          }}
          name="managerCode"
          label="Código do gestor "
          label2="(Opcional)"
          placeholder="Insira o código do time do seu gestor"
          error={errors?.managerCode}
          returnKeyType="next"
          onSubmitEditing={() => instagramRef.current?.focus()}
        />

        <InputField
          ref={instagramRef}
          control={control}
          rules={{
            required: 'Campo obrigatório',
          }}
          name="instagram"
          label="@ Instagram"
          label2="(Obrigatorio)"
          placeholder="Insira seu @ do Instagram"
          error={errors?.instagram}
          returnKeyType="next"
          onSubmitEditing={() => instagramRef.current?.blur()}
        />
      </ScrollView>

      <View className="gap-3 px-6 py-4 pb-8 border-t border-border">
        <Button onPress={incrementStep}>
          Prosseguir
        </Button>
      </View>
    </View>
  );
}

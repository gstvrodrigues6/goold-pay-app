import { useCreateAccountStore } from '@/presentation/stores/create-account-store';
import { formatBirthDate } from '@/shared/utils/format';
import { validateBirthDate } from '@/shared/utils/validate';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TextInput, View } from 'react-native';
import { AutocompleteInput } from '../../ui/auto-complete-input';
import { Button } from '../../ui/button';
import { InputField } from '../../ui/input-field';
import { ProgressIndicator } from '../../ui/progress-indicator';
import { SkeleteonText } from '../../ui/SkeleteonText';

interface FormData {
  location: string;
  birthDate: string;
  managerCode: string;
  instagram: string;
}

export default function CreateAccountStep2({ step, incrementStep }: { step: number, incrementStep: () => void }) {
  const { formData, setFormData } = useCreateAccountStore();
  const [loading, setLoading] = useState(false);

  const locationRef = useRef<TextInput>(null);
  const birthDateRef = useRef<TextInput>(null);
  const managerCodeRef = useRef<TextInput>(null);
  const instagramRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      location: formData.location,
      birthDate: formData.birthDate,
      managerCode: formData.managerCode,
      instagram: formData.instagram,
    }
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      setFormData({
        location: data.location,
        birthDate: data.birthDate,
        managerCode: data.managerCode,
        instagram: data.instagram,
      })
      incrementStep()
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='p-6'>
          <ProgressIndicator currentStep={step} totalSteps={3}/>

          <Text className="text-2xl font-semibold text-center">Fale um pouco sobre você</Text>
          <Text className="text-base font-medium text-center">
            Esses dados nos ajudam a analisar a aprovação da sua conta na Goold Pay.
          </Text>

          <View className="border-y border-border w-full py-4 my-4 flex-row items-center gap-4">
            <Image
              source={ formData.profilePic ?
                { uri: formData.profilePic } :
                require("@/presentation/assets/images/avatar-placeholder.png")}
              className="w-24 h-24 rounded-full"
            />
            <View className='flex-1 gap-y-1'>
              <Text className='font-semibold text-xl'>{formData.fullName}</Text>
              {watch('location') ? (
                <Text className='text-sm'>{watch('location')}</Text>
              ) : (
                <SkeleteonText />
              )}
              {watch('instagram') ? (
                <Text className='text-sm line-clamp-1'>{watch('instagram')}</Text>
              ) : (
                <SkeleteonText />
              )}
            </View>
          </View>

          <AutocompleteInput
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
              validate: validateBirthDate,
            }}
            maxLength={10}
            onChangeText={formatBirthDate}
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
        </View>
      </ScrollView>

      <View className="gap-3 px-6 py-4 pb-8 border-t border-border">
        <Button loading={loading} onPress={handleSubmit(onSubmit)}>
          Prosseguir
        </Button>
      </View>
    </View>
  );
}

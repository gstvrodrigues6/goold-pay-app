import { UploadIcon } from '@/presentation/assets/svg/upload-icon';
import { useCreateAccountStore } from '@/presentation/stores/create-account-store';
import { cleanFormat, formatCpf, formatPhone } from '@/shared/utils/format';
import { selectImage } from '@/shared/utils/select-image';
import { validateCpf } from '@/shared/utils/validate';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Button } from '../../ui/button';
import { InputField } from '../../ui/input-field';
import { PinInput } from '../../ui/pin-input';
import { ProgressIndicator } from '../../ui/progress-indicator';

interface FormData {
  profilePic: string;
  fullName: string;
  cpf: string;
  email: string;
  whatsapp: string;
  password: string;
}

export default function CreateAccountStep1({ step, incrementStep }: { step: number, incrementStep: () => void }) {
  const { formData, setFormData } = useCreateAccountStore();
  const [loading, setLoading] = useState(false);

  const fullNameRef = useRef<TextInput>(null);
  const cpfRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const whatsappRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      profilePic: formData.profilePic || '',
      fullName: formData.fullName,
      cpf: formatCpf(formData.cpf),
      email: formData.email,
      whatsapp: formatPhone(formData.whatsapp),
      password: formData.password,
    }
  });
  
  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      setFormData({
        profilePic: data.profilePic,
        fullName: data.fullName,
        cpf: cleanFormat(data.cpf),
        email: data.email,
        whatsapp: cleanFormat(data.whatsapp),
        password: data.password,
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
      <ScrollView className='p-6'>
        <ProgressIndicator currentStep={step} totalSteps={3}/>

        <Text className="text-2xl font-semibold text-center">Dados de criação conta</Text>
        <Text className="text-base font-medium text-center">
          Esses dados nos ajudam a analisar a aprovação da sua conta na Goold Pay.
        </Text>

        <View className="border-y border-border w-full py-4 my-4 flex-row items-center gap-4">
          <Image
            source={ watch('profilePic') ?
              { uri: watch('profilePic') } :
              require("@/presentation/assets/images/avatar-placeholder.png")}
            className="w-24 h-24 rounded-full"
          />
          <View className='flex-1 gap-y-2'>
            <Text className='font-medium text-base'>Foto de perfil</Text>
            <TouchableOpacity onPress={() => selectImage("profilePic", setValue)} className="flex-row items-center justify-center gap-2 border border-border rounded-md px-4 py-3">
              <UploadIcon/>
              <Text className="font-medium">Substituir imagem</Text>
            </TouchableOpacity>
            <Text className="text-sm"><Text className='font-bold'>.png</Text> ou <Text className='font-bold'>.jpeg</Text> até 10 MB</Text>
          </View>
        </View>

        <InputField
          ref={fullNameRef}
          control={control}
          rules={{
            required: 'Campo obrigatório',
            validate: {
              minTwoNames: (value) => {
                const names = value?.trim().split(/\s+/) || [];
                return names.length >= 2 || 'Digite pelo menos dois nomes';
              }
            }
          }}
          name="fullName"
          label="Nome da completo "
          label2="(Obrigatorio)"
          placeholder="ex.: Maria santos oliveira"
          error={errors?.fullName}
          returnKeyType="next"
          onSubmitEditing={() => cpfRef.current?.focus()}
        />

        <InputField
          ref={cpfRef}
          control={control}
          maxLength={14}
          rules={{
            required: 'Campo obrigatório',
            validate: (value) => validateCpf(value) || 'CPF inválido',
						setValueAs: (value) => value?.replace(/[^\d]/g, ''),
          }}
          onChangeText={formatCpf}
          name="cpf"
          label="CPF"
          label2="(Obrigatorio)"
          placeholder="Insira o documento"
          error={errors?.cpf}
          returnKeyType="next"
          onSubmitEditing={() => emailRef.current?.focus()}
        />

        <InputField
          ref={emailRef}
          control={control}
          rules={{
            required: 'Campo obrigatório',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'E-mail inválido'
            }
          }}
          name="email"
          label="E-mail"
          label2="(Obrigatorio)"
          placeholder="Insira seu e-mail"
          error={errors?.email}
          returnKeyType="next"
          onSubmitEditing={() => whatsappRef.current?.focus()}
        />

        <InputField
          ref={whatsappRef}
          control={control}
          rules={{
            required: 'Campo obrigatório',
          }}
          maxLength={15}
          onChangeText={formatPhone}
          name="whatsapp"
          label="WhatsApp"
          label2="(Obrigatorio)"
          placeholder="Insira seu número de WhatsApp"
          error={errors?.whatsapp}
          returnKeyType="next"
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
      </ScrollView>

      <View className="gap-3 px-6 py-4 pb-8 border-t border-border">
        <Button loading={loading} onPress={handleSubmit(onSubmit)}>
          Prosseguir
        </Button>
      </View>
    </View>
  );
}

import { DriverLicenseIcon } from '@/presentation/assets/svg/driver-license-icon';
import { IdCardIcon } from '@/presentation/assets/svg/id-card-icon';
import { PassportIcon } from '@/presentation/assets/svg/passport-icon';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Button } from '../../ui/button';
import { InputField } from '../../ui/input-field';

interface FormData {
	issuingCountry: string;
  documentType: 'rg' | 'driver_license' | 'passport';
}

export default function VerifyAccountStep3({ incrementStep }: { incrementStep: () => void }) {
  const {
    formState: { errors },
    control,
  } = useForm<FormData>();
  
  const issuingCountryRef = useRef<TextInput>(null);

  return (
    <View className='flex-1'>
      <ScrollView className='p-6'>
        <Text className="font-semibold text-xl text-center pb-6">Selecione o tipo e o país do seu documento para verificarmos</Text>

        <InputField
          ref={issuingCountryRef}
          control={control}
          rules={{
            required: 'Campo obrigatório',
          }}
          name="issuingCountry"
          label="País emissor?"
          label2="(Obrigatorio)"
          placeholder="Selecione"
          error={errors?.issuingCountry}
          returnKeyType="next"
          onSubmitEditing={() => issuingCountryRef.current?.blur()}
        />

          <View className='flex-row items-center pb-1'>
            <Text className="font-medium text-base">Tipo de documento</Text>
            <Text className="font-normal text-sm"> (Obrigatorio)</Text>
          </View>
          <Controller
          control={control}
          name="documentType"
          rules={{ required: 'Campo obrigatório' }}
          render={({ field: { onChange, value } }) => (
            <View className="gap-y-4">
              <Pressable
                onPress={() => onChange('rg')}
                className={`flex-row items-center gap-3 p-4 rounded-xl border ${
                  value === 'rg' ? 'border-primary bg-secondary' : 'border-border'
                }`}
              >
                <IdCardIcon color={value === 'rg' ? '#D9032C' : '#000'} />
                <Text className={`font-medium text-base ${value === 'rg' ? 'text-primary' : 'text-black'}`}>
                  Documento RG
                </Text>
              </Pressable>

              <Pressable
                onPress={() => onChange('driver_license')}
                className={`flex-row items-center gap-3 p-4 rounded-xl border ${
                  value === 'driver_license' ? 'border-primary bg-secondary' : 'border-border'
                }`}
              >
                <DriverLicenseIcon color={value === 'driver_license' ? '#D9032C' : '#000'} />
                <Text className={`font-medium text-base ${value === 'driver_license' ? 'text-primary' : 'text-black'}`}>
                  Documento habilitação
                </Text>
              </Pressable>

              {/* Documento Passaporte */}
              <Pressable
                onPress={() => onChange('passport')}
                className={`flex-row items-center gap-3 p-4 rounded-xl border ${
                  value === 'passport' ? 'border-primary bg-secondary' : 'border-border'
                }`}
              >
                <PassportIcon color={value === 'passport' ? '#D9032C' : '#000'} />
                <Text className={`font-medium text-base ${value === 'passport' ? 'text-primary' : 'text-black'}`}>
                  Documento passaporte
                </Text>
              </Pressable>
            </View>
          )}
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

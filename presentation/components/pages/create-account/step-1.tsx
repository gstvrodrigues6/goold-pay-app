import { useCreateAccountStore } from '@/presentation/stores/create-account-store';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export default function CreateAccountStep1() {
  const { fullName, cpf, email, whatsapp, password, setData } = useCreateAccountStore();

  const handlePasswordChange = (text: string, index: number) => {
    const newPassword = [...password];
    newPassword[index] = text;
    setData({ password: newPassword });
  };

  return (
    <View className="gap-y-5">
      <Text className="text-2xl font-bold text-gray-800">Dados de criação conta</Text>
      <Text className="text-base text-gray-500 -mt-3">
        Esses dados nos ajudam a analisar a aprovação da sua conta na Goold Pay.
      </Text>

      <View className="items-center">
        <View className="flex-row items-center gap-4">
          <Image
            source={{ uri: 'https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/avatars/01.png' }}
            className="w-20 h-20 rounded-full"
          />
          <TouchableOpacity className="flex-row items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-3">
            <Upload size={16} color="#4b5563" />
            <Text className="text-gray-600 font-semibold">Substituir imagem</Text>
          </TouchableOpacity>
        </View>
        <Text className="text-xs text-gray-400 mt-2">.png ou .jpeg até 10 MB</Text>
      </View>

      <Input
        label="Nome da completo"
        placeholder="ex.: Maria santos oliveira"
        value={fullName}
        onChangeText={(text) => setData({ fullName: text })}
        required
      />
      <Input
        label="CPF/CNPJ"
        placeholder="Insira seu CPF ou CNPJ"
        value={cpf}
        onChangeText={(text) => setData({ cpf: text })}
        required
      />
      <Input
        label="E-mail"
        placeholder="Insira seu e-mail"
        value={email}
        onChangeText={(text) => setData({ email: text })}
        keyboardType="email-address"
        required
      />
      <Input
        label="WhatsApp"
        placeholder="Insira seu número de WhatsApp"
        value={whatsapp}
        onChangeText={(text) => setData({ whatsapp: text })}
        keyboardType="phone-pad"
        required
      />

      <View className="gap-y-2">
        <View className="flex-row justify-between items-center">
            <Text className="font-medium text-gray-700">Senha de acesso <Text className="text-red-500">*</Text></Text>
            <EyeOff size={20} color="#6b7280" />
        </View>
        <View className="flex-row justify-between">
          {password.map((digit, index) => (
            <Input
              key={index}
              value={digit}
              onChangeText={(text) => handlePasswordChange(text, index)}
              maxLength={1}
              keyboardType="number-pad"
              secureTextEntry
              className="w-1/5 text-center text-2xl"
            />
          ))}
        </View>
      </View>
    </View>
  );
}

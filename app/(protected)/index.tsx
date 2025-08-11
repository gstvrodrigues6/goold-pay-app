import { AppsIcon } from '@/presentation/assets/svg/apps-icon';
import { BellIcon } from '@/presentation/assets/svg/bell-icon';
import { ChevronRightIcon } from '@/presentation/assets/svg/chevron-right-icon';
import { CommissionIcon } from '@/presentation/assets/svg/comission-icon';
import { CreditCardPictureIcon } from '@/presentation/assets/svg/credit-card-picture-icon';
import { EyeOpenIcon } from '@/presentation/assets/svg/eye-open-icon';
import { GooldIcon } from '@/presentation/assets/svg/goold-icon';
import { LinksIcon } from '@/presentation/assets/svg/links-icon';
import { PiggyBankIcon } from '@/presentation/assets/svg/piggy-bank-icon';
import { PixIcon } from '@/presentation/assets/svg/pix-icon';
import TransactionsList from '@/presentation/components/pages/protected/transactions-list';
import { useAuthStore } from '@/presentation/stores/auth-store';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { myAccount, clearAuth } = useAuthStore();
  
  return (
    <ScrollView className=" bg-white px-4 py-14">
      {/* Header */}
      <View className='gap-7'>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <GooldIcon/>
            <Text className="font-medium text-gray2 text-xl text-center">
              | Pay
            </Text>
          </View>
          <View className="relative">
            <BellIcon />
            <View className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
          </View>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Image source={{ uri: myAccount?.profilePic }} className="w-12 h-12 rounded-full" />
            <View>
              <Text className="font-medium text-xl">Boa tarde, Vitoria</Text>
              <Text className="font-medium text-sm">Influencer ❤️
                <Text className='font-semibold'> Goold Diamond</Text>
              </Text>
            </View>
          </View>
          <ChevronRightIcon />
        </View>

        <View className="gap-3 flex-row items-center justify-between">
          <View className='gap-3'>
            <View className="flex-row gap-4">
              <Text className="font-medium text-xl">Saldo</Text>
              <TouchableOpacity>
                <EyeOpenIcon />
              </TouchableOpacity>
            </View>
            <Text className="font-semibold text-3xl">R$ 100.217,00</Text>
          </View>

          <View className="gap-2">
            <Text className="font-semibold text-green2 text-lg">+R$ 4.200,00</Text>
            <TouchableOpacity onPress={clearAuth}>
              <Text className="font-bold text-base underline">Acessar Cofrinho</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity className="items-center flex-1">
            <View className="w-16 h-16 bg-secondary border border-border2 rounded-full items-center justify-center mb-2">
              <PixIcon />
            </View>
            <Text className="font-medium text-sm text-center">Área Pix e{"\n"}Transferir</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1">
            <View className="w-16 h-16 bg-secondary border border-border2 rounded-full items-center justify-center mb-2">
              <LinksIcon />
            </View>
            <Text className="font-medium text-sm text-center">Links{"\n"}Goold</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1">
            <View className="w-16 h-16 bg-secondary border border-border2 rounded-full items-center justify-center mb-2">
              <CommissionIcon />
            </View>
            <Text className="font-medium text-sm text-center">Antecipar{"\n"}comissões</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1">
            <View className="w-16 h-16 bg-secondary border border-border2 rounded-full items-center justify-center mb-2">
              <PiggyBankIcon />
            </View>
            <Text className="font-medium text-sm text-center">Cofrinho{"\n"}Goold</Text>
          </TouchableOpacity>

          <TouchableOpacity className="items-center flex-1">
            <View className="w-16 h-16 bg-secondary border border-border2 rounded-full items-center justify-center mb-2">
              <AppsIcon />
            </View>
            <Text className="font-medium text-sm text-center">APPs{"\n"}Goold</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="flex-row items-center px-4 py-3 gap-4 bg-secondary border border-border2 rounded-lg">
          <CreditCardPictureIcon />
          <Text className="font-semibold text-lg text-gray-900">Meus Cartões</Text>
          <Text className="font-medium text-white text-xs">em breve</Text>
        </TouchableOpacity>
      </View>

      <TransactionsList/>
    </ScrollView>
  )
}
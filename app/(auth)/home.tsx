import { GooldIcon } from "@/presentation/assets/svg/goold-icon";
import { LinkDefault } from "@/presentation/components/ui/link-default";
import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className='bg-white'>
      <ScrollView>
        <View className="px-4 py-14">
          <View className="flex-row items-center gap-2 pt-8">
            <GooldIcon/>
            <Text className="font-medium text-gray2 text-xl text-center">
              | Pay
            </Text>
          </View>

          <View className="py-8 items-center w-full">
            <Image resizeMode="contain" style={{ width: '100%' }} source={require('@/presentation/assets/images/intro-banner.png')} />
          </View>

          <Text className="font-semibold text-3xl text-center">
            <Text className="text-primary-dark">Goold Pay. </Text>
            O app feito para quem cria, engaja e fatura.
          </Text>
          <Text className="font-medium text-lg pt-7 text-center">
            Ganhe comissão como influencer ou afiliada goold, receba pagamentos, acesse cartão de crédito, explore apps exclusivos para impulsionar suas redes sociais e muito mais. Tudo em um só lugar, feito para quem vive do digital.
          </Text>

          <View className="w-full gap-6 pt-16">
            <LinkDefault href="/(auth)/auth-modal">
              Acessar minha conta
            </LinkDefault>
            <Link href="/(auth)/create-account" className="rounded-md items-center justify-center px-5 py-2">
              <Text className='font-bold text-lg underline text-center'>
                Criar conta Goold Pay
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

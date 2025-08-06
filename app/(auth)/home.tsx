import { GooldIcon } from "@/presentation/assets/svg/goold-icon";
import { AuthLoginModal } from "@/presentation/components/pages/auth/login-modal";
import { Button } from "@/presentation/components/ui/button";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <View className="h-screen bg-white px-3 py-14">
        <View className="mx-auto max-w-full w-[400px] flex-1  items-center">
          <View className="flex-row items-center gap-2 pt-12">
            <GooldIcon/>
            <Text className="font-medium text-gray2 text-xl text-center">
              | Pay
            </Text>
          </View>
          <Text className="font-semibold text-3xl text-center pt-8">
            <Text className="text-primary-dark">Goold Pay. </Text>
            O app feito para quem cria, engaja e fatura.
          </Text>
          <Text className="font-medium text-lg pt-7 text-center">
            Ganhe comissão como influencer ou afiliada goold, receba pagamentos, acesse cartão de crédito, explore apps exclusivos para impulsionar suas redes sociais e muito mais. Tudo em um só lugar, feito para quem vive do digital.
          </Text>

          <View className="w-full gap-6 pt-16">
            <Button onPress={() => setIsOpen(true)}>
              Acessar minha conta
            </Button>
            <Link href="/(auth)/create-account" className="rounded-md items-center justify-center px-5 py-2">
              <Text className='font-bold text-lg underline text-center'>
                Criar conta Goold Pay
              </Text>
            </Link>
          </View>
        </View>
      </View>

      <AuthLoginModal isOpen={isOpen} onClose={() => setIsOpen(false)}/>
    </>
  )
}

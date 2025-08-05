import { Text, View } from "react-native";

export default function CreateAccountScreen() {
  return (
    <View className="h-screen bg-white px-5 py-14">
      <View className="mx-auto max-w-full w-[340px] flex-1 justify-center items-center">
        <Text className="font-medium text-2xl text-center pt-14">
          Criar conta!
        </Text>
      </View>
    </View>
  )
}

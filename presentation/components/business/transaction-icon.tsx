import { CommissionIcon } from "@/presentation/assets/svg/comission-icon"
import { PixIcon } from "@/presentation/assets/svg/pix-icon"
import { View } from "react-native"

export const TransactionIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "commission":
      return (
        <View className="py-8">
          <CommissionIcon width={90} height={90}/>
        </View>
      )
    case "pix":
      return (
        <View className="py-8">
          <PixIcon width={90} height={90} />
        </View>
      )
    default:
      return (
        <View className="py-8">
          <CommissionIcon width={90} height={90}/>
        </View>
      )
  }
}
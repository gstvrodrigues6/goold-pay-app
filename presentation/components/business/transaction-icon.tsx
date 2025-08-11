import { CommissionIcon } from "@/presentation/assets/svg/comission-icon"
import { PixIcon } from "@/presentation/assets/svg/pix-icon"
import { View } from "react-native"

export const TransactionIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "commission":
      return (
        <View className="w-14 h-14 bg-secondary border border-border2 rounded-full items-center justify-center">
          <CommissionIcon />
        </View>
      )
    case "pix":
      return (
        <View className="w-14 h-14 bg-secondary border border-border2 rounded-full items-center justify-center">
          <PixIcon />
        </View>
      )
    default:
      return (
        <View className="w-14 h-14 bg-secondary border border-border2 rounded-full items-center justify-center">
          <CommissionIcon />
        </View>
      )
  }
}
import { CloseIcon } from "@/presentation/assets/svg/close-icon"
import { DownloadSecondIcon } from "@/presentation/assets/svg/download-second-icon"
import { GooldIcon } from "@/presentation/assets/svg/goold-icon"
import { Text, TouchableOpacity, View } from "react-native"
import { ModalDefault } from "../../ui/modal-default"

export const ModalProofTransaction = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <ModalDefault isOpen={isOpen} onClose={onClose}>
      <View className="py-2 px-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center gap-2 pt-8">
            <GooldIcon width={60} />
            <Text className="font-medium text-gray2 text-xl text-center">
              | Pay
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <CloseIcon width={12} />
          </TouchableOpacity>
        </View>

        <Text className="text-3xl font-semibold pb-3">Comprovante de comissão</Text>
        <Text className="text-base pb-2 border-b border-border">GOOLD PAY LTDA – CNPJ 00.000.000/0000-00</Text>

        <View className="flex-row justify-between py-4">
          <Text className="text-base font-medium">Nº Transação</Text>
          <Text className="text-base">ROPDUJ5XR8V410_0</Text>
        </View>
        <View className="flex-row justify-between py-4 border-b border-border">
          <Text className="text-base font-medium">Valor comissão</Text>
          <Text className="text-base">R$ 40,00</Text>
        </View>

        <Text className="font-semibold text-base pb-4 pt-6">Informações do pagador</Text>
        <View className="flex-row justify-between pb-4 border-b border-border">
          <Text className="text-base font-medium">Cliente</Text>
          <Text className="text-base">Luana silva perreira</Text>
        </View>
        <View className="flex-row justify-between py-4 border-b border-border">
          <Text className="text-base font-medium">Forma de pagamento</Text>
          <Text className="text-base">PIX</Text>
        </View>
        <View className="flex-row justify-between py-4 border-b border-border">
          <Text className="text-base font-medium">Valor compra</Text>
          <Text className="text-base">R$ 200,00</Text>
        </View>
        <View className="flex-row justify-between py-4 border-b border-border">
          <Text className="text-base font-medium">Quando</Text>
          <Text className="text-base">19/10/2025 às 12:18</Text>
        </View>

        <Text className="font-semibold text-base pb-4 pt-6">Informações do recebedor</Text>
        <View className="flex-row justify-between pb-4 border-b border-border">
          <Text className="text-base font-medium">Influencer</Text>
          <Text className="text-base">Vitoria froes borges</Text>
        </View>
        <View className="flex-row justify-between py-4 border-b border-border">
          <Text className="text-base font-medium">Valor comissão</Text>
          <Text className="text-base">R$ 40,00</Text>
        </View>
        <View className="flex-row justify-between py-4 border-b border-border">
          <Text className="text-base font-medium">Quando</Text>
          <Text className="text-base">19/10/2025 às 12:18</Text>
        </View>
        <View className="flex-row justify-between py-4">
          <Text className="text-base font-medium">Status</Text>
          <Text className="text-base">Comissão recebida 19/10/2025 às 12:18</Text>
        </View>

        <View className="items-center py-4">
          <TouchableOpacity className="flex-row gap-3 items-center">
            <DownloadSecondIcon />
            <Text className="font-bold text-lg underline">Baixar comprovante</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalDefault>
  )
}
import { CloseIcon } from "@/presentation/assets/svg/close-icon"
import { CommissionIcon } from "@/presentation/assets/svg/comission-icon"
import { TransactioIcon } from "@/presentation/assets/svg/transaction-icon"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { ModalBottom } from "../../ui/modal-bottom"
import { ModalProofTransaction } from "./modal-proof-transaction"

export const ModalTransaction = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [isOpenProof, setIsOpenProof] = useState(false)

  const openProof = () => {
    setIsOpenProof(true)
    onClose()
  }

  return (
    <>
      <ModalBottom isOpen={isOpen} onClose={onClose}>
        <TouchableOpacity onPress={onClose} className="absolute left-5 top-5 z-10">
          <CloseIcon width={12} />
        </TouchableOpacity>
        <View className="pt-10 px-4">
          <View className="py-8">
            <CommissionIcon width={90} height={90}/>
          </View>
          <Text className="text-3xl font-semibold pb-6">Comissão Venda - Pix</Text>
          <View className="flex-row justify-between py-4 border-b border-border">
            <Text className="text-base font-medium">Cliente</Text>
            <Text className="text-base">Mateus barbosa dos santos</Text>
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
            <Text className="text-base">Comissão recebida</Text>
          </View>

          <View className="items-center py-4">
            <TouchableOpacity onPress={openProof} className="flex-row gap-3 items-center">
              <TransactioIcon />
              <Text className="font-bold text-lg underline">Abrir comprovante</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ModalBottom>

      <ModalProofTransaction isOpen={isOpenProof} onClose={() => setIsOpenProof(false)} />
    </>
  )
}
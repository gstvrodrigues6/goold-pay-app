import { DownloadIcon } from "@/presentation/assets/svg/download-icon"
import { mockTransactions } from "@/presentation/mock/transactions"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { TransactionRoundedIcon } from "../../business/transaction-rounded-icon"
import { ModalTransaction } from "./modal-transaction"

export default function TransactionsList() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectTransaction, setSelectTransaction] = useState<any>(null)

  return (
    <>
      <View className="py-6 gap-5">
        <View className="flex-row items-center justify-between">
          <Text className="font-medium text-xl">Extrato</Text>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity className="w-8 h-8 bg-primary rounded-full items-center justify-center">
              <DownloadIcon />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Text className="font-medium text-base">Hoje</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center">
              <Text className="ffont-medium text-base">Mostrar tudo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row gap-4">
          <View className="flex-1 rounded-lg border border-border p-4">
            <Text className="text-base">Entradas</Text>
            <Text className="font-semibold text-lg">R$ 25.000,00</Text>
          </View>
          <View className="flex-1 rounded-lg border border-border p-4">
            <Text className="text-base">Saídas</Text>
            <Text className="font-bold text-lg">R$ 10.000,00</Text>
          </View>
        </View>

        <View>
          {mockTransactions.map((transaction) => (
            <TouchableOpacity onPress={() => {setIsOpen(true); setSelectTransaction(transaction)}} key={transaction.id} className="border-t border-border flex-row items-center gap-3 py-3">
              <TransactionRoundedIcon type={transaction.icon} />

              <View className="flex-1">
                <Text className="font-semibold text-lg">{transaction.title}</Text>
                <Text className="text-base">{transaction.subtitle}</Text>
              </View>

              <View className="items-end">
                <Text className={`font-bold text-lg ${transaction.isPositive ? "text-green2" : "text-red3"}`}>
                  {transaction.isPositive ? "+" : "-"}R$ {transaction.amount.toFixed(2).replace(".", ",")}
                </Text>
                <Text className="text-base">{transaction.category}</Text>
              </View>

            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <ModalTransaction isOpen={isOpen} onClose={() => setIsOpen(false)} transaction={selectTransaction} />
    </>
  )
}

import { ReactNode } from "react"
import { Text, View } from "react-native"
import { ModalBottom } from "../../ui/modal-bottom"

interface ModalBottomProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function AuthModal({
  isOpen,
  onClose,
  children
}: ModalBottomProps) {
  return (
    <ModalBottom isOpen={isOpen} onClose={onClose}>
      <View>
        <Text>asdasd</Text>
      </View>
    </ModalBottom>
  )
}
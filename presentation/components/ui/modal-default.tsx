import { ReactNode } from "react"
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

interface ModalefaultProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function ModalDefault({
  isOpen,
  onClose,
  children
}: ModalefaultProps) {
  return (
    <Modal 
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
      animationType="none"
    >
      <TouchableOpacity
        className="bg-black/30 flex-1 justify-end"
        onPress={onClose}
        activeOpacity={0.7}
      >
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View className="bg-white w-full h-full">
            {children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  )
}
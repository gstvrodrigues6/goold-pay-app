import { ReactNode } from "react"
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

interface ModalBottomProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function ModalBottom({
  isOpen,
  onClose,
  children
}: ModalBottomProps) {
  return (
    <Modal 
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
      animationType="none"
    >
      <TouchableOpacity
        className="bg-black/80 flex-1 justify-end"
        onPress={onClose}
        activeOpacity={0.7}
      >
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View className="bg-white rounded-t-xl w-full" style={{ minHeight: 540 }}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  )
}
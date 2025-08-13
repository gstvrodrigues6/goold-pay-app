import { ReactNode } from "react"
import { KeyboardAvoidingView, Modal, Platform, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

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
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
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
      </KeyboardAvoidingView>
    </Modal>
  )
}
import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export const ModalRouter = ({ children }: { children: ReactNode }) => {
  const navigation = useNavigation();

  const closeModal = () => {
    navigation.goBack();
  };

  return (
    <Modal 
      transparent={true}
      visible={true}
      onRequestClose={closeModal}
      animationType="none"
    >
      <TouchableOpacity
        className="bg-black/80 flex-1 justify-end"
        onPress={closeModal}
        activeOpacity={0.7}
      >
        <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
          <View className="bg-white rounded-t-xl w-full" style={{ minHeight: 540 }}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

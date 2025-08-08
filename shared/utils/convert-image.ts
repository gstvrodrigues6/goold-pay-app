import * as ImageManipulator from 'expo-image-manipulator';

export const convertAndCompressImageToBase64 = async (uri: string) => {
  try {
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      uri,
      [
        { resize: { width: 300, height: 300 } }
      ],
      {
        compress: 0.7,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );
    
    return `data:image/jpeg;base64,${manipulatedImage.base64}`;
  } catch (error) {
    console.error('Erro ao converter para base64:', error);
    throw error;
  }
};

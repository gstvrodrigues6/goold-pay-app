import * as ImagePicker from "expo-image-picker";
import { UseFormSetValue } from "react-hook-form";
import { Alert } from "react-native";
import { convertAndCompressImageToBase64 } from "./convert-image";

const requestPermissions = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
  if (status !== "granted") {
    Alert.alert("Permissão necessária", "Precisamos de permissão para acessar suas fotos.")
    return false
  }
  return true
}

export const selectImage = async (
  key: string,
  setValue: UseFormSetValue<any>
) => {
  const hasPermission = await requestPermissions()
  if (!hasPermission) return

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    })

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri
      const base64Image = await convertAndCompressImageToBase64(imageUri)

      setValue(key, base64Image)
    }
  } catch (error) {
    console.error("Erro ao selecionar imagem:", error)
  }
}

import { ToastErrorIcon } from '@/presentation/assets/svg/toast-error-icon';
import { ToastSuccessIcon } from '@/presentation/assets/svg/toast-success-icon';
import { Text, View } from 'react-native';
import type { ToastConfigParams } from 'react-native-toast-message';

export const toastConfig = {
	sucessoToast: ({ text1 }: ToastConfigParams<Record<string, unknown>>) => (
		<View className="bg-primary flex-row rounded-xl overflow-hidden">
			<View className="p-2 justify-center items-center">
				<ToastSuccessIcon />
			</View>

			<View className="py-2 justify-center">
				<Text className="font-semibold font-sm text-white">{text1}</Text>
			</View>
		</View>
	),

	erroToast: ({ text1 }: ToastConfigParams<Record<string, unknown>>) => (
		<View className="bg-primary flex-row rounded-xl px-4 overflow-hidden">
			<View className="p-2 justify-center items-center">
				<ToastErrorIcon />
			</View>

			<View className="py-2 justify-center">
				<Text className="font-semibold font-sm text-white">{text1}</Text>
			</View>
		</View>
	),
}

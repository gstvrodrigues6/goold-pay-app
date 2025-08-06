import { FingerprintIcon } from '@/presentation/assets/svg/FingerprintIcon';
import { formatCpf } from '@/shared/utils/format';
import { forwardRef, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CpfInputProps extends Omit<TextInputProps, 'onChangeText' | 'value' | 'defaultValue'> {
  label?: string;
  label2?: string;
  error?: { message?: string };
  showSvg?: boolean;
}

export const CpfInput = forwardRef<TextInput, CpfInputProps>(
	({ label, label2, error, showSvg, onChange, ...props }, ref) => {
		const [displayValue, setDisplayValue] = useState('');

		const handleChangeText = (inputValue: string) => {
			const cleanValue = inputValue.replace(/[^\d]/g, '');

			if (cleanValue.length <= 11) {
				const formattedValue = formatCpf(cleanValue);
				setDisplayValue(formattedValue);
			}
		};

		return (
			<View className="pb-6">
				{(label || label2) && (
					<View className='flex-row items-center pb-1'>
						{label && <Text className="font-medium text-base">{label}</Text>}
						{label2 && <Text className="font-normal text-sm"> {label2}</Text>}
					</View>
				)}

				<View className="relative px-3 gap-3 flex-row items-center focus:border-primarycolor w-full rounded-lg border border-border overflow-hidden">
					{showSvg && (
						<FingerprintIcon className="text-primarycolor w-[23px]" />
					)}
					<TextInput
						{...props}
						ref={ref}
						value={formatCpf(displayValue)}
						placeholderTextColor={'#A0A0A0'}
						onChangeText={handleChangeText}
						maxLength={14}
						placeholder={props.placeholder || '000.000.000-00'}
						className="outline-none placeholder:text-gray5 w-full py-3 text-base disabled:bg-[#F4F4F4]"
					/>
				</View>
				{error && <p className="text-xs text-red-500">{error.message}</p>}
			</View>
		);
	},
);

CpfInput.displayName = 'CpfInput';

import { FingerprintIcon } from '@/presentation/assets/svg/FingerprintIcon';
import { formatCpf } from '@/shared/utils/format';
import { forwardRef, useEffect, useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CpfInputProps extends Omit<TextInputProps, 'onChangeText' | 'value' | 'defaultValue'> {
  label?: string;
  label2?: string;
  error?: { message?: string };
  showSvg?: boolean;
}


export const CpfInput = forwardRef<TextInput, CpfInputProps>(
	({ label, label2, error, showSvg, onChange, defaultValue, ...props }, ref) => {
		const [displayValue, setDisplayValue] = useState('');

		useEffect(() => {
			if (defaultValue) {
				const formatted = formatCpf(String(defaultValue));
				setDisplayValue(formatted);
			}
		}, [defaultValue]);

		const handleChangeText = (inputValue: string) => {
			const cleanValue = inputValue.replace(/[^\d]/g, '');

			if (cleanValue.length <= 11) {
				const formattedValue = formatCpf(cleanValue);
				setDisplayValue(formattedValue);
			}
		};

		return (
			<View className="w-full pb-2">
				{(label || label2) && (
					<View>
						{label && <Text className="font-medium text-sm">{label}</Text>}
						{label2 && <Text className="font-normal text-xs"> {label2}</Text>}
					</View>
				)}

				<View className="relative focus:border-primarycolor w-full rounded-lg border text-base overflow-hidden">
					{showSvg && (
						<FingerprintIcon className="text-primarycolor absolute top-1/2 left-3 w-[23px] -translate-y-1/2 transform" />
					)}
					<TextInput
						{...props}
						ref={ref}
						value={formatCpf(displayValue)}
						onChangeText={handleChangeText}
						maxLength={14}
						placeholder={props.placeholder || '000.000.000-00'}
						className={cn('outline-none w-full p-3 bg-white disabled:bg-[#F4F4F4]', showSvg && 'pl-12')}
					/>
				</View>
				{error && <p className="text-xs text-red-500">{error.message}</p>}
			</View>
		);
	},
);

CpfInput.displayName = 'CpfInput';

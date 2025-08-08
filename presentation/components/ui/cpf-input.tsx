import { FingerprintIcon } from '@/presentation/assets/svg/fingerprint-icon';
import { FormError } from '@/shared/types/form';
import { formatCpf } from '@/shared/utils/format';
import { forwardRef } from 'react';
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CpfInputProps<T extends FieldValues> extends Omit<TextInputProps, 'onChangeText'> {
	label?: string;
	label2?: string;
	showSvg?: boolean;
	name: keyof T & string;
	control: Control<T>;
	rules?: RegisterOptions<T>;
	error?: FormError;
	disabled?: boolean;
}

export const CpfInput = forwardRef<TextInput, CpfInputProps<any>>(({
	label,
	label2,
	showSvg,
	name,
	control,
	rules,
	error, 
	disabled, 
	...rest 
  }, ref) => {
		return (
			<View className="pb-6">
				{(label || label2) && (
					<View className='flex-row items-center pb-1'>
						{label && <Text className="font-medium text-base">{label}</Text>}
						{label2 && <Text className="font-normal text-sm"> {label2}</Text>}
					</View>
				)}

				<View className={`relative px-3 gap-3 flex-row items-center min-h-14 w-full rounded-[10px] border border-border overflow-hidden bg-white ${disabled && "bg-[#f0f0f0]"}`}>
					{showSvg && (
						<FingerprintIcon className="w-[23px]" />
					)}
					<Controller
						name={name}
						control={control}
						rules={rules}
						render={({ field: { onChange, onBlur, value } }) => (
							<TextInput
								{...rest}
								ref={ref}
								maxLength={14}
								value={formatCpf(value)}
								onBlur={onBlur}
								onChangeText={(text) => {
									const formatted = formatCpf(text)
									onChange(formatted);
								}}
								editable={!disabled}
								placeholderTextColor={'#A0A0A0'}
								pointerEvents={disabled ? 'none' : 'auto'}
								style={{ borderColor: error ? '#ef4444' : '#D7D7D7' }}
								className='disabled:text-[#888] text-base font-normal flex-1'
							/>
						)}
					/>
				</View>
				{error?.message && typeof error.message === 'string' && <Text className='text-xs text-red-500 font-normal'>{error?.message}</Text>}
			</View>
		);
	},
);

CpfInput.displayName = 'CpfInput';

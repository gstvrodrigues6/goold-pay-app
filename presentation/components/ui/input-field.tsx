import { FormError } from '@/shared/types/form';
import { forwardRef } from 'react';
import { Control, Controller, FieldValues, RegisterOptions } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface InputFieldProps<T extends FieldValues> extends Omit<TextInputProps, 'onChangeText'> {
	label: string;
	label2?: string;
	name: keyof T & string;
	control: Control<T>;
	rules?: RegisterOptions<T>;
	error?: FormError;
	disabled?: boolean;
	onChangeText?: (text: string) => string;
}

export const InputField = forwardRef<TextInput, InputFieldProps<any>>(({
	label,
	label2,
	name,
	control,
	rules,
	error, 
	disabled, 
	onChangeText, 
	...rest 
  }, ref) => {
	return (
		<View className='pb-5'>
			{(label || label2) && (
				<View className='flex-row items-center pb-1'>
					{label && <Text className="font-medium text-base">{label}</Text>}
					{label2 && <Text className="font-normal text-sm"> {label2}</Text>}
				</View>
			)}
			<Controller
				name={name}
				control={control}
				rules={rules}
				render={({ field: { onChange, onBlur, value } }) => (
					<TextInput
						{...rest}
						ref={ref}
						value={value}
						onBlur={onBlur}
						onChangeText={(text) => {
							const formatted = onChangeText ? onChangeText(text) : text;
							onChange(formatted);
						}}
						editable={!disabled}
						placeholderTextColor={'#A0A0A0'}
						pointerEvents={disabled ? 'none' : 'auto'}
						style={{ borderColor: error ? '#ef4444' : '#D7D7D7' }}
            className='disabled:bg-[#f0f0f0] disabled:text-[#888] min-h-14 focus:border-primary border rounded-[10px] p-3 text-base font-normal'
					/>
				)}
			/>
			{error?.message && typeof error.message === 'string' && <Text className='text-xs text-red-500 font-normal'>{error?.message}</Text>}
		</View>
  	);
});

InputField.displayName = 'InputField';

import { EyeCloseIcon } from '@/presentation/assets/svg/EyeCloseIcon';
import { EyeOpenIcon } from '@/presentation/assets/svg/EyeOpenIcon';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Control, Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface PinInputProps {
	label?: string;
	label2?: string;
	eyeBtn?: boolean;
	control: Control<any>;
	name: string;
	rules?: RegisterOptions;
	error?: FieldError;
	numInputs?: number;
}

interface PinInputRef {
	focus: () => void;
}

export const PinInput = forwardRef<PinInputRef, PinInputProps>(
	({ label, label2, eyeBtn = true, control, name, rules, error, numInputs = 6 }, ref) => {
		const [showPassword, setShowPassword] = useState(!eyeBtn);
		const inputRefs = useRef<(TextInput | null)[]>([]);

		useImperativeHandle(ref, () => ({
			focus: () => {
				inputRefs.current[0]?.focus();
			},
		}));

		const handleInputChange = (
			index: number,
			value: string,
			onChange: (value: string) => void,
			currentValues: string[],
		) => {
			if (value.length > 1 || (value.length === 1 && !/^[0-9]$/.test(value))) {
				return;
			}

			const newValues = [...currentValues];
			newValues[index] = value;

			onChange(newValues.join(''));

			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus();
			}
		};

		const handleKeyPress = (index: number, key: string, currentValues: string[], onChange: (value: string) => void) => {
			if (key === 'Backspace' && !currentValues[index] && index > 0) {
				const newValues = [...currentValues];
				newValues[index - 1] = '';
				onChange(newValues.join(''));
				inputRefs.current[index - 1]?.focus();
			}
		};

		return (
			<View className="pb-2">
				<View className="flex items-center justify-between pb-1">
					{(label || label2) && (
						<View>
							{label && <Text className="text-sm font-medium">{label}</Text>}
							{label2 && <Text className="text-xs font-normal"> {label2}</Text>}
						</View>
					)}

					{eyeBtn && (
						<TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-1">
							{showPassword ? <EyeCloseIcon className="w-5 h-5" /> : <EyeOpenIcon className="w-5 h-5" />}
						</TouchableOpacity>
					)}
				</View>

				<Controller
					control={control}
					name={name}
					rules={rules}
					render={({ field: { onChange, value = '' } }: { field: { onChange: (value: string) => void; value: string } }) => {
						const values = Array(numInputs)
							.fill('')
							.map((_, index) => value[index] || '');

						return (
							<View className="flex gap-2 w-full justify-center px-0.5">
								{values.map((val, index) => (
									<TextInput
										key={index}
										ref={(el) => {
											inputRefs.current[index] = el;
										}}
										secureTextEntry={!showPassword}
										value={val}
										onChangeText={(text) => handleInputChange(index, text, onChange, values)}
										onKeyPress={({ nativeEvent }) => 
											handleKeyPress(index, nativeEvent.key, values, onChange)
										}
										className="w-1/6 aspect-square text-center text-xl font-semibold border rounded-lg bg-[#F6F4F1] focus:bg-white focus:ring-1 focus:ring-primarycolor focus:outline-none transition-all"
										maxLength={1}
										inputMode="numeric"
										keyboardType="numeric"
									/>
								))}
							</View>
						);
					}}
				/>

				{error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
			</View>
		);
	},
);

PinInput.displayName = 'PinInput';

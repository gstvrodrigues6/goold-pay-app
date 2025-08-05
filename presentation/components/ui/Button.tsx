import { ReactNode } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends Omit<TouchableOpacityProps, 'onPress'> {
	children: ReactNode;
	loading?: boolean;
	disabled?: boolean;
	onPress?: () => void;
}

export const Button = ({
	children,
	loading,
	disabled,
	onPress,
	...props
}: ButtonProps) => {
	const handleOnPress = () => {
		if (!loading && !disabled && onPress) {
			onPress();
		}
	};

	return (
		<TouchableOpacity
      className='rounded-md items-center justify-center px-5 py-4 bg-primary'
			onPress={handleOnPress}
			activeOpacity={0.7}
			disabled={loading || disabled}
			{...props}
		>
			{loading ?
        <ActivityIndicator color="white" size={22} />
          :
        <Text className='font-semibold text-white text-lg'>
          {children}
        </Text>
      }
		</TouchableOpacity>
	);
};

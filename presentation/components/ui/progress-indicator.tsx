import { View } from 'react-native';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  return (
    <View className="flex-row gap-x-4 px-7 py-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          className={`flex-1 h-1 rounded-full ${
            index < currentStep ? 'bg-primary-dark' : 'bg-black'
          }`}
        />
      ))}
    </View>
  );
}

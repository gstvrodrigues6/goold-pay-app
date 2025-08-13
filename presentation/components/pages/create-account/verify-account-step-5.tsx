import { RoundedErrorIcon } from '@/presentation/assets/svg/rounded-error-icon';
import { RoundedSuccessIcon } from '@/presentation/assets/svg/rounded-success-icon';
import { VerifyFaceIcon } from '@/presentation/assets/svg/verify-face-icon';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../../ui/button';


export default function VerifyAccountStep5({ incrementStep }: { incrementStep: () => void }) {
  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='p-6'>
          <Text className="font-semibold text-xl text-center pb-6">Prepare-se a sua câmera para realizar a verificação facial</Text>

          <View className='bg-secondary items-center justify-center py-4 rounded-lg border border-secondary-dark'>
            <VerifyFaceIcon/>
          </View>

          <View>
            <Text className='font-medium text-base pb-2 pt-5'>Dicas</Text>
            <View className='flex-row gap-3 pb-3'>
              <RoundedSuccessIcon/>
              <Text className='font-base'>Escanei o documento em um local bem iluminado.</Text>
            </View>
            <View className='flex-row gap-3 pb-3'>
              <RoundedSuccessIcon/>
              <Text className='font-base'>Evite reflexos ou sombras no documento.</Text>
            </View>
            <View className='flex-row gap-3 pb-3'>
              <RoundedErrorIcon/>
              <Text className='font-base'>Não edite imagens do seu documento</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="gap-3 px-6 py-4 pb-8 border-t border-border">
        <Button onPress={incrementStep}>
          Iniciar verificação
        </Button>
      </View>
    </View>
  );
}

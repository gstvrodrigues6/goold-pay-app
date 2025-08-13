import { MailIcon } from '@/presentation/assets/svg/mail-icon';
import { ScrollView, Text, View } from 'react-native';
import { Button } from '../../ui/button';
import { ProgressIndicator } from '../../ui/progress-indicator';
import { WhatsappIcon } from '@/presentation/assets/svg/whatsapp-icon';
import { IdentityDocIcon } from '@/presentation/assets/svg/identity-doc-icon';
import { DocumentIcon } from '@/presentation/assets/svg/document-icon';

export default function CreateAccountStep3({ step, incrementStep }: { step: number, incrementStep: () => void }) {
  return (
    <View className='flex-1'>
      <ScrollView>
        <View className='p-6'>
          <ProgressIndicator currentStep={step} totalSteps={3}/>

          <Text className="text-2xl font-semibold text-center">Vamos verificá-la</Text>
          <Text className="text-base font-medium text-center">
            Siga os 4 passos simples abaixo
          </Text>

          <View className='py-5 gap-6'>
            {steps.map(((step) => (
              <View key={step.id} className='flex-row gap-4 items-center'>
                <View className='w-14 h-14 rounded-full bg-gray-50 border border-border items-center justify-center'>
                  {step.icon}
                </View>
                <View>
                  <Text className='font-semibold text-lg'>{step.title}</Text>
                  <Text>{step.text}</Text>
                </View>
              </View>
            )))}
          </View>
        </View>
      </ScrollView>

      <View className="gap-3 px-6 py-4 pb-8 border-t border-border">
        <Button onPress={incrementStep}>
          Prosseguir
        </Button>
      </View>
    </View>
  );
}

const steps = [
  {
    id: 1,
    icon: <MailIcon />,
    title: 'Passo 1',
    text: 'Vamos verificar seu e-mail de cadastro',
  },
  {
    id: 2,
    icon: <WhatsappIcon />,
    title: 'Passo 2',
    text: 'Vamos verificar seu número de WhatsApp',
  },
  {
    id: 3,
    icon: <IdentityDocIcon />,
    title: 'Passo 3',
    text: 'Vamos verificar seu documento',
  },
  {
    id: 4,
    icon: <DocumentIcon />,
    title: 'Passo 4',
    text: 'Vamos fazer uma verificação facial via liveness',
  },
];
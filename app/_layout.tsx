import '@/global.css';

import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Montserrat-Regular': require('@/presentation/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Medium': require('@/presentation/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold': require('@/presentation/assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Bold': require('@/presentation/assets/fonts/Montserrat-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="(protected)" options={{ headerShown: false, animation: 'none' }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false, animation: 'none' }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

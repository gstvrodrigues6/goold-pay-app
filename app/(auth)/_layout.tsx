import { useAuthStore } from '@/presentation/stores/auth-store';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  const { myAccount } = useAuthStore();

  if (myAccount) {
    return <Redirect href="/(protected)" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none'
      }}>
      <Stack.Screen name="home" />
      <Stack.Screen
       options={{
          headerShown: false,
          presentation: 'transparentModal',
          gestureEnabled: true,
          contentStyle: { backgroundColor: 'transparent' },
        }}
        name="auth-modal" 
      />
      <Stack.Screen name="create-account" />
    </Stack>
  );
}

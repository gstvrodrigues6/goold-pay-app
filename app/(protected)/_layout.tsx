import { useAuthStore } from '@/presentation/stores/auth-store';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function ProtectedLayout() {
  const { myAccount } = useAuthStore();

  if (!myAccount) {
    return <Redirect href="/(auth)/home" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}

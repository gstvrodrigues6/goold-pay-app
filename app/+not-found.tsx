import { Link, Stack } from 'expo-router';
import { Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
        <Text>This screen does not exist.</Text>
        <Link href="/">
          <Text>Go to home screen!</Text>
        </Link>
    </>
  );
}

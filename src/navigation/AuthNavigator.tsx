import React from 'react';
import { VStack, Text, Center } from '@gluestack-ui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from '../components/ui/Button';

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen
        name="Login"
        component={() => (
          <Center flex={1} bg="$backgroundLight100">
            <VStack space="md" alignItems="center">
              <Text size="xl" fontWeight="bold">
                Welcome to PillPerk
              </Text>
              <Text size="md" color="$textLight600">
                Login Screen - TODO
              </Text>
              <Button onPress={() => console.log('Login pressed')}>
                Login
              </Button>
            </VStack>
          </Center>
        )}
      />
    </Stack.Navigator>
  );
}

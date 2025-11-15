import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GluestackProvider } from './src/components/GluestackProvider';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GluestackProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </GluestackProvider>
  );
}

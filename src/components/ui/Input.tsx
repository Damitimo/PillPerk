import React from 'react';
import { Input as GluestackInput, InputField } from '@gluestack-ui/themed';
import { TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  error?: string;
}

export function Input({ error, ...props }: InputProps) {
  return (
    <GluestackInput variant={error ? "outline" : "outline"} size="md">
      <InputField
        placeholderTextColor="#9CA3AF"
        {...props}
      />
    </GluestackInput>
  );
}

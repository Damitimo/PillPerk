import React from 'react';
import { Button as GluestackButton, ButtonText } from '@gluestack-ui/themed';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  onPress,
  variant = 'solid',
  size = 'md',
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <GluestackButton
      variant={variant}
      size={size}
      onPress={onPress}
      isDisabled={disabled || loading}
      opacity={disabled || loading ? 0.5 : 1}
    >
      <ButtonText>
        {children}
      </ButtonText>
    </GluestackButton>
  );
}

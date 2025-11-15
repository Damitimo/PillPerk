import React from 'react';
import { Badge as GluestackBadge, BadgeText } from '@gluestack-ui/themed';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline';
}

export function Badge({
  children,
  variant = 'solid',
}: BadgeProps) {
  return (
    <GluestackBadge variant={variant} size="sm">
      <BadgeText>
        {children}
      </BadgeText>
    </GluestackBadge>
  );
}

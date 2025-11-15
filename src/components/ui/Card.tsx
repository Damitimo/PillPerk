import React from 'react';
import { Card as GluestackCard, CardHeader, CardTitle, CardContent } from '@gluestack-ui/themed';

interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <GluestackCard>
      {children}
    </GluestackCard>
  );
}

export { CardHeader, CardTitle, CardContent };

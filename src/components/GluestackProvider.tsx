import { GluestackUIProvider, config } from '@gluestack-ui/themed';

export function GluestackProvider({ children }: { children: React.ReactNode }) {
  return (
    <GluestackUIProvider config={config}>
      {children}
    </GluestackUIProvider>
  );
}

'use client';

import StyledComponentsRegistry from '@/lib/styledComponentsRegistry';
import { ThemeProvider } from '@/components/themeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
      <StyledComponentsRegistry>
        <>{children}</>
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
}

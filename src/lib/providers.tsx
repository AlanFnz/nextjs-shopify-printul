'use client';

import StyledComponentsRegistry from '@lib/styled-components-registry';
import { ThemeProvider } from '@components/theme-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
      <StyledComponentsRegistry>
        <>{children}</>
      </StyledComponentsRegistry>
    </ThemeProvider>
  );
}

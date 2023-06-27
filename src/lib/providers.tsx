'use client';

import StyledComponentsRegistry from '@/lib/styledComponentsRegistry';
import { Provider } from 'react-redux';
import store from '../state/store';
import { ThemeProvider } from '@/components/themeProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
        <StyledComponentsRegistry>
          <>{children}</>
        </StyledComponentsRegistry>
      </ThemeProvider>
    </Provider>
  );
}

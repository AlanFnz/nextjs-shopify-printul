'use client';

import StyledComponentsRegistry from '@/lib/styledComponentsRegistry';
import { Provider } from 'react-redux';
import store from './store';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </Provider>
  );
}

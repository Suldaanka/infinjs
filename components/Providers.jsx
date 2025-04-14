'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from 'react-redux';
import { store } from '@/redux/stote';
import { Toaster } from 'sonner';
import { QueryProvider } from './QueryProvider';

export function Providers({ children }) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <QueryProvider>
          {children}
        </QueryProvider>
        <Toaster />
      </Provider>
    </ClerkProvider>
  );
}

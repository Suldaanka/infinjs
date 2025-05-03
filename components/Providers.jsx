'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from 'react-redux';
import { store } from '@/redux/stote';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/components/QueryProvider';
import { Counter } from '@/components/counter';

export function ClientProviders({ children }) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <QueryProvider>
          <Counter />
          {children}
        </QueryProvider>
        <Toaster />
      </Provider>
    </ClerkProvider>
  );
}
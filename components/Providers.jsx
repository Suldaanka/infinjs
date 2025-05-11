'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from 'react-redux';
import { store } from '@/redux/stote.js';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/components/QueryProvider';
import { Counter } from '@/components/counter';
import dynamic from 'next/dynamic';
import { ThemeProvider } from './theme-provider';

const UserLoader = dynamic(
  () => import('./counter').then(mod => mod.UserLoader),
  { ssr: false }
);
export function ClientProviders({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <ClerkProvider>
      <Provider store={store}>
        <QueryProvider>
          <UserLoader />
            {children}
        </QueryProvider>
        <Toaster />
      </Provider>
    </ClerkProvider>
    </ThemeProvider>
  );
}
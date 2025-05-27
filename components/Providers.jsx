'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { Provider } from 'react-redux';
import { store } from '@/redux/stote.js';
import { Toaster } from 'sonner';
import { QueryProvider } from '@/components/QueryProvider';
import dynamic from 'next/dynamic';
import { ThemeProvider } from './theme-provider';


const UserLoader = dynamic(
  () => import('./counter').then(mod => mod.UserLoader),
  { ssr: false }
);
export function ClientProviders({ children }) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <QueryProvider>
          <UserLoader />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            </ThemeProvider>
        </QueryProvider>
        <Toaster />
      </Provider>
    </ClerkProvider>
  );
}
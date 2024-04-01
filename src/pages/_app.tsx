import type { AppProps } from 'next/app';
import GlobalStyles from '@/styles/GlobalStyles';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Component {...pageProps} />
        <Toaster
          containerStyle={{
            fontSize: '15rem',
            fontWeight: '600',
          }}
          toastOptions={{
            style: {
              borderRadius: '999px',
            },
            // icon: '🐰',
          }}
        />
      </QueryClientProvider>
    </>
  );
}

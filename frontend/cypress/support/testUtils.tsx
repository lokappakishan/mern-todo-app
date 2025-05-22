import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mount } from 'cypress/react';

export const renderWithQueryClient = (component: React.ReactNode) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  mount(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

import AddTodo from '../../src/components/AddTodo';
import { mount } from 'cypress/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance
const queryClient = new QueryClient();

describe('AddTodo component', () => {
  it('renders inputs and Add button', () => {
    mount(
      <QueryClientProvider client={queryClient}>
        <AddTodo />
      </QueryClientProvider>
    );

    cy.get('input[placeholder="description"]').should('exist');
    cy.get('input[placeholder="tags"]').should('exist');
    cy.contains('Add').should('exist');
  });
});

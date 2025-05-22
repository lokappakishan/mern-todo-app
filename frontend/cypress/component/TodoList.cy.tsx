import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mount } from 'cypress/react';
import TodoList from '../../src/components/TodoList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

describe('<TodoList />', () => {
  it('sends a GET request on render to get todos', () => {
    // Intercept before the component makes the request
    cy.intercept('GET', '**/api/todo', {
      statusCode: 200,
      body: {
        success: true,
        todos: [
          {
            _id: '682dddcea9f2417f87e1f4f5',
            description: 'read book',
            status: 'pending',
            tags: ['habit'],
          },
          {
            _id: '682de446a9f2417f87e1f509',
            description: 'test',
            status: 'pending',
            tags: ['test'],
          },
          {
            _id: '682dee57a9f2417f87e1f529',
            description: 'have lunch',
            status: 'pending',
            tags: ['food'],
          },
        ],
      },
    }).as('getTodos');

    // mount TodoList
    mount(
      <QueryClientProvider client={queryClient}>
        <TodoList />
      </QueryClientProvider>
    );

    // catch and assert GET request
    cy.wait('@getTodos').its('request.method').should('eq', 'GET');

    // check for todo list items
    cy.get('[data-cy="todo-item"]')
      .should('have.length', 3)
      .each(($el) => cy.wrap($el).should('be.visible'));
  });
});

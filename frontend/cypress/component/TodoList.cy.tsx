import TodoList from '../../src/components/TodoList';
import { renderWithQueryClient } from '../support/testUtils';

describe('<TodoList />', () => {
  const mockTodos = [
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
  ];

  it('fetches todos on initial render via GET request', () => {
    // Intercept before the component makes the request
    cy.intercept('GET', '**/api/todo', {
      statusCode: 200,
      body: {
        success: true,
        todos: mockTodos,
      },
    }).as('getTodos');

    // mount TodoList
    renderWithQueryClient(<TodoList />);

    // catch and assert GET request
    cy.wait('@getTodos').its('request.method').should('eq', 'GET');

    // check for todo list items
    cy.get('[data-cy="todo-item"]')
      .should('have.length', 3)
      .each(($el) => cy.wrap($el).should('be.visible'));
  });

  it('shows empty state when no todos are returned', () => {
    // Intercept before the component makes the request
    cy.intercept('GET', '**/api/todo', {
      statusCode: 200,
      body: {
        success: true,
        todos: [],
      },
    }).as('getTodos');

    // mount TodoList
    renderWithQueryClient(<TodoList />);

    // catch and assert GET request
    cy.wait('@getTodos').its('request.method').should('eq', 'GET');

    // check for todo list items
    cy.get('[data-cy="todo-item"]').should('have.length', 0);
  });

  it('displays error message on failed todos fetch', () => {
    // Intercept but simulate a 404 error
    cy.intercept('GET', '**/api/todo', {
      statusCode: 404,
      body: '<html><body>Not Found</body></html>',
      headers: { 'content-type': 'text/html' },
    }).as('getTodos');

    // Mount the component
    renderWithQueryClient(<TodoList />);

    // Wait for the request to be made
    cy.wait('@getTodos');

    // Assert that error message is shown
    cy.contains('Error! Request failed with status code 404').should(
      'be.visible'
    );
  });

  it('shows loading state while fetching todos', () => {
    // Simulate network delay
    cy.intercept('GET', '**/api/todo', (req) => {
      req.on('response', (res) => {
        res.setDelay(1000);
      });
    }).as('getTodos');

    // Mount component
    renderWithQueryClient(<TodoList />);

    // Check for loading state before data appears
    cy.contains('Loading...').should('be.visible');

    // Wait for request to finish and remove loading
    cy.wait('@getTodos');
  });
});

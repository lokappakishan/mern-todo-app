// cypress/component/AddTodo.cy.tsx
import { mount } from 'cypress/react';
import 'react-toastify/dist/ReactToastify.css';
import AddTodo from '../../src/components/AddTodo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

describe('<AddTodo />', () => {
  beforeEach(() => {
    mount(
      <QueryClientProvider client={queryClient}>
        <AddTodo />
        <ToastContainer newestOnTop />
      </QueryClientProvider>
    );
  });

  it('renders inputs and Add button', () => {
    cy.get('[data-cy="input-description"]').should('exist');
    cy.get('[data-cy="select-status"]').should('exist');
    cy.get('[data-cy="input-tags"]').should('exist');
    cy.get('[data-cy="btn-add"]').should('exist');
  });

  it('shows error if description is empty', () => {
    cy.get('[data-cy="btn-add"]').click();
    cy.contains('Description cannot be empty').should('be.visible');
  });

  it('sends a POST request on valid submission', () => {
    // Stub with mock response
    cy.intercept('POST', '**/api/todo', {
      statusCode: 200,
      body: {
        success: true,
        message: 'post todo called',
      },
    }).as('addTodo');

    // fill the form
    cy.get('[data-cy="input-description"]').type('cypress test');
    cy.get('[data-cy="select-status"]').click();
    cy.get('.ant-select-item-option').contains('in progress').click();
    cy.get('[data-cy="input-tags"]').type('test');

    //click button to send request
    cy.get('[data-cy="btn-add"]').click();

    // wait and check for POST method
    cy.wait('@addTodo').its('request.method').should('eq', 'POST');

    // check and assert the request payload
    cy.get('@addTodo')
      .its('request.body')
      .should('deep.equal', {
        description: 'cypress test',
        status: 'in progress',
        tags: ['test'],
      });

    // verify success toast and form reset
    cy.contains('added successfully', { timeout: 6000 }).should('be.visible');
    cy.get('[data-cy="input-description"]').should('have.value', '');
    cy.get('[data-cy="input-tags"]').should('have.value', '');
  });
});

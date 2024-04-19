// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
  const form = {
    name: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    number: '123456789',
    howWeMayHelp: 'Testing message...',
  }

  cy.get('input[id="firstName"]')
    .should('be.visible')
    .type(form.name, { delay: 0 })
    .should('have.value', form.name)
  cy.get('input[id="lastName"]')
    .should('be.visible')
    .type(form.lastName, { delay: 0 })
    .should('have.value', form.lastName)
  cy.get('input[id="email"]')
    .should('be.visible')
    .type(form.email, { delay: 0 })
    .should('have.value', form.email)
  cy.get('textarea[id="open-text-area"]')
    .should('be.visible')
    .type(form.howWeMayHelp, { delay: 0 })
    .should('have.value', form.howWeMayHelp)
})

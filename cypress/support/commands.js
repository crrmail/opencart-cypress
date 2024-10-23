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

Cypress.Commands.add('loginWithEmailandPassword', (email,password) => {
    cy.get('#input-email').type(email)
    cy.get('#input-password').type(password)
    cy.get('form > .btn').click()
})
Cypress.Commands.add('popupMessageErrorAlert', () => {
    cy.get('.alert').should('be.visible')
    cy.get('.alert').should('have.text',' Warning: No match for E-Mail Address and/or Password.')
})
Cypress.Commands.add('searchProduct',(produceName) => {
    cy.get('.form-control').type(produceName)
    cy.get('.input-group-btn > .btn').click()
})
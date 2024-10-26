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
Cypress.Commands.add('popupAlert',(massegeAlert) => {
    cy.get('.alert').should('be.visible')
    cy.get('.alert').should('have.text',massegeAlert)

})
Cypress.Commands.add('searchProduct',(produceName) => {
    cy.get('.form-control').type(produceName)
    cy.get('.input-group-btn > .btn').click()
})
Cypress.Commands.add('goToLoginFromHome',() => {
    cy.get('.list-inline > .dropdown > .dropdown-toggle').click()
    cy.get('.dropdown-menu > :nth-child(2) > a').click()
})
Cypress.Commands.add('addItemToCart',() => {
    cy.get(':nth-child(7) > a').click()
    cy.get("[onclick=\"cart.add('30', '1');\"]").click()
    cy.get('#input-option226').select('Red')
    cy.get('#button-cart').click()
})
Cypress.Commands.add('tc022',() => {
    // add item to cart
    cy.addItemToCart()

    // checkout
    cy.get(':nth-child(4) > a > .fa').click()
    cy.get('.pull-right > .btn').click()

    // select Guest Checkout
    cy.get(':nth-child(4) > label > input').click()
    cy.get('#button-account').click()
})
Cypress.Commands.add('personalInfo2',() => {
    cy.get('#input-payment-firstname').type('David')
    cy.get('#input-payment-lastname').type('Roger')
    cy.get('#input-payment-email').type('david@email.com')
    cy.get('#input-payment-telephone').type('0912223333')
    cy.get('#input-payment-address-1').type('199 Bangna Tai')
    cy.get('#input-payment-city').type('Bangna')
    cy.get('#input-payment-postcode').type('10900')
    cy.get('#input-payment-country').select('Thailand')
    cy.get('#input-payment-zone').select('Bangkok')
})
Cypress.Commands.add('tc025',() => {
    cy.tc022()
    cy.personalInfo2()
    cy.get('.checkbox > label > input').click()
    cy.get('#button-guest').click()
    cy.get('#collapse-shipping-address > .panel-body').should('be.visible')
})
Cypress.Commands.add('personalInfo3',() => {
    cy.get('#input-shipping-firstname').type('David')
    cy.get('#input-shipping-lastname').type('Roger')
    cy.get('#input-shipping-address-1').type('199 Bangna Tai')
    cy.get('#input-shipping-city').type('Bangna')
    cy.get('#input-shipping-postcode').type('10900')
    cy.get('#input-shipping-country').select('Thailand')
    cy.get('#input-shipping-zone').type('Bangkok')    
})

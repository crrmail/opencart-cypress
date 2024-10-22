import testData from '../loginData.json'

describe('login', () => {
    beforeEach(() => {
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
        cy.get('.list-inline > .dropdown > .dropdown-toggle').click()
        cy.get('.dropdown-menu > :nth-child(2) > a').click()
        
    })
    it('tc004 : Login success with valid email and password', () => {
        cy.loginWithEmailandPassword(testData.validEmail,testData.validPassword)

        // verify for success
        cy.url().should('eq','https://opencart.abstracta.us/index.php?route=account/account')
        cy.get('#content > :nth-child(1)').should('have.text','My Account')

        // log out
        cy.get('.list-inline > .dropdown > .dropdown-toggle').click()
        cy.get('.dropdown-menu > :nth-child(5) > a').click()
        cy.get('.pull-right > .btn').click()
    })
    it('tc005 : Login fails with invalid email and password', () => {
        // login with invalid email and password
        cy.loginWithEmailandPassword(testData.invalidEmail,testData.invalidPassword)

        // pop up message error alert
        cy.popupMessageErrorAlert()
    })
    it('tc006 : Login fails with missing email and password', () => {
        // login with both email and password missing
        cy.get('form > .btn').click()

        // pop up message error alert
        cy.popupMessageErrorAlert()
    })
    it('tc007 : Login fails with missing email',() => {
        // login with missing email
        cy.get('#input-password').type('1234')
        cy.get('form > .btn').click()

        // pop up message error alert
        cy.popupMessageErrorAlert()
    })
    it('tc008 : Login fails with missing password',() => {
        // login with missing password
        cy.get('#input-email').type('example@email.com')
        cy.get('form > .btn').click()

        // pop up message error alert
        cy.popupMessageErrorAlert()
    })
    it('tc009 : Forgot password request successful',() => {
        cy.get('form > :nth-child(2) > a').click()
        cy.get('#input-email').type(testData.validEmail)
        cy.get('.pull-right > .btn').click()

        // pop up message alert
        cy.get('.alert').should('be.visible')
        cy.get('.alert').should('have.text',' An email with a confirmation link has been sent your email address.')
    })




})

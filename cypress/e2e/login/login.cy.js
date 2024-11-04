import testData from '../loginData.json'
import { popupMessageErrorAlert,loginWithEmailandPassword,popupAlert } from '../util'

describe('login', () => {
    beforeEach(() => {
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
        cy.goToLoginFromHome()
    })

    it('tc004 : Login success with valid email and password', () => {
        // login with valid email and password
        loginWithEmailandPassword(testData.validEmail, testData.validPassword)

        // verify for success
        cy.get('#content > :nth-child(1)').should('have.text','My Account')        
        cy.url().should('eq','https://opencart.abstracta.us/index.php?route=account/account')
    })

    it('tc005 : Login fails with invalid email and password', () => {
        // login with invalid email and password
        loginWithEmailandPassword(testData.invalidEmail, testData.invalidPassword)

        // pop up message error alert
        popupMessageErrorAlert()
    })

    it('tc006 : Login fails with missing email and password', () => {
        // login with both email and password missing
        cy.get('form > .btn').click()

        // pop up message error alert
        popupMessageErrorAlert()
    })

    it('tc007 : Login fails with missing email',() => {
        // login with missing email
        cy.get('#input-password').type('1234')
        cy.get('form > .btn').click()

        // pop up message error alert
        popupMessageErrorAlert()
    })

    it('tc008 : Login fails with missing password',() => {
        // login with missing password
        cy.get('#input-email').type('example@email.com')
        cy.get('form > .btn').click()

        // pop up message error alert
        popupMessageErrorAlert()
    })

    it('tc009 : Forgot password request successful',() => {
        cy.get('form > :nth-child(2) > a').click()
        cy.get('#input-email').type(testData.validEmail)
        cy.get('.pull-right > .btn').click()

        // pop up message alert 
        popupAlert(' An email with a confirmation link has been sent your email address.')
    })
})

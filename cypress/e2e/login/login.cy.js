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
        cy.get('#input-email').type(testData.invalidEmail)
        cy.get('#input-password').type(testData.invalidPassword)
        cy.get('form > .btn').click()
        //cy.loginWithEmailandPassword(testData.invalidEmail,testData.invalidPassword)

        // pop up message error alert
        cy.get('.alert').should('be.visible')
        //cy.get('.alert').should('have.text','Warning: No match for E-Mail Address and/or Password.')
        cy.get('.alert').should('have.text',' Warning: No match for E-Mail Address and/or Password.')
    })
    
    it('tc006 : Login fails with invalid email', () => {
        cy.loginWithEmailandPassword(testData.invalidEmail,testData.validPassword)

        // pop up message error alert
        cy.get('.alert').should('be.visible')
        cy.get('.alert').should('have.text',' Warning: No match for E-Mail Address and/or Password.')

    })
    it('tc007 : Login fails with missing email or password', () => {
        cy.loginWithEmailandPassword('','')

        // pop up message error alert
        cy.get('.alert').should('be.visible')
        cy.get('.alert').should('have.text',' Warning: No match for E-Mail Address and/or Password.')
    })
    it.only('tc008 : Login fails due to exceeded login attempts', () => {
        cy.loginWithEmailandPassword(testData.invalidEmail,testData.invalidPassword)


      // pop up message error alert
      cy.get('.alert').should('be.visible')
      cy.get('.alert').should('have.text', ' Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour.')
      
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

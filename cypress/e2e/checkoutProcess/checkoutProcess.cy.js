import testData from '../loginData.json'

describe('Checkout process',() => {
    beforeEach(() => {
        // home page
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
    })
    it('tc021 : Checkout after login successful',() => {
        // login success
        cy.goToLoginFromHome()
        cy.loginWithEmailandPassword(testData.validEmail,testData.validPassword)
        cy.get('h1 > a').click()

        // add item to cart
        cy.get(':nth-child(7) > a').click()
        cy.get("[onclick=\"cart.add('30', '1');\"]").click()
        cy.get('#input-option226').select('Red')
        cy.get('#button-cart').click()


        // checkout
        cy.get(':nth-child(4) > a > .fa').click()
        cy.get('.pull-right > .btn').click()
    })
    it.only('tc022 : Checkout without Login with (Guest )',() => {
        // add item to cart
        cy.get(':nth-child(7) > a').click()
        cy.get("[onclick=\"cart.add('30', '1');\"]").click()
        cy.get('#input-option226').select('Red')
        cy.get('#button-cart').click()

        // checkout
        cy.get(':nth-child(4) > a > .fa').click()
        cy.get('.pull-right > .btn').click()

        // select Guest Checkout
        cy.get(':nth-child(4) > label > input').click()
        cy.get('#button-account').click()
    })
})

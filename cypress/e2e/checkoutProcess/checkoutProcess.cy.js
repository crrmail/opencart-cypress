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
        cy.addItemToCart()

        // checkout
        cy.get(':nth-child(4) > a > .fa').click()
        cy.get('.pull-right > .btn').click()
    })
    it('tc022 : Checkout without Login with (Guest )',() => {
        // add item to cart
        cy.addItemToCart()

        // checkout
        cy.get(':nth-child(4) > a > .fa').click()
        cy.get('.pull-right > .btn').click()

        // select Guest Checkout
        cy.get(':nth-child(4) > label > input').click()
        cy.get('#button-account').click()
    })
    it('tc023 : Submit Form with all required data',() => {
        // add and checkout item
        cy.tc022()

        // Personal info
        cy.personalInfo2()

        // Submit Form
        cy.get('#button-guest').click()

        //
        cy.get('#collapse-shipping-method > .panel-body').should('be.visible')
    })
    it('tc024 : Submit Form with missing required data',() => {
        // add and checkout item
        cy.tc022()

        // Submit Form
        cy.get('#button-guest').click()

        // verify 
        cy.get('#account > :nth-child(3) > .text-danger').should('be.visible')
    })
    it.only('tc025 : Submit Form with all required data (Uncheck “My delivery and billing addresses are the same”)',() => {
        // add and checkout item
        cy.tc022()

        // Personal info step 2
        cy.personalInfo2()

        // Uncheck “My delivery and billing addresses are the same”
        cy.get('.checkbox > label > input').click()

        // Submit Form
        cy.get('#button-guest').click()

        // verify
        cy.get('#collapse-shipping-address > .panel-body').should('be.visible')
    })
    it.only('tc026 : Submit Form with all required information',() => {
        cy.tc025()

        // Personal info step 3
        cy.personalInfo3()

        // submit
        cy.get('#button-guest-shipping').click()
    })
})

import testData from '../loginData.json'
import { checkoutWithGuestUser,addItemToCart,personalInfo2,personalInfo3,submitStep2FormwithUncheck,submitFormWithAllRequiredData,popupAlert } from '../util'

describe('Checkout process', () => {
    beforeEach(() => {
        // home page
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
    })

    it('tc021 : step1 Checkout after login successful', () => {
        // login success
        cy.goToLoginFromHome()
        cy.loginWithEmailandPassword(testData.validEmail, testData.validPassword)
        cy.get('h1 > a').click()

        // add item to cart
        addItemToCart()

        // checkout
        cy.get(':nth-child(4) > a > .fa').click()
        cy.get('.pull-right > .btn').click()
    })

    it('tc022 : step1 Checkout without Login with (Guest)', () => {
        // add item to cart
        addItemToCart()

        // checkout
        cy.get(':nth-child(4) > a > .fa').click()
        cy.get('.pull-right > .btn').click()

        // select Guest Checkout
        cy.get(':nth-child(4) > label > input').click()
        cy.get('#button-account').click()

        // verify Proceed to Step 2
        cy.get('#content').should('be.visible')

    })

    it('tc023 : step2 Submit Form with all required data with defualt acceptance', () => {
        // add and checkout item
        checkoutWithGuestUser()

        // Personal info
        personalInfo2()

        // Submit step 2
        cy.get('#button-guest').click()

        // verify Proceed to Step 4
        cy.get('#collapse-shipping-method > .panel-body').should('be.visible')
    })

    it('tc024 : step2 Submit Form with missing required data', () => {
        // add and checkout item
        checkoutWithGuestUser()

        // Submit step 2
        cy.get('#button-guest').click()

        // verify the current step
        cy.get('#account > :nth-child(3) > .text-danger').should('be.visible')
    })

    it('tc025 : step2 Submit Form with all required data without acceptance', () => {
        // add and checkout item
        checkoutWithGuestUser()

        // Personal info step 2
        personalInfo2()

        // Uncheck “My delivery and billing addresses are the same”
        cy.get('.checkbox > label > input').click()

        // Submit step 2
        cy.get('#button-guest').click()

        // verify Proceed to Step 3
        cy.get('#collapse-shipping-address > .panel-body').should('be.visible')
    })

    it('tc026 : step3 Submit Form with all required information', () => {
        // tc 025
        submitStep2FormwithUncheck()

        // Personal info step 3
        personalInfo3()

        // submit step 3
        cy.get('#button-guest-shipping').click()

        // verify Proceed to Step 4
        cy.get('#collapse-shipping-method > .panel-body').should('be.visible')
    })

    it('tc027 : step3 Submit Form with missing required information',() => {
        // tc 025
        submitStep2FormwithUncheck()

        // submit step 3
        cy.get('#button-guest-shipping').click()

        // verify the current step
        cy.get(':nth-child(1) > .col-sm-10 > .text-danger').should('be.visible')
    })

    it('tc028 : step4 Select Flat Rate (Defualt)',() => {
        
        submitFormWithAllRequiredData()

        // submit step 4
        cy.get('#button-shipping-method').click()

        // verify Proceed to Step 5
        cy.get('#collapse-payment-method > .panel-body').should('be.visible')
    })

    it('tc029 : step5 Select payment method with acceptance',() => {
        // Pass Step 4
        submitFormWithAllRequiredData()
        cy.get('#button-shipping-method').click()
        
        // Select Accept
        cy.get('.pull-right > [type="checkbox"]').click()

        // submit step 5
        cy.get('#button-payment-method').click()

        // verify Proceed to Step 6
        cy.get('#collapse-checkout-confirm > .panel-body',{ timeout: 5000 }).should('be.visible')
    })

    it('tc030 : step5 Select payment method without acceptance',() => {
        // Pass Step 4
        submitFormWithAllRequiredData()
        cy.get('#button-shipping-method').click()

        // submit step 5
        cy.get('#button-payment-method').click()

        // verify the current step
        popupAlert('Warning: You must agree to the Terms & Conditions!×')
    })

    it('tc031 : step6 Confirm order',() => {
        // Pass Step 5
        submitFormWithAllRequiredData()
        cy.get('#button-shipping-method').click()
        cy.get('.pull-right > [type="checkbox"]').click()
        cy.get('#button-payment-method').click()

        // submit confirm order
        cy.get('#button-confirm').click()

        //verify Confirm order success
        cy.get('#content').should('be.visible')
        cy.get('#content').should('have.text','\n      Your order has been placed!\n      Your order has been successfully processed!Please direct any questions you have to the store owner.Thanks for shopping with us online!\n      \n        Continue\n      \n      ')
    })
})

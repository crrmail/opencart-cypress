import testData from '../loginData.json'
import {personalInfo2,addItemToCart,checkoutWithUserlogin} from '../util'

describe('order History',() => {
    
    it('cancle', () => {

        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
        
        checkoutWithUserlogin(testData.validEmail, testData.validPassword)
        
        // add item to cart
        addItemToCart()

        // check out
        cy.get(':nth-child(4) > a > .fa').click()
        cy.get('.pull-right > .btn').click()

        // step 2
        cy.get('#button-payment-address').click()
        // step 3
        cy.get('#button-shipping-address').click()
        // step 4
        cy.get('#button-shipping-method').click()
        // step 5
        cy.get('.pull-right > [type="checkbox"]',{ timeout : 5000 }).click()
        cy.get('#button-payment-method').click()
        cy.get('#collapse-checkout-confirm > .panel-body').should('be.visible')

        // step 6
        cy.get('#button-confirm').click()
        cy.get('#content').should('be.visible')
        //cy.get('.pull-right > .btn').click({ multiple: true }

        // 
        cy.get('.caret').click()

    })

    it.only('tc032 : View Order History', () => {
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
        // 
        //cy.get('.caret').click()
        checkoutWithUserlogin(testData.validEmail, testData.validPassword)
        // view order
        cy.get('.caret').click()
        cy.get('.dropdown-menu > :nth-child(2) > a').click()

        // order detail
        cy.get(':nth-child(1) > :nth-child(7) > .btn').click()
    })

    it.only('tc033 : Reorder from an Existing Order',() => {
        
        cy.visit('https://opencart.abstracta.us/index.php?route=account/order')
        checkoutWithUserlogin(testData.validEmail, testData.validPassword)
        // view order
        cy.get('.caret').click()
        cy.get('.dropdown-menu > :nth-child(2) > a').click()

        // order detail
        cy.get(':nth-child(1) > :nth-child(7) > .btn').click()

        // select reorder
        cy.get('.btn-primary > .fa').click()

        // verify order in cart
        cy.get('.btn-inverse').click()
        cy.get(':nth-child(4) > a > .fa').click()
    })

})

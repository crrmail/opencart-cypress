import testData from '../loginData.json'
import {addItemToCart,checkoutWithUserlogin} from '../util'

describe('order History',() => {
    beforeEach(() => {
        cy.visit('https://opencart.abstracta.us/index.php?route=account/order')
    })
    
    it('cancle', () => {        
        
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
        // 
        cy.get('.caret').click()
    })

    it('tc032 : View Order History', () => {
        // login
        checkoutWithUserlogin(testData.validEmail, testData.validPassword)
        
        // view order
        cy.get('.caret').click()
        cy.get('.dropdown-menu > :nth-child(2) > a').click()
        
        // order detail
        cy.get(':nth-child(1) > :nth-child(7) > .btn').click()
    })

    it('tc033 : Reorder from an Existing Order',() => {
        // login
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

    it.only('tc034 : Return order with select require checkbok',() => {
        checkoutWithUserlogin(testData.validEmail, testData.validPassword)

         // view order
         cy.get('.caret').click()
         cy.get('.dropdown-menu > :nth-child(2) > a').click()
 
         // order detail
         cy.get(':nth-child(1) > :nth-child(7) > .btn').click()

         // select return and checkbox
         cy.get('[style="white-space: nowrap;"] > .btn-danger').click()
         cy.get(':nth-child(1) > label > input').click()

         // submit to return order
         cy.get('.pull-right > .btn').click()

         // verify return order success
         cy.get('#content > h1').should('be.visible')
         cy.get('#content > h1').should('have.text','Account')
         cy.get('#content > :nth-child(2)').should('have.text','Thank you for submitting your return request. Your request has been sent to the relevant department for processing.')
    })

    it('tc035 : Return order without select require checkbok',() => {
        checkoutWithUserlogin(testData.validEmail, testData.validPassword)

         // view order
         cy.get('.caret').click()
         cy.get('.dropdown-menu > :nth-child(2) > a').click()
 
         // order detail
         cy.get(':nth-child(1) > :nth-child(7) > .btn').click()

         // select return without checkbox
         cy.get('[style="white-space: nowrap;"] > .btn-danger').click()

         // submit to return order
         cy.get('.pull-right > .btn').click()

         // verify
         cy.url().should('eq','https://opencart.abstracta.us/index.php?route=account/return/add')
         cy.get('.has-error > .col-sm-2').should('be.visible')
    })

})

import testData from '../loginData.json'
import {personalInfo2,addItemToCart,checkoutWithUserlogin} from '../util'

describe('View Order History',() => {
    beforeEach(() => {
        // home page
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
    })
    it('tc032 : View Order History', () => {
        
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
        cy.get('.pull-right > [type="checkbox"]').click()
        cy.get('#button-payment-method').click()
        // step 6
        cy.get('#button-confirm',{timeout: 5000}).click()





        //.goToLoginFromHome()
        //cy.loginWithEmailandPassword(testData.validEmail, testData.validPassword)
        //cy.get('h1 > a').click()



    })
})

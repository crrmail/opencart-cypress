import testData from '../loginData.json'
import { loginWithEmailandPassword,popupAlert,popupAlertContain } from '../util'

describe('add item to favorites',() => {
    beforeEach(() => {
        // home page
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
    })
    
    it('tc013 : Add Item to favorites after successful login',() => {
        // login success
        cy.goToLoginFromHome()
        loginWithEmailandPassword(testData.validEmail,testData.validPassword)
        cy.get('h1 > a').click()

        // click to favorite
        cy.get(':nth-child(1) > .product-thumb > .caption > h4 > a').click()
        cy.get("[data-original-title=\"Add to Wish List\"]").click()

        // verify add item to favorites success
        popupAlertContain(' Success: You have added ')
        
        //cy.get('.alert').should('be.visible')
        //cy.should('have.text',' Success: You have added MacBook to your wish list! ')
    })
    
    it('tc014 : Add Item to favorites without login',() => {
        // click to favorite
        cy.get(':nth-child(1) > .product-thumb > .caption > h4 > a').click()
        cy.get("[data-original-title=\"Add to Wish List\"]").click()

        // verify add item to favorites success
        popupAlertContain(' You must ')
    })
    
    it('tc015 : View Items in favorites',() => {
        // login success
        cy.goToLoginFromHome()
        loginWithEmailandPassword(testData.validEmail,testData.validPassword)
        cy.get('h1 > a').click()

        // View Items in favorites
        cy.get('#wishlist-total').click()

        // verify item to favorites success
        cy.get('h2').should('be.visible')
        cy.get('#content').should('be.visible')
        cy.get('.table-responsive').should('be.visible')
    })
   
    it('tc016 : Remove Item from favorites',() => {
        // login success
        //cy.goToLoginFromHome()
        loginWithEmailandPassword(testData.validEmail,testData.validPassword)
        //loginWithEmailandPassword(testData.validEmail,testData.validPassword)
        cy.get('h1 > a').click()

        // view Items in favorites
        cy.get('#wishlist-total').click()

        // remove Item
        cy.get(':nth-child(1) > :nth-child(6) > .btn-danger').click()

        // verify add item to favorites success
        cy.get('h2').should('be.visible')
        cy.get('#content > p').should('have.text','Your shopping cart is empty!')
        cy.get('#content').should('be.visible')
    })
})
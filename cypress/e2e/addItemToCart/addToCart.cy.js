import testData from '../loginData.json'

describe('Add item to cart',() => {
    beforeEach(() => {
        // home page
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
    })
    it('tc017 : Add to cart after successful login',() => {
        cy.goToLoginFromHome()
        cy.loginWithEmailandPassword(testData.validEmail,testData.validPassword)
        cy.get('h1 > a').click()

        // add item to cart
        cy.get("[onclick=\"cart.add('43');\"]").click()
        
        // verify add item to cart success
        //cy.popupAlert( Success: You have added MacBook to your shopping cart!)
    })
    it('tc0018 : Add item to cart without login',() => {
        // add item to cart
        cy.get("[onclick=\"cart.add('43');\"]").click()

        // verify add item to cart success
    })
    it.only('tc019 : View Items in Cart',() => {
        // add item to cart
        cy.get("[onclick=\"cart.add('43');\"]").click()
        cy.get("[onclick=\"cart.add('40');\"]").click()

        // view Items in favorites
        cy.get('#cart-total').click()
        cy.get('[href="http://opencart.abstracta.us:80/index.php?route=checkout/cart"] > strong').click()
        //cy.get('.fa.fa-shopping-cart').click()
    })
})
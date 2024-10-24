import testData from '../loginData.json'

describe('add item to favorites',() => {
    beforeEach(() => {
        // home page
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
    })
    it('tc013 : Add Item to favorites after successful login',() => {
        // login success
        cy.goToLoginFromHome()
        cy.loginWithEmailandPassword(testData.validEmail,testData.validPassword)
        cy.get('h1 > a').click()

        // click to favorite
        cy.get(':nth-child(1) > .product-thumb > .caption > h4 > a').click()
        cy.get("[data-original-title=\"Add to Wish List\"]").click()

        // verify add item to favorites success
        cy.get('.alert')
        //cy.should('have.text',' Success: You have added MacBook to your wish list! ')
    })
    it('tc014 : Add Item to favorites without login',() => {
        // click to favorite
        cy.get(':nth-child(1) > .product-thumb > .caption > h4 > a').click()
        cy.get("[data-original-title=\"Add to Wish List\"]").click()

        // verify add item to favorites success
        cy.get('.alert')
        // เช็ค text
    })
    it('tc015 : View Items in favorites',() => {
        // login success
        cy.goToLoginFromHome()
        cy.loginWithEmailandPassword(testData.validEmail,testData.validPassword)
        cy.get('h1 > a').click()

        // View Items in favorites
        cy.get('#wishlist-total').click()

        // verify add item to favorites success
        cy.get('#content')
    })
    it('tc016 : Remove Item from favorites',() => {
        // login success
        cy.goToLoginFromHome()
        cy.loginWithEmailandPassword(testData.validEmail,testData.validPassword)
        cy.get('h1 > a').click()

        // view Items in favorites
        cy.get('#wishlist-total').click()

        // remove Item
        cy.get(':nth-child(1) > :nth-child(6) > .btn-danger').click()

        // verify add item to favorites success
       
    })
})
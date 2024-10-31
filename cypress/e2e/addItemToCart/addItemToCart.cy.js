import testData from '../loginData.json'

describe('Add item to cart',() => {
    beforeEach(() => {
        // home page
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
    })
    it('tc017 : Add to cart after successful login',() => {
        // login
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
        //
    })
    it('tc019 : View Items in Cart',() => {
        // add item to cart
        cy.get('.nav > :nth-child(4) > a').click()
        cy.get("[onclick=\"cart.add('49', '1');\"]").click()

        // view Items in favorites
        cy.get('.btn-inverse').click()
        cy.get(':nth-child(4) > a > .fa').click()

        // verify view Items in cart
        cy.get('#content > h1').should('be.visible')
        //have text
    })
    it('tc020 : Remove Item from Cart',() => {
        // add item to cart
        cy.get('.nav > :nth-child(4) > a').click()
        cy.get("[onclick=\"cart.add('49', '1');\"]").click()

        // view Items in cart
        cy.get('.btn-inverse').click()
        cy.get(':nth-child(4) > a > .fa').click()

        // remove Item from cart
        cy.get('.input-group-btn > .btn-danger').click()

        // verify remove Item from cart
        cy.get('#content > h1').should('be.visible')
        cy.get('#content > p').should('be.visible')
    })
})
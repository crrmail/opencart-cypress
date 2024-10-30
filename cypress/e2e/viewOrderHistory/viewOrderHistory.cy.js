import addItemToCart from '../util'

describe('View Order History',() => {
    beforeEach(() => {
        // home page
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
    })
    it('tc032 : View Order History', () => {
        // add item to cart
        addItemToCart()
    })
})

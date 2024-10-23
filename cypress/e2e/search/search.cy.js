describe('search',() => {
    beforeEach(() => {
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
    })
    it('tc010 : Search for a product with valid keyword', () => {
        // search product
        cy.searchProduct('Iphone')

        // verify search result
        cy.get('#content > h1').should('be.visible')
        cy.get('#content > h1').should('have.text','Search - Iphone')
        cy.get('.img-responsive').should('be.visible')
    })
    it('tc011 : Search for a product with partial keyword',() => {
        // search product
        cy.searchProduct('Iph')

        // verify search result
        cy.get('#content > h1').should('be.visible')
        cy.get('#content > h1').should('have.text','Search - Iph')
        cy.get('.img-responsive').should('be.visible')
    })
    it.only('tc012 : Search for a product with categories',() => {
        // search product
        cy.get('.input-group-btn > .btn').click()
        cy.get('#content > .row > :nth-child(2)').click()

    })
})
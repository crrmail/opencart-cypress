import testData from '../loginData.json'

describe('add item favorit',() => {
    beforeEach(() => {
        cy.visit('https://opencart.abstracta.us/index.php?route=common/home')
        cy.get('.list-inline > .dropdown > .dropdown-toggle').click()
        cy.get('.dropdown-menu > :nth-child(2) > a').click()
    })
    it('tc013',() => {
        // login success
        cy.loginWithEmailandPassword(testData.validEmail,testData.validPassword)
        cy.get('h1 > a').click()

        // clicl to favorit
        //cy.get('data-original-title="Add to Wish List"').click()

        // verify add item favorit success
        //cy.get('.alert').should('(have.text),('Success: You have added')')

    })
})
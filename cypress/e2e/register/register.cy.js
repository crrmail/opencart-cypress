import { uuidv7 } from "uuidv7";

describe('register', () => {
    beforeEach (() => {
        cy.visit('https://opencart.abstracta.us/')
    })


    it('test case 1 : registration with valid details, registeration when valid details should success', () => {
        //cy.visit('https://opencart.abstracta.us/')
        cy.get('.dropdown > .dropdown-toggle > .fa').click()
        cy.get('.dropdown-menu > :nth-child(1) > a').click()
        cy.get('#input-firstname').type('Name')
        cy.get('#input-lastname').type('Lastname')
        
        const uniqueEmailPrefix = uuidv7()
        cy.get('#input-email').type(uniqueEmailPrefix + '@email.com')

        cy.get('#input-telephone').type('0912345678')
        cy.get('#input-password').type('12345678')
        cy.get('#input-confirm').type('12345678')
        cy.get('.col-sm-10 > :nth-child(2) > input').click()
        cy.get('[type="checkbox"]').click()
        cy.get('.pull-right > .btn').click()
        //const submitButton = cy.get('.pull-right > .btn')
        //submitButton.click()
        
        cy.url().should('eq','http://opencart.abstracta.us/index.php?route=account/success')


    })
    it('Test case 2 : registration fails with duplicate details', () => {
        cy.get('.dropdown > .dropdown-toggle > .fa').click()
        cy.get('.dropdown-menu > :nth-child(1) > a').click()
        cy.get('#input-firstname').type('Name')
        cy.get('#input-lastname').type('Lastname')
        cy.get('#input-email').type('register001@email.com')
        cy.get('#input-telephone').type('0912345678')
        cy.get('#input-password').type('12345678')
        cy.get('#input-confirm').type('12345678')
        cy.get('.col-sm-10 > :nth-child(2) > input').click()
        cy.get('[type="checkbox"]').click()
        cy.get('.pull-right > .btn')


    })
})
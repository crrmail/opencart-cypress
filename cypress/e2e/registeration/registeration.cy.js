import { uuidv7 } from "uuidv7";

describe('register', () => {
    beforeEach (() => {
        cy.visit('https://opencart.abstracta.us/')
    })

    it('test case 1 : registeration when valid data should success', () => {
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
        
        // New Page for success
        cy.url().should('eq','http://opencart.abstracta.us/index.php?route=account/success')
        cy.get('#content > h1').should('be.visible')
        cy.get('#content > h1').should('have.text','Account')



    })
    
    it('Test case 2 : registeration when invalid data should fail', () => {
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
        cy.get('.pull-right > .btn').click()

        // pop up message alert
        cy.get('.alert').should('be.visible')
        cy.get('.alert').should('have.text',' Warning: E-Mail Address is already registered!')


    })

    it.only('Test case 3 :registeration when have null data should fail', () => {
        cy.get('.dropdown > .dropdown-toggle > .fa').click()
        cy.get('.dropdown-menu > :nth-child(1) > a').click()

        cy.get('[type="checkbox"]').click()
        cy.get('.pull-right > .btn').click()

        // message alert
        cy.get(':nth-child(3) > .col-sm-10 > .text-danger').should('be.visible')
        cy.get(':nth-child(3) > .col-sm-10 > .text-danger').should('have.text','First Name must be between 1 and 32 characters!')
        cy.get(':nth-child(4) > .col-sm-10 > .text-danger').should('be.visible')
        cy.get(':nth-child(4) > .col-sm-10 > .text-danger').should('have.text','Last Name must be between 1 and 32 characters!')
        cy.get(':nth-child(5) > .col-sm-10 > .text-danger').should('be.visible')
        cy.get(':nth-child(5) > .col-sm-10 > .text-danger').should('have.text','E-Mail Address does not appear to be valid!')
        cy.get(':nth-child(6) > .col-sm-10 > .text-danger').should('be.visible')
        cy.get(':nth-child(6) > .col-sm-10 > .text-danger').should('have.text','Telephone must be between 3 and 32 characters!')
        cy.get(':nth-child(2) > .has-error > .col-sm-10 > .text-danger').should('be.visible')
        cy.get(':nth-child(2) > .has-error > .col-sm-10 > .text-danger').should('have.text','Password must be between 4 and 20 characters!')

    })
})
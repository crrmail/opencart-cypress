const checkoutWithGuestUser = () => {
    // add item to cart
    addItemToCart()

    // checkout
    cy.get(':nth-child(4) > a > .fa').click()
    cy.get('.pull-right > .btn').click()

    // select Guest Checkout
    cy.get(':nth-child(4) > label > input').click()
    cy.get('#button-account').click()
}

const addItemToCart = () => {
    cy.get(':nth-child(7) > a').click()
    cy.get("[onclick=\"cart.add('30', '1');\"]").click()
    cy.get('#input-option226').select('Red')
    cy.get('#button-cart').click()
}

const popupMessageErrorAlertInvalidEmailPassword = () => {
    cy.get('.alert').should('be.visible')
    cy.get('.alert').should('have.text',' Warning: No match for E-Mail Address and/or Password.')
}

const personalInfo2 = () => {
    cy.get('#input-payment-firstname').type('David')
    cy.get('#input-payment-lastname').type('Roger')
    cy.get('#input-payment-email').type('david@email.com')
    cy.get('#input-payment-telephone').type('0912223333')
    cy.get('#input-payment-address-1').type('199 Bangna Tai')
    cy.get('#input-payment-city').type('Bangna')
    cy.get('#input-payment-postcode').type('10900')
    cy.get('#input-payment-country').select('Thailand')
    cy.get('#input-payment-zone').select('Bangkok')
}

const personalInfo3 = () => {
    cy.get('#input-shipping-firstname').type('David')
    cy.get('#input-shipping-lastname').type('Roger')
    cy.get('#input-shipping-address-1').type('199 Bangna Tai')
    cy.get('#input-shipping-city').type('Bangna')
    cy.get('#input-shipping-postcode').type('10900')
    cy.get('#input-shipping-country').select('Thailand')
    cy.get('#input-shipping-zone').select('Bangkok')
}


const submitFormwithUncheck = () => {
    // add and checkout item
    checkoutWithGuestUser()

    // Personal info step 2
    personalInfo2()

    // Uncheck “My delivery and billing addresses are the same”
    cy.get('.checkbox > label > input').click()

    // Submit Form
    cy.get('#button-guest').click()
}



export default {
    checkoutWithGuestUser,
    addItemToCart,
    popupMessageErrorAlertInvalidEmailPassword,
    personalInfo2,
    personalInfo3,
    submitFormwithUncheck,
    personalInfo3
}


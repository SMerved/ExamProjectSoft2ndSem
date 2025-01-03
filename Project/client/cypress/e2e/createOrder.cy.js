describe('template spec', () => {
    it('passes', () => {
        cy.intercept('GET', '/restaurants').as('getRestaurants'); // Replace with your actual API endpoint
        cy.intercept('POST', '/createOrder').as('createOrder'); // Replace with your actual API endpoint

        cy.visit('http://localhost:5173/');

        cy.get('#username').type('Abejægeren');
        cy.get('#password').type('test123');
        cy.get('#cy_loginButton').click();
        cy.wait('@getRestaurants');
        cy.get('#cy_restaurantSelect').select(1);
        cy.get('#cy_addToCartButton').click().click().click();
        cy.get('#cy_proceedToPaymentButton').click();
        cy.get('#cy_cardNumberInput').type('43899203');
        cy.get('#cy_payButton').click();
    });
});

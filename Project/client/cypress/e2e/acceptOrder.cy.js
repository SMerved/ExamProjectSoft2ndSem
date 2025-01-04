describe('Accept order', () => {
    it('passes', () => {
        cy.intercept('GET', '/ordersById').as('ordersById');
        cy.intercept('POST', '/createOrder').as('createOrder');

        cy.visit('http://localhost:5173/');

        cy.get('#username').type('MarioPizzaMaker');
        cy.get('#password').type('test123');
        cy.get('#cy_loginButton').click();

        cy.get('#cy_orderCard').click();

        cy.get('#cy_rejectReasonInput').type("Help, I'm a test reason!!!!");
        cy.get('#cy_rejectButton').click();
    });
});

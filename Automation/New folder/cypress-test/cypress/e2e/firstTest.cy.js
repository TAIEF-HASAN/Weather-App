describe('My First Cypress Test', () => {
    it('Visits the Wikipedia homepage', () => {
        cy.visit('https://www.wikipedia.org/');
        cy.contains('The Free Encyclopedia').should('be.visible');
    });
});

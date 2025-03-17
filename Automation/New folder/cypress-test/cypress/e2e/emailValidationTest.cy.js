describe('Form Validation Test', () => {
    beforeEach(() => {
        cy.visit('https://www.selenium.dev/selenium/web/web-form.html'); // New test form
    });

    it('Displays errors when fields are empty', () => {
        cy.get('button').contains('Submit').click(); // Click submit without filling the form

        // Verify error messages (if applicable)
        cy.get('.invalid-feedback').should('be.visible'); // This may change based on the form
    });

    it('Successfully submits form with valid data', () => {
        cy.get('#my-text-id').type('John Doe'); // Enter name
        cy.get('#my-password').type('Password123'); // Enter password
        cy.get('button').contains('Submit').click(); // Click submit

        // Verify success (this may need adjustments based on form behavior)
        cy.contains('Received!').should('be.visible');
    });
});

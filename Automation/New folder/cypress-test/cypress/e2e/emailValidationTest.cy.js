describe('Email Validation Test', () => {
    beforeEach(() => {
        cy.visit('https://demo.automationtesting.in/Register.html'); // Open the form
    });

    it('Displays an error for an invalid email format', () => {
        cy.get('#email').type('invalid-email'); // Enter incorrect email format
        cy.get('button[type="submit"]').click(); // Click submit

        // Verify email validation error (Check if site gives error)
        cy.contains('Invalid email format').should('be.visible'); 
    });

    it('Successfully submits with a valid email', () => {
        cy.get('#email').type('validemail@example.com'); // Enter correct email
        cy.get('button[type="submit"]').click(); // Click submit

        // Verify successful form submission
        cy.contains('Thank you for registering').should('be.visible'); // Adjust message if needed
    });
});

describe('Login Form Test', () => {
    beforeEach(() => {
        cy.visit('https://practicetestautomation.com/practice-test-login/'); // Open login page
    });

    it('Successfully logs in with valid credentials', () => {
        cy.get('#username').type('student'); // Enter valid username
        cy.get('#password').type('Password123'); // Enter valid password
        cy.get('button#submit').click(); // If ID is present; // Click login button

        // Verify successful login
        cy.url().should('include', '/logged-in-successfully/');
        cy.contains('Logged In Successfully').should('be.visible');
    });

    it('Fails to log in with invalid credentials', () => {
        cy.get('#username').type('invalidUser'); // Enter invalid username
        cy.get('#password').type('wrongPass'); // Enter invalid password
        cy.get('button#submit').click(); // If ID is present // Click login button

        // Verify error message
        cy.contains('Your username is invalid!').should('be.visible');
    });
});

describe('Wikipedia Search Functionality Test', () => {
    it('Searches for Software Testing and verifies the result', () => {
        cy.visit('https://www.wikipedia.org/'); // Open Wikipedia homepage

        cy.get('input[name="search"]').type('Software Testing'); // Type "Software Testing" in the search bar
        cy.get('button[type="submit"]').click(); // Click the search button

        cy.origin('https://en.wikipedia.org', () => {
            cy.url().should('include', '/wiki/Software_testing'); // Verify URL contains "Software_testing"
            cy.contains('Software testing').should('be.visible'); // Verify the page contains the title
        });
    });
});



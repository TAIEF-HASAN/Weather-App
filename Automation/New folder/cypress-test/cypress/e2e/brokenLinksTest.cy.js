describe('Broken Links Test', () => {
    it('Checks for broken links on the page', () => {
        cy.visit('https://practicetestautomation.com/'); // Replace with any website URL

        cy.get('a').each(($link) => {
            const url = $link.prop('href'); // Get link URL

            if (url && url.startsWith('http')) { // Ensure it's a full URL
                cy.request({
                    url,
                    failOnStatusCode: false // Prevent Cypress from failing immediately on a bad status
                }).then((response) => {
                    expect(response.status).to.not.eq(404); // Expect status NOT to be 404
                });
            }
        });
    });
});

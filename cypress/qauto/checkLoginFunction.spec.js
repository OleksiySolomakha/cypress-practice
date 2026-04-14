describe('Registration new user',() => {
    beforeEach(() => {
        cy.visit('/', { 
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
        cy.login();
    })

    it('See users page and Log Out', () => {
        cy.get('a[routerlink="garage"]').should('be.visible');
        cy.get('#userNavDropdown').click();
        cy.contains('button', 'Logout').click();
    });
});
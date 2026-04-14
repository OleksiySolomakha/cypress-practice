class HomePage {

    get SignInButton() {
        return cy.get('.header_signin');
    }

    get SignUpButton() {
        return cy.get('.header_signup');
    }
    
    get GarageLinkButton() {
        return cy.get('a[routerlink="garage"]');
    }

    get LogoutLink() {
        return cy.contains('a.sidebar_btn','Log out');
    }

    open() {
        cy.visit('/', { 
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
    }
}

export default new HomePage();
describe('find elements',() => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', { 
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
    })

    it('Find all header buttons', () => {
        cy.get('a.header_logo').should('be.visible');
        cy.contains('a.btn', 'Home').should('be.visible');
        cy.contains('button', 'About').should('be.visible');
        cy.contains('button', 'Contacts').should('be.visible');
        cy.contains('button', 'Guest log in').should('be.visible');
        cy.contains('button', 'Sign In').should('be.visible');
        cy.contains('button', 'Sign up').should('be.visible');
        cy.get('iframe')
            .should('be.visible')
            .and('have.attr', 'src')
            .and('include', 'https://www.youtube.com/embed/znjjC0Iw8Wc?showinfo=0&controls=0');
    });

    it('Find all social links and their icons in footer', () => {
        cy.get('a[href="https://www.facebook.com/Hillel.IT.School"]').should('be.visible');
        cy.get('span.icon-facebook').should('be.visible');
        cy.get('a[href="https://t.me/ithillel_kyiv"]').should('be.visible');
        cy.get('span.icon-telegram').should('be.visible');
        cy.get('a[href="https://www.youtube.com/user/HillelITSchool?sub_confirmation=1"]').should('be.visible');
        cy.get('span.icon-youtube').should('be.visible');
        cy.get('a[href="https://www.instagram.com/hillel_itschool/"]').should('be.visible');
        cy.get('span.icon-instagram').should('be.visible');
        cy.get('a[href="https://www.linkedin.com/school/ithillel/"]').should('be.visible');
        cy.get('span.icon-linkedin').should('be.visible');
    })

    it('Find Hillel logos and support links in footer', () => {
        cy.get('a[href="https://ithillel.ua"]').should('be.visible');
        cy.get('a[href="mailto:developer@ithillel.ua"]').should('be.visible');
        cy.get('a.footer_logo').should('be.visible');
    });
})
let emailErrors = {
    'empty': 'Email required',
    'wrongData': 'Email is incorrect',
};
let errorsColor = 'rgb(220, 53, 69)';

//Field Name
let emailSelector = '#signupEmail';
let invalidEmails = [
    'plainaddress',
    '@domain.com',
    'user@',
    'user@domain',
    'user@domain.',
    'user@.com',
    'user@domain..com',
    'user@@domain.com',
    'user domain@com',
    'user@domain com',
    'user@domain,com',
    'user@domain..ua'
  ];

describe('Should show errors for Email field if: ',() => {
    beforeEach(() => {
        cy.visit('/', { 
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
        cy.get('.header_signin').click();
        cy.get('.modal-title').should('be.visible');
        cy.contains('button', 'Registration').click();
        cy.contains('h4','Registration');
    })

    it('field is empty', () => {
        cy.get(emailSelector).focus();
        cy.get(emailSelector).blur();
        cy.get('.invalid-feedback')
            .should('contain.text', emailErrors.empty)
            .and('css','color',errorsColor);
        cy.contains('button', 'Register')
            .should('be.disabled');
    });

    invalidEmails.forEach((email) => {
        it(`email is ${email}`, () => {
                cy.get(emailSelector).type(email);
                cy.get(emailSelector).blur();
                cy.get('.invalid-feedback')
                    .should('contain.text', emailErrors.wrongData)
                    .and('css','color',errorsColor);
                cy.contains('button', 'Register')
                    .should('be.disabled');
        });
    });
})
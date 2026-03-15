let passwordErrors = {
    'empty': 'Password required',
    'wrongData': 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
};
let errorsColor = 'rgb(220, 53, 69)';

//Field Name
let passwordSelector = '#signupPassword';
let invalidPasswords = [
    'short1A',
    'alllowercase123',
    'ALLUPPERCASE1',
    'NoNumberHere!',
    'Привіт123A!',
    'thisPasswordIsToolong12345678'
  ];

describe('Should show errors for Password field if: ',() => {
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

    it('field password is empty', () => {
        cy.get(passwordSelector).focus();
        cy.get(passwordSelector).blur();
        cy.get('.invalid-feedback')
            .should('contain.text', passwordErrors.empty)
            .and('css','color',errorsColor);
        cy.contains('button', 'Register')
            .should('be.disabled');
    });

    invalidPasswords.forEach((passw) => {
        it(`password is ${passw}`, () => {
                cy.get(passwordSelector).type(passw);
                cy.get(passwordSelector).blur();
                cy.get('.invalid-feedback')
                    .should('contain.text', passwordErrors.wrongData)
                    .and('css','color',errorsColor);
                cy.contains('button', 'Register')
                    .should('be.disabled');
        });
    });
})
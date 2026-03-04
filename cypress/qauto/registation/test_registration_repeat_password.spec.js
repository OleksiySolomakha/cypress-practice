let rePasswordErrors = {
    'empty': 'Re-enter password required',
    'lenght': 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    'wrongData': 'Passwords do not match',
};
let errorsColor = 'rgb(220, 53, 69)';

//Field Name
let rePasswordSelector = '#signupRepeatPassword';
let passwordSelector = '#signupPassword';
let correctPass1 = 'Abcdefj1234';
let correctPass2 = 'Abcdefj5678';

let invalidPasswords = [
    'short1A',
    'alllowercase123',
    'ALLUPPERCASE1',
    'NoNumberHere!',
    'Привіт123A!',
    'thisPasswordIsToolong12345678'
  ];

describe('Should show errors for Re-password field if: ',() => {
    beforeEach(() => {
        cy.visit('https://qauto.forstudy.space/', { 
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

    it('should be the same', () => {
        cy.get(passwordSelector).type(correctPass1);
        cy.get(passwordSelector).blur();
        cy.get('.invalid-feedback').should('not.exist');
        cy.get(rePasswordSelector).type(correctPass2);
        cy.get(rePasswordSelector).blur();
        cy.get('.invalid-feedback')
            .should('contain.text', rePasswordErrors.wrongData)
            .and('css','color',errorsColor);
        cy.contains('button', 'Register')
            .should('be.disabled');
    });

    it('re-password shouldn\'t be empty', () => {
        cy.get(rePasswordSelector).focus();
        cy.get(rePasswordSelector).blur();
        cy.get('.invalid-feedback')
            .should('contain.text', rePasswordErrors.empty)
            .and('css','color',errorsColor);
        cy.contains('button', 'Register')
            .should('be.disabled');
    })

    invalidPasswords.forEach((passw) => {
        it(`re-enter password is ${passw}`, () => {
                cy.get(rePasswordSelector).type(passw);
                cy.get(rePasswordSelector).blur();
                cy.get('.invalid-feedback')
                    .should('contain.text', rePasswordErrors.lenght)
                    .and('css','color',errorsColor);
                cy.contains('button', 'Register')
                    .should('be.disabled');
        });
    });
})
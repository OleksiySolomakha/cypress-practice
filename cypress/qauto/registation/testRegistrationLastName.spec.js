let lastNameErrors = {
    'empty': 'Last name is required',
    'wrongData': 'Last name is invalid',
    'lenght': 'Last name has to be from 2 to 20 characters long'
};
let errorsColor = 'rgb(220, 53, 69)';

//Field Name
let lastNameSelector = '#signupLastName';
let invalidNames = [
    '佐藤 健',
    'Словʼян',
    '  Iner',
    // function trim doesn't work on frontend, need to chek on backend
    'After  ',
    'NameWithsolongnametestorsomething',
    'B',
    342
];

describe('Should show errors for Last Name field if: ',() => {
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

    it('last name is empty', () => {
        cy.get(lastNameSelector).focus();
        cy.get(lastNameSelector).blur();
        cy.get('.invalid-feedback')
            .should('contain.text', lastNameErrors.empty)
            .and('css','color',errorsColor);
        cy.contains('button', 'Register')
            .should('be.disabled');
    });

    invalidNames.forEach((name) => {
        it(`last name is ${name}`, () => {
            if(name.length == 1 || name.length > 20) {
                cy.get(lastNameSelector).type(name);
                cy.get(lastNameSelector).blur();
                cy.get('.invalid-feedback')
                    .should('contain.text', lastNameErrors.lenght)
                    .and('css','color',errorsColor);
                cy.contains('button', 'Register')
                    .should('be.disabled');
            } else if(typeof name === 'number') {
                cy.get(lastNameSelector).type(name);
                cy.get(lastNameSelector).blur();
                cy.get('.invalid-feedback')
                    .should('contain.text', lastNameErrors.wrongData)
                    .and('css','color',errorsColor);
                cy.contains('button', 'Register')
                    .should('be.disabled');
            } else {
                cy.get(lastNameSelector).type(name);
                cy.get(lastNameSelector).blur();
                cy.get('.invalid-feedback')
                    .should('contain.text', lastNameErrors.wrongData)
                    .and('css','color',errorsColor);
                cy.contains('button', 'Register')
                    .should('be.disabled');
            }
        });
    });
})
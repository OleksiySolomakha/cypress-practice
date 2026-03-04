let nameErrors = {
    'empty': 'Name is required',
    'wrongData': 'Name is invalid',
    'lenght': 'Name has to be from 2 to 20 characters long'
};
let errorsColor = 'rgb(220, 53, 69)';

//Field Name
let nameSelector = '#signupName';
let invalidNames = [
    '佐藤',
    'Іван',
    '  Space',
    // function trim doesn't work on frontend, need to chek on backend
    'Space  ',
    'ahahaWithsolongnametestorsomething',
    'A',
    123
];

describe('Should show errors for Name field if: ',() => {
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

    it('field is empty', () => {
        cy.get(nameSelector).focus();
        cy.get(nameSelector).blur();
        // On site this error looks incorrect "Name required"
        cy.get('.invalid-feedback')
            .should('contain.text', nameErrors.empty)
            .and('css','color',errorsColor);
        cy.contains('button', 'Register')
            .should('be.disabled');
    });

    invalidNames.forEach((name) => {
        it(`name is ${name}`, () => {
            if(name.length < 2 || name.length > 20) {
                cy.get(nameSelector).type(name);
                cy.get(nameSelector).blur();
                cy.get('.invalid-feedback')
                    .should('contain.text', nameErrors.lenght)
                    .and('css','color',errorsColor);
                cy.contains('button', 'Register')
                    .should('be.disabled');
            } else if(typeof name === 'number') {
                cy.get(nameSelector).type(name);
                cy.get(nameSelector).blur();
                cy.get('.invalid-feedback')
                    .should('contain.text', nameErrors.wrongData)
                    .and('css','color',errorsColor);
                cy.contains('button', 'Register')
                    .should('be.disabled');
            } else {
                cy.get(nameSelector).type(name);
                cy.get(nameSelector).blur();
                cy.get('.invalid-feedback')
                    .should('contain.text', nameErrors.wrongData)
                    .and('css','color',errorsColor);
                cy.contains('button', 'Register')
                    .should('be.disabled');
            }
        });
    });
})
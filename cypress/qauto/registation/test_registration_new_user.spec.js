const timestamp = Date.now();
let firstName = 'Alexios';
let lastName = 'Solo';
let newTestEmail = `solomakhaoleksiy+os1_${timestamp}@gmail.com`;
let password = '12345ABCDEf';

let nameSelector = '#signupName';
let lastNameSelector = '#signupLastName';
let emailSelector = '#signupEmail';
let passwordSelector = '#signupPassword';
let rePasswordSelector = '#signupRepeatPassword';

describe('Registration new user',() => {
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

    it('should create new user with valid parameters', () => {
        cy.get(nameSelector).type(firstName);
        cy.get(lastNameSelector).type(lastName);
        cy.get(emailSelector).type(newTestEmail);
        cy.get(passwordSelector).type(password);
        cy.get(rePasswordSelector).type(password);

        cy.contains('button', 'Register').click();

        cy.get('a[routerlink="garage"]').should('be.visible');
        cy.get('#userNavDropdown').click();
        cy.contains('button', 'Logout').click();
    });
});
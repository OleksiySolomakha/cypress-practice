let startMiles = 1234;
let runMiles = 432;
let liters = 15;
let price = 100;

describe('Create a new car for user',() => {
    beforeEach(() => {
        cy.visit('/', { 
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
        cy.login();
    });

    it('Create car', () => {
        cy.createCarBMW(startMiles);
    });

    it('Added fuel expense for created car', () => {
        cy.addBMWFuelExpense(runMiles, liters, price);
    });

    it('Check delete created car', () => {
        cy.returnToGarage();
        cy.deleteCreatedCar();
    });

    it('See users page and Log Out', () => {
        cy.get('a[routerlink="garage"]').should('be.visible');
        cy.get('#userNavDropdown').click();
        cy.contains('button', 'Logout').click();
    });
});
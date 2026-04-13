let startMiles = 1234;
let runMiles = 1235;
let liters = 15;
let price = 100;

describe('Check adding fuel expenses to new car',() => {
    before(() => {
        cy.visit('/', { 
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        })
        cy.login();
    });

    it('Add fuel expenses for a car', () => {
        cy.createCarBMW(startMiles);
        cy.addBMWFuelExpense(runMiles, liters, price);
        cy.returnToGarage();

        cy.deleteCreatedCar();

        cy.get('a[routerlink="garage"]').should('be.visible');
        cy.get('#userNavDropdown').click();
        cy.contains('button', 'Logout').click();
    });
});
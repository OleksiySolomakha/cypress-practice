import HomePage from '../pom/pages/HomePage';

let startMiles = 1234;
let runMiles = 1235;
let liters = 15;
let price = 100;

describe('Check adding fuel expenses to new car',() => {
    before(() => {
        HomePage.open();
        cy.login();
    });

    it('Add fuel expenses for a new car', () => {
        cy.createCarBMW(startMiles);
        cy.addBMWFuelExpense(runMiles, liters, price);
        cy.returnToGarage();

        cy.deleteCreatedCar();

        HomePage.GarageLinkButton.should('be.visible');
        HomePage.LogoutLink.click();
    });
});
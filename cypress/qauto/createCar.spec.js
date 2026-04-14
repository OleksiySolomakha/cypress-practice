import HomePage from '../pom/pages/HomePage';

let startMiles = 1234;

describe('Create a new car for user',() => {
    before(() => {
        HomePage.open();
        cy.login();
    });

    it('Create and delete a new car, BMW for example', () => {
        cy.createCarBMW(startMiles);

        cy.deleteCreatedCar();

        HomePage.GarageLinkButton.should('be.visible');
        HomePage.LogoutLink.click();
    });
});
import HomePage from '../../pom/pages/HomePage';

let startMiles = 1234;

describe('Create a new car for user',() => {
    before(() => {
        HomePage.open();
        cy.login();
    });

    it('Create and delete a new car, BMW for example', () => {

        let newCarBMW;

        cy.intercept('POST', 'https://qauto.forstudy.space/api/cars').as('newCar');
        cy.createCarBMW(startMiles);

        cy.wait('@newCar').then((interception) => {
            newCarBMW = interception.response.body.data.id;
        
            cy.request({
                method: 'DELETE',
                url: `https://qauto.forstudy.space/api/cars/${newCarBMW}`
            }).then((resp) => {
                expect(resp.status).to.eq(200);
        
                let deletedCar = resp.body.data.carId;
                expect(deletedCar).to.be.a('number');
            })
        })

        // cy.deleteCreatedCar();

        HomePage.GarageLinkButton.should('be.visible');
        HomePage.LogoutLink.click();
    });

    
});
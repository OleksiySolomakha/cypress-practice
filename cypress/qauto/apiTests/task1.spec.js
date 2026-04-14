import HomePage from '../../pom/pages/HomePage';

let cardId = 503474;
let expenseRequestCar = 504098;

describe('Check API requests for Expenses page',() => {

    beforeEach(() => {
        HomePage.open();
        cy.login();
    });

    it('GET current user data', () => {
        cy.request({
            method: 'GET',
            url: 'https://qauto.forstudy.space/api/users/current'
        }).then((response) => {
            expect(response.status).to.eq(200);
            let user = response.body.data;
            expect(user.userId).to.be.a('number');
            expect(user.distanceUnits).to.be.an('string');
            expect(user.currency).to.be.an('string');
            expect(user.photoFilename).to.be.an('string');
        })
    })

    it('POST create car', () => {
        cy.request({
            method: 'POST',
            url: 'https://qauto.forstudy.space/api/cars',
            body: {
                "carBrandId": 1,
                "carModelId": 1,
                "mileage": 122
            }
        }).then((response) => {
            expect(response.status).to.eq(201);
            let carNew = response.body.data;
            cardId = carNew.id;

            expect(carNew.id).to.be.a('number');
            expect(carNew.carBrandId).to.be.a('number');
            expect(carNew.carModelId).to.be.a('number');
            expect(carNew.initialMileage).to.be.a('number');
            expect(carNew.updatedMileageAt).to.be.a('string');
            expect(carNew.carCreatedAt).to.be.a('string');
            expect(carNew.mileage).to.be.a('number');
            expect(carNew.brand).to.be.a('string');
            expect(carNew.model).to.be.a('string');
            expect(carNew.logo).to.be.a('string');
        })
    })

    it('Get all cars for my user', () => {
        cy.request({
            method: 'GET',
            url: 'https://qauto.forstudy.space/api/cars'
        }).then((response) => {
            expect(response.status).to.eq(200);
            let carsData = response.body.data[0];
            expect(carsData.brand).to.be.an('string');
            expect(carsData.carBrandId).to.be.a('number');
            expect(carsData.carCreatedAt).to.be.an('string');
            expect(carsData.carModelId).to.be.a('number');
            expect(carsData.id).to.be.a('number');
            expect(carsData.initialMileage).to.be.a('number');
            expect(carsData.logo).to.be.an('string');
            expect(carsData.mileage).to.be.a('number');
            expect(carsData.model).to.be.an('string');
            expect(carsData.updatedMileageAt).to.be.an('string');
        })
    });

    it('GET all car list for check expenses, and check it length', () => {
        cy.request({
            method: 'GET',
            url: 'https://qauto.forstudy.space/api/expenses'
        }).then((response) => {
            expect(response.status).to.eq(200);
            let carArray = response.body.data;
            expect(carArray).to.be.an('array');
            expect(carArray.length).to.eq(10);
        });
    });

    it('GET car expenses by cardId parameter and check body', () => {
        cy.request({
            method: 'GET',
            url: 'https://qauto.forstudy.space/api/expenses?carId=503474&page=1'
        }).then((response) => {
            expect(response.status).to.eq(200);
            let firstCarInArray = response.body.data[0];
            expect(firstCarInArray.carId).to.be.a('number');
            expect(firstCarInArray.id).to.be.a('number');
            expect(firstCarInArray.liters).to.be.a('number');
            expect(firstCarInArray.mileage).to.be.a('number');
            expect(firstCarInArray.reportedAt).to.be.a('string');
            expect(firstCarInArray.totalCost).to.be.a('number');
        });
    });
});
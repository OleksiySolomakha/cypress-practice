// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (userEmail = Cypress.env('userEmail') || 'solomakhaoleksiy+os1@gmail.com', userPassword = Cypress.env('userPassword') || 'ValidPass1234') => {
    
    cy.get('.header_signin').click();
    cy.get('.modal-title').should('be.visible');

    cy.get('#signinEmail').type(userEmail);
    cy.get('#signinPassword').type(userPassword, { sensitive: true });
    cy.contains('button', 'Login').click();
    cy.get('h1').contains('Garage')
})

Cypress.Commands.add('createCarBMW', (miles = 123) => {
    
  cy.contains('button', 'Add car').click();
  cy.get('.modal-title').contains('Add a car');
  cy.get('select[addCarBrand]', { timeout: 1000 }).select('BMW').should('have.value', '1: 2');
  cy.get('select[addCarModel]', { timeout: 1000 }).select('3').should('have.value', '5: 6');
  cy.get('#addCarMileage').fill(miles);

  cy.contains('button', 'Add').click();
  cy.get('.car_name h2').contains('BMW 3');
})

Cypress.Commands.add('addBMWFuelExpense', (miles = 100000, liters = 15, literPrice = 81.89) => {
    
  cy.contains('button', 'Add fuel expense').click();
  cy.get('.modal-title').contains('Add an expense');
  cy.get('#addExpenseMileage', { timeout: 1000 }).fill(miles);
  cy.get('#addExpenseLiters', { timeout: 1000 }).fill(liters);
  cy.get('#addExpenseLiters', { timeout: 1000 }).fill(literPrice);

  cy.contains('button', 'Add').click();
  cy.get('h1').contains('Fuel expenses');
  cy.contains(miles);
  cy.contains(liters);
  cy.contains(literPrice);
})

Cypress.Commands.add('returnToGarage', () => {
  cy.contains('a[href="/panel/garage"]').click();
  cy.get('h1').contains('Garage');
})

Cypress.Commands.add('deleteCreatedCar', () => {
  cy.get('button .car_edit').click();
  cy.get('.modal-title').contains('Edit a car');
  cy.contains('button', 'Remove car').click();

  cy.get('.modal-title').contains('Remove car');
  cy.contains('button', 'Remove').click();

  cy.get('h1').contains('Garage')
  cy.get('button .car_edit').should('not.exist');
})

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
      // turn off original log
      options.log = false
      // create our own log with masked message
      Cypress.log({
        $el: element,
        name: 'type',
        message: '*'.repeat(text.length),
      })
    }
  
    return originalFn(element, text, options)
  })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
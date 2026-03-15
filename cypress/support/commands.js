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
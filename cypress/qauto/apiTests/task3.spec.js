import HomePage from '../../pom/pages/HomePage';
import ProfilePage from '../../pom/pages/ProfilePage';

let realName = 'Ole';
let reallastName = 'Ksiy';
let fakeName = 'Cab';
let fakeLastName = 'Swonson';

let userProfileData = {
    "status": "ok",
    "data": {
        "userId": 338540,
        "photoFilename": "default-user.png",
        "name": fakeName,
        "lastName": fakeLastName
    }
}

describe('Check API requests for Expenses page',() => {

    before(() => {
        HomePage.open();
        cy.login();
    });

    it('Open profile page', () => {
        cy.intercept('GET','https://qauto.forstudy.space/api/users/profile', userProfileData);
        
        HomePage.ProfileLink.click();

        ProfilePage.getProfileName().contains(fakeName).should('be.visible');
        ProfilePage.getProfileName().contains(fakeLastName).should('be.visible');

        ProfilePage.getProfileName().contains(realName).should('not.exist');
        ProfilePage.getProfileName().contains(reallastName).should('not.exist');

        HomePage.LogoutLink.click();
    });
});
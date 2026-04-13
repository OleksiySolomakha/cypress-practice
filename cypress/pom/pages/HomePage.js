class HomePage {
    constructor() {
        this.homePageUrl = 'https://qauto.forstudy.space/';
    }

    open() {
        cy.visit(this.homePageUrl);
    }
}

export default HomePage;
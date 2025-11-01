const { randomData } = require('../helper/helper');

describe('contact us section', () => {

    beforeEach(() => {
        cy.visit('https://automationexercise.com/')
        cy.get('.shop-menu ul li').filter(':contains(" Contact us")').click()
    });

    it('file uploading', () => {
        cy.get('[data-qa="name"]').type(randomData().name)
        cy.get('[data-qa="email"]').type(randomData().email)
        cy.get('[data-qa="subject"]').type('file uploading test')
        cy.get('textarea#message').type('help me')
        cy.get('[name="upload_file"]').selectFile('./tests/fixture/fileUploadingTestFile.txt')
        cy.get('[data-qa="submit-button"]').click()
        cy.get('.contact-form div.status').should('have.text','Success! Your details have been submitted successfully.')
    });
});
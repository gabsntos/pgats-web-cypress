import signUpAndLogInPage from '../../modules/login/signUpAndLogInPage'
import accountInformationPage from '../../modules/cadastro/accountInformationPage';
import menuPage from '../../modules/menu/menuPage';
import productsPage from '../../modules/products/productsPage';
const { randomData } = require('../helper/helper');

beforeEach(() => {
    cy.visit('https://automationexercise.com/')
});

describe('Sign up and log in', () => {

    beforeEach(() => {
        menuPage.selectMenuOption('Signup / Login')
    });

    it('Register User', () => {
        signUpAndLogInPage.performSignUp(randomData().name, randomData().email)
        accountInformationPage.selectTitle()
        accountInformationPage.enterPassword(randomData().password)
        accountInformationPage.selectDOB('10', '12', '1997')
        accountInformationPage.toggleNewsletter()
        accountInformationPage.toggleOptin()
        accountInformationPage.enterPersonalDetails()
        accountInformationPage.submitCreateAccount()
        cy.get('[data-qa="account-created"]').should('have.text', 'Account Created!')
    });

    it('Login User with correct email and password', () => {
        signUpAndLogInPage.performLogIn('dus@kivueta.so', '1698477565')
        cy.get('.shop-menu ul li').filter(':contains(" Logged in as ")').get('b').should('have.text', 'Randall Long')
    });

    it('Login User with incorrect email and password', () => {
        signUpAndLogInPage.performLogIn(randomData().email, randomData().password)
        cy.get('[action="/login"] p').should('have.text', 'Your email or password is incorrect!')
    });

    it('Logout User', () => {
        signUpAndLogInPage.performLogIn('dus@kivueta.so', '1698477565')
        signUpAndLogInPage.performLogOut()
        cy.get('.shop-menu ul li').should(($lis) => {
            expect($lis, '8 items').to.have.length(8)
        })
        cy.get('.shop-menu ul li').filter(':contains(" Signup / Login")').should('have.text', ' Signup / Login')
    });

    it('Register User with existing email', () => {
        signUpAndLogInPage.performSignUp(randomData().name, 'dus@kivueta.so')
        cy.get('[action="/signup"] p').should('have.text', 'Email Address already exist!')
    });

    it('Place Order: Register before Checkout', () => {
        cy.performSignUp()
        cy.contains('Continue').click()
        cy.get('@userName').then(loggedUserName => {
            cy.get('.shop-menu ul li').filter(':contains(" Logged in as ")').get('b').should('have.text', loggedUserName)
        })
        cy.get('.features_items .productinfo a').first().click()
        menuPage.selectMenuOption('Cart')
        cy.get('#cart_info_table').should('be.visible')
        cy.contains('Proceed To Checkout').click()
        cy.get('@userDetails').then(u => {
            cy.get('#address_delivery li').should($lis => {
                expect($lis, '8 items').to.have.length(8)
                expect($lis.eq(0)).to.contain('Your delivery address')
                expect($lis.eq(1)).to.contain(`${u.userFirstName} ${u.userLastName}`)
                expect($lis.eq(2)).to.contain(u.userCompany)
                expect($lis.eq(3)).to.contain(u.userAddress1)
                expect($lis.eq(4)).to.contain(u.userAddress2)
                expect($lis.eq(6)).to.contain(u.userCountry)
                expect($lis.eq(7)).to.contain(u.userPhone)
            })
        })
        cy.get('textarea.form-control').type(randomData().text)
        cy.contains('Place Order').click()
        cy.get('input[data-qa="name-on-card"]').type(randomData().name)
        cy.get('input[data-qa="card-number"]').type(randomData().creditCard)
        cy.get('[data-qa="cvc"]').type('123')
        cy.get('[data-qa="expiry-month"]').type('12')
        cy.get('[data-qa="expiry-year"]').type('123')
        cy.contains('Pay and Confirm Order').click()
        cy.get('#form').should('contain.text', 'Order Placed!')
        menuPage.selectMenuOption('Delete Account')
        cy.get('#form').should('contain.text', 'Account Deleted!')

    });
});

describe('Test cases page', () => {

    beforeEach(() => {
        menuPage.selectMenuOption('Test Cases')
    });

    it('Verify test cases page', () => {
        cy.get('.panel-title u').should(($lis) => {
            expect($lis, '26 items').to.have.length(26)
            expect($lis.eq(0), 'first item').to.contain('Register User')
            expect($lis.eq(1), 'second item').to.contain('Login User with correct email and password')
            expect($lis.eq(2), 'third item').to.contain('Login User with incorrect email and password')
        })
    })
})

describe('Products and product detail page', () => {

    beforeEach(() => {
        menuPage.selectMenuOption('Products')
    });

    it('Verify All Products and product detail page', () => {
        cy.get('h2').contains('All Products').closest('div.features_items').should('contain.text', 'Add to cart')
        cy.get('h2').contains('All Products').closest('div.features_items').contains('View Product').click()
        cy.get('.product-information h2').should('have.text', 'Blue Top')
    })

    it('Search Product', () => {
        productsPage.searchProduct('fancy green top')
        cy.get('.features_items .productinfo p').should('have.text', 'Fancy Green Top')
    })

})

describe('Home page', () => {

    beforeEach(() => {
        menuPage.selectMenuOption('Home')
    });

    it('Verify Subscription in home page', () => {
        cy.get('footer').scrollIntoView()
        cy.get('.footer-widget h2').should('have.text', 'Subscription')
        cy.get('.footer-widget #susbscribe_email').type('cypress@gmail.com')
        cy.get('.footer-widget #subscribe').click()
        cy.get('#success-subscribe').should('contain.text', 'You have been successfully subscribed!')
    })

})

describe('Contact us page', () => {

    beforeEach(() => {
        menuPage.selectMenuOption('Contact us')
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
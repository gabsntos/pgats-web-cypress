class SignUpAndLogInPage {

    performSignUp(name, email) {
        cy.get('[data-qa="signup-name"]').type(name).invoke('val').as('userName')
        cy.get('[data-qa="signup-email"]').type(email).invoke('val').as('userEmail')
        cy.get('.signup-form button').click()
        return this
    }

    performLogIn(email, pw) {
        cy.get('[data-qa="login-email"]').type(email)
        cy.get('[data-qa="login-password"]').type(pw)
        cy.get('[data-qa="login-button"]').click()
    }

    performLogOut() {
        cy.get('.shop-menu ul li').filter(':contains(" Logout")').click()
    }

}

export default new SignUpAndLogInPage()
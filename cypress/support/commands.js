import signUpAndLogInPage from "../../modules/login/signUpAndLogInPage"
import accountInformationPage from "../../modules/cadastro/accountInformationPage"
import { randomData } from "../../tests/helper/helper"
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
Cypress.Commands.add('performSignUp', () => {
    signUpAndLogInPage.performSignUp(randomData().name, randomData().email)
    accountInformationPage.selectTitle()
    accountInformationPage.enterPassword(randomData().password)
    accountInformationPage.selectDOB('10', '12', '1997')
    accountInformationPage.toggleNewsletter()
    accountInformationPage.toggleOptin()
    accountInformationPage.enterPersonalDetails()
    accountInformationPage.submitCreateAccount()
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
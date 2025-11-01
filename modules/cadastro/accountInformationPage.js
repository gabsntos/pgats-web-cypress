import { randomData } from '../../tests/helper/helper'

class AccountInformationPage {

    // Select title by exact value, e.g. 'Mr' or 'Mrs'
    selectTitle(title) {
        cy.get('.clearfix input')
            .filter((index, el) => { return el.value === 'Mr' })
            .click()
    }

    // Enter account password and store as alias @userPassword
    enterPassword(password) {
        cy.get('[data-qa="password"]').clear().type(password)
            .invoke('val').as('userPassword')
        return this
    }

    // Select date of birth
    selectDOB(day, month, year) {
        if (day) cy.get('select#days').select(String(day))
        if (month) cy.get('select#months').select(String(month))
        if (year) cy.get('select#years').select(String(year))
        return this
    }

    // Toggle newsletter subscription (true = check, false = uncheck)
    toggleNewsletter(shouldSubscribe = true) {
        const el = cy.get('input#newsletter')
        if (shouldSubscribe) el.check()
        else el.uncheck()
        return this
    }

    // Toggle special offers opt-in (true = check, false = uncheck)
    toggleOptin(shouldOptin = true) {
        const el = cy.get('input#optin')
        if (shouldOptin) el.check()
        else el.uncheck()
        return this
    }

    // Enter personal and address details. Pass only the fields you want to set.
    enterPersonalDetails({ firstName, lastName, company, address1, address2, country, state, city, zipcode, mobile_number } = {}) {
        // If the caller didn't pass any fields, use randomData() to populate defaults
        const hasAnyField = [firstName, lastName, company, address1, address2, country, state, city, zipcode, mobile_number]
            .some(v => typeof v !== 'undefined')

        let rnd
        if (!hasAnyField) {
            rnd = randomData()
            firstName = rnd.name
            lastName = rnd.name
            company = rnd.company
            address1 = rnd.address
            address2 = rnd.address
            country = 'United States'
            state = rnd.state
            city = rnd.city
            zipcode = rnd.zipcode
            mobile_number = rnd.phone
        }

        if (firstName) cy.get('input#first_name').clear().type(firstName).invoke('val').as('userFirstName')
        if (lastName) cy.get('input#last_name').clear().type(lastName).invoke('val').as('userLastName')
        if (company) cy.get('input#company').clear().type(company).invoke('val').as('userCompany')
        if (address1) cy.get('input#address1').clear().type(address1).invoke('val').as('userAddress1')
        if (address2) cy.get('input#address2').clear().type(address2).invoke('val').as('userAddress2')
        if (country) cy.get('[data-qa="country"]').select(country).invoke('val').as('userCountry')
        if (state) cy.get('input#state').clear().type(state)
        if (city) cy.get('input#city').clear().type(city)
        if (zipcode) cy.get('input#zipcode').clear().type(zipcode)
        if (mobile_number) cy.get('input#mobile_number').clear().type(mobile_number).invoke('val').as('userPhone')

        cy.then(() => {
            cy.get('@userFirstName').then(userFirstName => {
                cy.get('@userLastName').then(userLastName => {
                    cy.get('@userCompany').then(userCompany => {
                        cy.get('@userAddress1').then(userAddress1 => {
                            cy.get('@userAddress2').then(userAddress2 => {
                                cy.get('@userCountry').then(userCountry => {
                                    cy.get('@userPhone').then(userPhone => {
                                        cy.wrap({
                                            userFirstName,
                                            userLastName,
                                            userCompany,
                                            userAddress1,
                                            userAddress2,
                                            userCountry,
                                            userPhone
                                        }).as('userDetails')
                                    })
                                })
                            })
                        })

                    })
                })
            })
        })
        return this
    }

    // Submit the create account button
    submitCreateAccount() {
        cy.get('[data-qa="create-account"]').click()
        return this
    }

    // Convenience method: accepts a data object and performs the full flow
    enterAllAccountInfo(data = {}) {
        // data: { title, password, day, month, year, newsletter, optin, personalDetails }
        if (data.title) this.selectTitle(data.title)
        if (data.password) this.enterPassword(data.password)
        this.selectDOB(data.day, data.month, data.year)
        if (typeof data.newsletter !== 'undefined') this.toggleNewsletter(data.newsletter)
        if (typeof data.optin !== 'undefined') this.toggleOptin(data.optin)
        if (data.personalDetails) this.enterPersonalDetails(data.personalDetails)
        if (data.submit) this.submitCreateAccount()
        return this
    }

}

export default new AccountInformationPage()
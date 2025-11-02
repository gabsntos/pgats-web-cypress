class MenuPage {
    closeModalIfPresent() {
        // Check if modal exists and is visible
        cy.get('body').then($body => {
            if ($body.find('#cartModal.modal.show').length > 0) {
                // Close modal by clicking outside or close button
                cy.get('#cartModal .modal-content').then($modal => {
                    if ($modal.find('.close').length > 0) {
                        cy.get('#cartModal .close').click()
                    } else {
                        cy.get('body').click(0, 0) // Click outside modal
                    }
                })
                // Wait for modal to be hidden
                cy.get('#cartModal').should('not.have.class', 'show')
            }
        })
    }

    selectMenuOption(option) {
        // Close any modal that might be covering menu items
        this.closeModalIfPresent()
        
        // Try to click the menu item, with retries
        cy.get('.shop-menu ul li')
            .filter(`:contains(" ${option}")`)
            .should('be.visible')
            .click({ timeout: 10000 }) // Increase timeout and add retry
        
        return this
    }
}

export default new MenuPage()
class MenuPage {

    selectMenuOption(option) {
        cy.get('.shop-menu ul li').filter(`:contains(" ${option}")`).click()
    }

}

export default new MenuPage()
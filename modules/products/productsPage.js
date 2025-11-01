class ProductsPage {

    searchProduct(productName) {
        cy.get('#search_product').type(productName)
        cy.get('button#submit_search').click()
    }

}

export default new ProductsPage()
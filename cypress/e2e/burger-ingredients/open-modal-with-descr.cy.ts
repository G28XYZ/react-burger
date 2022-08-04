describe('Открытие/закрытие модального окна с описанием ингредиента', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  it('Открытие модального окна', function () {
    cy.get('[class^=burger-ingredients_container__]').find('li').first().as('ingredient');
    cy.get('@ingredient')
      .click()
      .then(($ingredient) => {
        cy.get($ingredient)
          .find('p')
          .last()
          .then(($name) => {
            const name = $name.text();
            cy.get('[class^=ingredient-details_modal__]').find('.name').should('have.text', name);
          });
      });
  });
  it('Закрытие модального окна', () => {
    cy.get('[class^=modal_container__]').find('[class^=modal_close__]').click();
    cy.get('#react-modals').find('div').should('have.length', 0);
  });
});

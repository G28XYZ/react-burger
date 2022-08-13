describe('Добавить ингредиент и заменить', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  it('Добавление', function () {
    cy.get('[class^=burger-ingredients_container__]').find('li').as('ingredientsList');
    cy.get('@ingredientsList').eq(3).as('thirdIngredient');

    cy.get('[class^=burger-constructor_elements__]').first().as('burgerConstructor');
    cy.get('@burgerConstructor').find('[class^=burger-constructor_middle__]').as('middle');

    cy.get('@thirdIngredient').trigger('dragstart').trigger('dragleave');
    cy.get('@burgerConstructor').trigger('dragenter').trigger('dragover').trigger('drop').trigger('dragend');
  });

  it('Замена', () => {
    cy.get('[class^=burger-ingredients_container__]').find('li').as('ingredientsList');
    cy.get('@ingredientsList').eq(3).as('thirdIngredient');
    cy.get('@ingredientsList').last().as('lastIngredient');

    cy.get('[class^=burger-constructor_elements__]').first().as('burgerConstructor');
    cy.get('@burgerConstructor').find('[class^=burger-constructor_middle__]').as('middle');
    //
    cy.get('@lastIngredient').trigger('dragstart').trigger('dragleave');
    cy.get('@burgerConstructor')
      .find('[class^=burger-constructor_replaceIcon__]')
      .trigger('dragenter')
      .trigger('dragover')
      .trigger('drop');
    // проверка текста замененного элемента
    cy.get('@middle').then(($el) => {
      cy.get($el).find('.constructor-element').should('have.length', 1);
      cy.get('@lastIngredient')
        .find('p')
        .last()
        .then(($ingredientName) => {
          const textIngredient = $ingredientName.text();
          cy.get($el).find('.constructor-element__text').should('have.text', textIngredient);
        });
    });
  });
});

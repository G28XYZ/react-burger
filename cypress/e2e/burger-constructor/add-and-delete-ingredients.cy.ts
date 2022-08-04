describe('Добавление ингредиента', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });
  it('Добавить 4 ингредиента, тип "Соусы"', function () {
    cy.get('[class^=burger-ingredients_list__]').last().as('sousList');
    cy.get('[class^=burger-constructor_elements__]').first().as('burgerConstructor');

    cy.get('@sousList')
      .find('li')
      .each(($li: HTMLLIElement) => {
        cy.get($li).trigger('dragstart').trigger('dragleave');
        cy.get('@burgerConstructor').trigger('dragenter').trigger('dragover').trigger('drop').trigger('dragend');
      });

    cy.get('@burgerConstructor')
      .find('[class^=burger-constructor_middle__]')
      .find('.constructor-element')
      .should('have.length', 4);
  });

  it('Удалить 4 ингредиента из конструктора', function () {
    cy.get('[class^=burger-constructor_elements__]').first().as('burgerConstructor');
    cy.get('@burgerConstructor').find('[class^=burger-constructor_middle__]').as('middle');

    cy.get('@middle')
      .find('.constructor-element')
      .each(($el) => {
        cy.get($el).find('.constructor-element__action').click();
      });

    cy.get('@middle').find('.constructor-element').should('have.length', 0);
  });
});

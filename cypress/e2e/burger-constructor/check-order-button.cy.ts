describe('Проверка состояний кнопки Оформить заказ', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('Авторизация', () => {
    cy.visit('http://localhost:3000/login');
    cy.wait(1000);
    cy.url().then(($url) => {
      if ($url.includes('login')) {
        cy.get('[class^=auth_form__]').then(($form) => {
          cy.get('.input__textfield').first().type('g28xyz@ya.ru');
          cy.get('.input__textfield').last().type('111111{enter}');
        });
      }
    });
  });

  it('Кнопка не активна без добавления булки', function () {
    cy.get('[class^=button_button__]').first().as('orderButton');
    cy.get('[class^=burger-ingredients_container__]').find('li').as('ingredientsList');
    cy.get('@ingredientsList').eq(3).as('thirdIngredient');

    cy.get('[class^=burger-constructor_elements__]').first().as('burgerConstructor');
    cy.get('@burgerConstructor').find('[class^=burger-constructor_middle__]').as('middle');

    cy.get('@thirdIngredient').trigger('dragstart').trigger('dragleave');
    cy.get('@burgerConstructor').trigger('dragenter').trigger('dragover').trigger('drop').trigger('dragend');

    cy.get('@orderButton').should('be.disabled');
  });

  it('Получение заказа', () => {
    cy.get('[class^=button_button__]').first().as('orderButton');
    cy.get('[class^=burger-ingredients_container__]').find('li').as('ingredientsList');
    cy.get('@ingredientsList').first().as('bun');

    cy.get('[class^=burger-constructor_elements__]').first().as('burgerConstructor');
    cy.get('@burgerConstructor').find('[class^=burger-constructor_middle__]').as('middle');

    cy.get('@bun').trigger('dragstart').trigger('dragleave');
    cy.get('@burgerConstructor').trigger('dragenter').trigger('dragover').trigger('drop').trigger('dragend');

    cy.get('@orderButton').should('not.disabled');
    cy.get('@orderButton').click();
    cy.wait(16000).then(() => {
      cy.get('[class^=order-info_title__]').should('not.empty')
    })
  });
  it('Закрытие модального окна', () => {
    cy.get('[class^=modal_container__]').find('[class^=modal_close__]').click();
    cy.get('#react-modals').find('div').should('have.length', 0);
  })
});

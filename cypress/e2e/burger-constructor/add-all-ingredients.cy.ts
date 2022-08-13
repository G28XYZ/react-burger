describe("Добавление всех ингредиентов", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });
  it("Добавить все ингредиенты и сравнить количество", function () {
    cy.wait(2000);
    cy.get("[class^=burger-ingredients_container__]").find("li").as("ingredientsList");
    cy.get("[class^=burger-constructor_elements__]").first().as("burgerConstructor");
    cy.get("@burgerConstructor").find("[class^=burger-constructor_middle__]").as("middle");

    cy.get("@ingredientsList").each(($li) => {
      cy.get($li).trigger("dragstart").trigger("dragleave");
      cy.get("@burgerConstructor").trigger("dragenter").trigger("dragover").trigger("drop").trigger("dragend");
    });
    cy.get("@ingredientsList").then(($list) => {
      const totalLength = $list.length - 2;
      cy.get("@middle").find(".constructor-element").should("have.length", totalLength);
    });
  });
  it("Цена не равна нулю", function () {
    cy.get("[class^=burger-constructor_total__]").first().as("price");
    cy.get("@price").should(($div: HTMLDivElement) => {
      const text = $div.text();
      expect(text !== "0");
    });
  });
});

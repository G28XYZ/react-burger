describe("При первом визите кнопка оформить заказ не активна", function () {
  before(function () {
    cy.visit("http://localhost:3000");
  });
  it("Кнопка не активна", function () {
    cy.get("[class^=button_button__]").first().as("orderButton");
    cy.get("@orderButton").should("be.disabled");
  });
});

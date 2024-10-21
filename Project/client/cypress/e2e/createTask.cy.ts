describe("Add Task Test", () => {
  it("should type and add a new task", () => {
    cy.visit("/");

    cy.get("#c-task-text").type("I am a Cypress task!");
    cy.get("#c-task-text").should("have.value", "I am a Cypress task!");
    cy.get("#c-task-date").type("2024-11-07");
    cy.get("#c-add-button").click();

    cy.contains("I am a Cypress task!")
      .parent()
      .find("select")
      .eq(0)
      .select("1");

    cy.get("#c-chores-tab").click();
    cy.contains("I am a Cypress task!").should("not.exist");

    cy.get("#c-work-tab").click();
    cy.contains("I am a Cypress task!").should("be.visible");

    cy.contains("I am a Cypress task!").parent().find("button").click();
  });
});

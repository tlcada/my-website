describe("Welcome", () => {
	describe("Visit the welcome page", () => {
		before(() => {
			Cypress.config("viewportWidth", 1536);
			Cypress.config("viewportHeight", 960);
			cy.viewport(1536, 960);
		});

		it("/ path should load the welcome page", () => {
			cy.visit("/");
			cy.get("h1").should("contain", "Full stack developer");
		});
	});
});

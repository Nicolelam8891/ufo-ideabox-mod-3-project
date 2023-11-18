describe("Visit the homepage", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/sightings", {
      statusCode: 200,
      fixture: "sightings",
    }).as("homepage");
    cy.visit("http://localhost:3000");
  });
  it("should display homepage with sightings", () => {
    cy.intercept("POST", "http://localhost:3001/sightings", {
      statusCode: 201,
      fixture: "post",
    }).as("postSightings");
    cy.wait("@homepage").then((interception) => {
      cy.get("h1").contains("UFO Sightings IdeaBox");
      cy.get(".sightings-container > :nth-child(1)")
        .first()
        .contains("p", "Denver, CO")
        .get(".sightings-container > :nth-child(1)")
        .first()
        .contains("p", "Bright lights over Cheesman Park");
      cy.get(":nth-child(1) > button").contains("Delete");
      cy.get(".sightings-container > :nth-child(3)")
        .last()
        .contains("p", "Louisville, KY");
      cy.get(".sightings-container").children().should("have.length", 3);
      cy.get(".sightings-container > :nth-child(3)")
        .last()
        .contains(
          "p",
          "Bright light and humming noise accompanied by high atmospheric pressure, localized over one house"
        );
      cy.get(":nth-child(3) > button").contains("Delete").click();
      cy.get(".sightings-container").children().should("have.length", 2);
      cy.get("form > button").click();
      cy.get(".error-message").contains(
        "Form is incomplete. All fields need to be filled in."
      );
    });
    cy.get('[placeholder="Title"]')
      .should("have.attr", "placeholder", "Title")
      .type("Littleton, CO")
      .should("have.value", "Littleton, CO");
    cy.get('[placeholder="Description"]')
      .should("have.attr", "placeholder", "Description")
      .type("I see a cute little moon")
      .should("have.value", "I see a cute little moon");
    cy.get("form > button").click();
    cy.wait("@postSightings").then((interception) => {
      cy.get(".sightings-container > :nth-child(3)")
        .last()
        .contains("p", "Littleton, CO")
        .get(".sightings-container > :nth-child(3)")
        .last()
        .contains("p", "I see a cute little moon");
      cy.get(".sightings-container").children().should("have.length", 3);
    });
  });
  it("should display helpful error messages to user", () => {
    cy.intercept("GET", "http://localhost:3001/sightings", {
      statusCode: 404,
      body: "Not Found",
    });
    cy.contains("p", "404 Not Found");
  });
  
});

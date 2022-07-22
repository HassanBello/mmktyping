/// <reference types="cypress"/>
export {};

describe("Typing Challenge", () => {
  let testData: any = {};
  before(() => {
    cy.visit("/");
    cy.fixture("data").then(function (regdata: any) {
      testData = regdata;
    });
  });

  it("Check Time Options", () => {
    cy.get("#time-list option")
      .should("have.length", 3)
      .first()
      .should("have.value", "1")
      .next()
      .should("have.value", "2")
      .next()
      .should("have.value", "5");
  });

  it("Select Time Option", () => {
    cy.get("#test-time").type("8").invoke("val").should("not.be.empty");
  });

  it("Generates Text", () => {
    cy.get("#generate-text-btn").click();
    cy.get("#test-text").invoke("val").should("not.be.empty");
  });

  it("Clear Text", () => {
    cy.get("#generate-text-btn").click();
    cy.get("#test-text").invoke("val").should("not.be.empty");
    cy.get("#clear-text-btn").click();
    cy.get("#test-text").invoke("val").should("be.empty");
  });

  it("Paste Text", () => {
    cy.get("#test-text").type(testData.genericText);
    cy.get("#test-text").invoke("val").should("not.be.empty");
  });

  it("Start Test Button Should be enabled", () => {
    cy.get("#start-test-btn").should("not.be.disabled");
  });

  it("Start Test Button Should Start Test", () => {
    cy.get("#start-test-btn").click();
    cy.get("#test-timer").should("be.visible");
  });

  it("User can type values and mistakes are highlighted", () => {
    cy.get("#typing-area").type(testData.genericMistakeText, { delay: 100});
  });

  it("User Can click on Complete Test Button", () => {
    cy.get("#finish-test-btn").click();
  });

  it("User Can view results", () => {
    cy.get("#challenge-result").should("be.visible");
    cy.get("#wpm").should("have.text", "330");
    cy.get("#score").should("have.text", "44/51");
    cy.get("#accuracy").should("have.text", "86");
  });
});

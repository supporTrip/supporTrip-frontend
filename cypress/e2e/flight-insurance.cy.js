/// <reference types="cypress" />

const token = Cypress.env('token')
const baseUrl = 'http://localhost:5173'

describe('여행자 보험 검색', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
    cy.window().then((win) => {
      win.localStorage.setItem('access_token', token)
      win.localStorage.setItem('refresh_token', token)
    })
  })

  it('여행자 보험을 기본값으로 검색한다.', () => {
    cy.get('nav > a:nth-child(3)').click()
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#root > div > div.css-1fhtz9y > div > div.css-1l95jkh > a').should('have.length.greaterThan', 0);
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('여행자 보험을 검색한다.', function () {
    const startDateTime = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 7));
    const endDateTime = new Date(startDateTime.getTime() + (24 * 60 * 60 * 1000 * 4));

    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="/flight-insurance"]').click();

    cy.get('.css-34jnl4 > .css-16lcjmv').type(startDateTime.toISOString().slice(0, 16));
    cy.get('.css-34jnl4 > .css-vdfz3q').type(endDateTime.toISOString().slice(0, 16));

    cy.get('.css-1rsraa0 > :nth-child(2)').click();
    cy.get('.css-1rsraa0 > :nth-child(3)').click();
    cy.get('.css-1enk06k > .chakra-button').click();
    /* ==== End Cypress Studio ==== */
  });
})


describe('여행자 보험 신청', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
    cy.window().then((win) => {
      win.localStorage.setItem('access_token', token)
      win.localStorage.setItem('refresh_token', token)
    })
  })


  /* ==== Test Created with Cypress Studio ==== */
  it('여행자 보험을 신청한다.', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="/flight-insurance"]').click();
    cy.get('.css-1l95jkh > :nth-child(1)').click();
    cy.get('.css-liyjra > .chakra-button').click();
    cy.get('.css-16pyde7 > :nth-child(1) > .chakra-checkbox__control').click();
    cy.get('.chakra-link').click();
    /* ==== End Cypress Studio ==== */
  });
})
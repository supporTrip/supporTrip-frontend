/// <reference types="cypress" />

const token = Cypress.env('token')
const baseUrl = 'http://localhost:5173'


describe('외환 계좌', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
    cy.window().then((win) => {
      win.localStorage.setItem('access_token', token)
      win.localStorage.setItem('refresh_token', token)
    })
  })

  it('외환 계좌에 현재 보유한 통화들을 조회한다.', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="/account"]').click()
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-cugzet').should('have.length', 1)
    cy.get('.css-1e7fi6v').should('have.length.greaterThan', 0)
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-16aetg7').should('have.class', 'css-16aetg7')
    cy.get('.css-1awxkg9 > .chakra-stack').should('have.class', 'css-tgpajw')
    /* ==== End Cypress Studio ==== */
  })
})
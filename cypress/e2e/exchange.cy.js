/// <reference types="cypress" />

const token = Cypress.env('token')
const baseUrl = 'http://localhost:5173'

const formatDate = (date) => {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

describe('환전 거래 생성', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
    cy.window().then((win) => {
      win.localStorage.setItem('access_token', token)
      win.localStorage.setItem('refresh_token', token)
    })
  })

  it('환전 거래를 새로 생성한다.', () => {
    const endDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24)

    cy.get('nav > a:nth-child(2)').click()

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-4ao3ii > .chakra-button').click()
    cy.get('.chakra-input').type('123123123')
    cy.get('.css-12wzb1n > .chakra-button').click()
    cy.get('.css-10zunq2 > .chakra-button').click()
    cy.get('.css-u3zi4x > .css-1rr4qq7 > .chakra-input').type('해외 여행')
    cy.get(':nth-child(4) > .chakra-input').type(formatDate(endDate))
    cy.get('.chakra-select').select('2')
    cy.get('.css-11m6fog').click()
    cy.get('.css-1v5z18m > .chakra-input').type('10,000')
    cy.get('.css-11m6fog').click()
    cy.get(':nth-child(2) > .css-8atqhb > .css-1vpdv9u').click()
    cy.get('.css-11m6fog').click()
    cy.get('.chakra-input').type('0')
    cy.get('.css-t7s1gd').click()

    /* ==== End Cypress Studio ==== */
  })

  it('생성된 거래를 확인한다.', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[href="/exchange"]').click()
    cy.get('.css-is3lwo').should('have.length.greaterThan', 0)
    /* ==== End Cypress Studio ==== */
  })
})

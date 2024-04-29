/// <reference types="cypress" />

const token = Cypress.env('token')
const baseUrl = 'http://localhost:5173'

describe('마이페이지', () => {
  beforeEach(() => {
    cy.visit(baseUrl)
    cy.window().then((win) => {
      win.localStorage.setItem('access_token', token)
      win.localStorage.setItem('refresh_token', token)
    })
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('내 정보들을 확인한다.', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#menu-button-\\:r2\\:').click();
    cy.get('#menu-list-\\:r2\\:-menuitem-\\:r3\\:').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.css-tynghj > .chakra-image').should('have.class', 'chakra-image');
    cy.get('.css-b95f0i > :nth-child(3) > .css-k008qs > :nth-child(2) > .chakra-text').should('have.class', 'chakra-text');
    cy.get('.css-b95f0i > :nth-child(4) > .css-k008qs > :nth-child(2) > .chakra-text').should('have.class', 'chakra-text');
    cy.get(':nth-child(5) > .css-k008qs > :nth-child(2) > .chakra-text').should('have.class', 'chakra-text');
    cy.get(':nth-child(6) > .css-k008qs > :nth-child(2) > .chakra-text').should('have.class', 'chakra-text');
    cy.get(':nth-child(2) > .css-k008qs > :nth-child(2) > .chakra-text').should('have.class', 'chakra-text');
    cy.get('.css-rd2s96 > :nth-child(3) > .css-k008qs > :nth-child(2) > .chakra-text').should('have.class', 'chakra-text');
    cy.get('.css-rd2s96 > :nth-child(4) > .css-k008qs > :nth-child(2) > .chakra-text').should('have.class', 'chakra-text');
    cy.get('.css-rd2s96 > .css-tynghj > :nth-child(2)').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('내 포인트 내역들을 확인한다.', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#menu-button-\\:r2\\:').click();
    cy.get('#menu-list-\\:r2\\:-menuitem-\\:r3\\:').click();
    cy.get('.css-1qovwhv > :nth-child(3)').click();
    cy.get('.css-o0ey9o').should('have.class', 'chakra-text');
    cy.get('.css-b95f0i > :nth-child(3)').should('have.class', 'css-t5y38w');
    /* ==== End Cypress Studio ==== */

    cy.get('#root > div > div.css-1fhtz9y > div > div > div.css-zebsfj > div > div > div').should('have.length.greaterThan', 1);
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('내 환전 거래 내역들을 확인한다.', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#menu-button-\\:r2\\:').click();
    cy.get('#menu-list-\\:r2\\:-menuitem-\\:r3\\:').click();
    cy.get('.css-1qovwhv > :nth-child(4)').click();
    /* ==== End Cypress Studio ==== */

    cy.get('#root > div > div.css-1fhtz9y > div > div > div.css-zebsfj > div > div > div').should('have.length.greaterThan', 1);
  });

  it('내 보험 신청 내역들을 확인한다.', () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#menu-button-\\:r2\\:').click()
    cy.get('#menu-list-\\:r2\\:-menuitem-\\:r3\\:').click()
    cy.get('.css-1qovwhv > :nth-child(5)').click()
    /* ==== End Cypress Studio ==== */

    cy.get('#root > div > div.css-1fhtz9y > div > div > div.css-zebsfj > div > div > div').should('have.length.greaterThan', 1)
  })

})

describe('should privacy page be visible', () => {
  beforeEach(() => {
    cy.visit('./src/privacy.html')
  })

  Cypress._.times(5, () => {
    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.get('#white-background > :nth-child(5)')
        .should('be.visible')
        .contains('Talking About Testing')
    })
  })
})

export const form = {
  name: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
  number: '123456789',
  howWeMayHelp: 'Testing message...',
  product: {
    blog: 'blog',
    cursos: 'cursos',
    mentoria: 'mentoria',
    youtube: 'youtube',
  },
  service: {
    ajuda: 'ajuda',
    elogio: 'elogio',
    feedback: 'feedback',
  },
}

describe('Central de Atendimento ao Cliente TAT', () => {
  const THREE_SECONDS_IN_MS = 3000
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()

    cy.get('input[id="firstName"]')
      .should('be.visible')
      .type(form.name, { delay: 0 })
      .should('have.value', form.name)
    cy.get('input[id="lastName"]')
      .should('be.visible')
      .type(form.lastName, { delay: 0 })
      .should('have.value', form.lastName)
    cy.get('input[id="email"]')
      .should('be.visible')
      .type(form.email, { delay: 0 })
      .should('have.value', form.email)
    cy.get('textarea[id="open-text-area"]')
      .should('be.visible')
      .type(form.howWeMayHelp, { delay: 0 })
      .should('have.value', form.howWeMayHelp)
    cy.contains('button', 'Enviar').should('be.visible').click()
    cy.get('span[class="success"]').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('span[class="success"]').should('not.be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida ', () => {
    cy.clock()
    cy.contains('button', 'Enviar').should('be.visible').click()
    cy.get('span[class="error"]').should('be.visible')
    cy.tick(THREE_SECONDS_IN_MS)
    cy.get('span[class="error"]').should('not.be.visible')
  })
  Cypress._.times(3, () => {
    it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
      cy.get('#phone')
        .should('be.visible')
        .type(form.email)
        .should('have.value', '')
    })
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('input[id="firstName"]')
      .should('be.visible')
      .type(form.name)
      .should('have.value', form.name)
    cy.get('input[id="lastName"]')
      .should('be.visible')
      .type(form.lastName)
      .should('have.value', form.lastName)
    cy.get('input[id="email"]')
      .should('be.visible')
      .type(form.email)
      .should('have.value', form.email)
    cy.get('input[id="phone-checkbox"]').should('be.visible').check()
    cy.get('textarea[id="open-text-area"]')
      .should('be.visible')
      .type(form.howWeMayHelp)
      .should('have.value', form.howWeMayHelp)
    cy.contains('button', 'Enviar').should('be.visible').click()
    cy.get('span[class="error"]').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('span[class="error"]').should('not.be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[id="firstName"]')
      .should('be.visible')
      .type(form.name)
      .should('have.value', form.name)
      .clear()
      .should('have.value', '')
    cy.get('input[id="lastName"]')
      .should('be.visible')
      .type(form.lastName)
      .should('have.value', form.lastName)
      .clear()
      .should('have.value', '')
    cy.get('input[id="email"]')
      .should('be.visible')
      .type(form.email)
      .should('have.value', form.email)
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .should('be.visible')
      .type(form.number)
      .should('have.value', form.number)
      .clear()
      .should('have.value', '')
    cy.get('textarea[id="open-text-area"]')
      .should('be.visible')
      .type(form.howWeMayHelp)
      .should('have.value', form.howWeMayHelp)

    // cy.contains('button','Enviar').should('be.visible').click();
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').should('be.visible').click()
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.clock()
    cy.fillMandatoryFieldsAndSubmit()
    cy.contains('button', 'Enviar').should('be.visible').click()
    cy.get('span[class="success"]').should('be.visible')

    cy.tick(THREE_SECONDS_IN_MS)

    cy.get('span[class="success"]').should('not.be.visible')
  })

  it(`seleciona um produto (YouTube) por seu texto`, () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })
  it(`seleciona um produto (Mentoria) por seu valor (value)`, () => {
    cy.get('#product')
      .select(form.product.mentoria)
      .should('have.value', form.product.mentoria)
  })
  it(`seleciona um produto (Blog) por seu índice`, () => {
    cy.get('#product').select(1).should('have.value', form.product.blog)
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check(form.service.feedback)
      .should('have.value', form.service.feedback)
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(($radio) => {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    const fileName = 'example.json'
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile(`cypress/fixtures/${fileName}`)
      .should(($input) => {
        expect($input[0].files[0].name).to.equal(fileName)
      })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    const fileName = 'example.json'
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile(`cypress/fixtures/${fileName}`, { action: 'drag-drop' })
      .should(($input) => {
        expect($input[0].files[0].name).to.equal(fileName)
      })
  })
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile(`@sampleFile`)
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('#privacy a')
      .should('be.visible')
      .should('have.attr', 'target', '_blank')
      .invoke('removeAttr', 'target')
      .click()
    cy.get('#white-background > :nth-child(5)').contains(
      'Talking About Testing',
    )
  })

  it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')

    cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')
  })

  it('preenche a area de texto usando o comando invoke', () => {
    const longText = Cypress._.repeat(form.howWeMayHelp, 20)

    cy.get('#open-text-area')
      .should('be.visible')
      .invoke('val', longText)
      .should('have.value', longText)
  })

  it('faz uma requisição HTTP', () => {
    cy.request(
      'https://cac-tat.s3.eu-central-1.amazonaws.com/index.html',
    ).should((response) => {
      const { status, statusText, body } = response
      expect(status).to.equal(200)
      expect(statusText).to.eq('OK')
      expect(body).to.include('<h1 id="title">CAC TAT</h1>')
      expect(body).to.include('<span id="cat">🐈</span>')
    })
  })

  it.only('encontra o gato escondido', () => {
    cy.get('span#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', '🐈')
    cy.get('#title').invoke('text', 'CAT TAT').should('be.visible')
    cy.get('#subtitle')
      .invoke('text', 'Eu ❤️ gatos 🐈🐈🐈')
      .should('be.visible')
  })
})

describe('Test epic 1 : reviewing function', () => {
  it('Go to hotel page', () => {
    cy.visit('http://localhost:3000/hotels/6600ebf5f52ff909aed4c210')
  })

  it('Guest browse reviews', () => {
    cy.visit('http://localhost:3000/hotels/6600ebf5f52ff909aed4c210')
    cy.get('div').contains('Reviews').should("be.visible")
    cy.get('button').contains('Cleanliness').should("be.visible")
    cy.get('button').contains('Convenience').should("be.visible")
    cy.get('button').contains('Facility').should("be.visible")
    cy.get('button').contains('Food').should("be.visible")
    cy.get('button').contains('Service').should("be.visible")
    cy.get('button').contains('Worthiness').should("be.visible")
    cy.get('div').contains('All stars')
    cy.contains('edit').should('not.exist')
    cy.contains('delete').should('not.exist')
    cy.get('[data-testid="reviewcard"]').should('be.visible')
  })

  it('User add review', () => {
    cy.visit('http://localhost:3000/api/auth/signin')
    cy.get('[id^=input-email-]').type('now@gmail.com') 
    cy.get('[id^=input-password-]').type('123456789')
    cy.get('button').click()
    //cy.visit('http://localhost:3000/review?hid=6600ebf5f52ff909aed4c210&name=Autumn%20Hotel')
    cy.visit('http://localhost:3000/mybooking')
    cy.get('button').contains('Review').click()
    cy.get('button').contains('Food').click()
    cy.get('[for=":r5:"]').click()
    cy.get('[placeholder="add a title..."]').type('HOI JIA');
    cy.get('[placeholder="add a comment..."]').type('ครัวคุณต๋อย');
    cy.get('button').contains('Submit').click()
  })


    it('Edit review', () => {
      cy.visit('http://localhost:3000/api/auth/signin')
      cy.get('[id^=input-email-]').type('user@gmail.com') 
      cy.get('[id^=input-password-]').type('123456')
      cy.get('button').click()
      cy.visit('http://localhost:3000/hotels/6600ebf5f52ff909aed4c210')
      cy.wait(500)
      cy.get('[data-testid="MoreVertIcon"]').first().click()
      cy.get('button').contains('Edit').click()
      cy.get('[placeholder="add a title..."]').clear()
      cy.get('[placeholder="add a title..."]').type('EDITTED title')
      cy.get('[placeholder="add a comment..."]').clear()
      cy.get('[placeholder="add a comment..."]').type('EDITTED comment')
       cy.get('button').contains('Edit').click()
    })

    it('Report', () => {
      cy.visit('http://localhost:3000/api/auth/signin')
      cy.get('[id^=input-email-]').type('now@gmail.com') 
      cy.get('[id^=input-password-]').type('123456789')
      cy.get('button').click()
      cy.visit('http://localhost:3000/hotels/6600ebf5f52ff909aed4c210')
      cy.wait(500)
      cy.get('[class="bg-white text-slate-500 hover:text-red-500 rounded-xl"]').should('be.visible')
      cy.get('[class="bg-white text-slate-500 hover:text-red-500 rounded-xl"]').first().click()
      cy.get('[data-testid="reportpopup"]').should('be.visible')
      cy.get('[id="option5"]').click()
      cy.get('[data-testid="reportbutton"]').click()
      cy.wait(500)
      cy.get('div').contains('Reviews').should("be.visible")
      })

    it('Reply review by hotel manager', () => {
      cy.visit('http://localhost:3000/api/auth/signin')
      cy.get('[id^=input-email-]').type('autumn@gmail.com') 
      cy.get('[id^=input-password-]').type('123456')
      cy.get('button').click()
      cy.visit('http://localhost:3000/hotels/6600ebf5f52ff909aed4c210')
      cy.wait(500)
      cy.get('button').contains('Reply').first().click()
      cy.get('[placeholder="add a comment..."').type('Thank you')
      cy.get('button').contains('Submit').click()
    })
})
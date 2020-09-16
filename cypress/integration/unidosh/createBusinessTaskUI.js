describe('Create new Business Task and post',() => {
	before('Setup BUsiness user account',() => {

		cy.request('POST','/login/loginattempt',{
			'Email':'Auto-test179813@gmail.com',
			'Password':'1234',
			'Menu':2,
			'DeviceToken':'',
			'DeviceType':0,
			'securityHoneypottoken':'',
			'GoogleReCaptchaResponse':'03AGdBq25DU-lYSB7B9EMm5t-bFkOjrWPu8jy9xOmXQZIYGZaR2XDZlmvDKqCyADcXRLbSy9IDdXaAxKCEPFhbOhSXRIF6m0qfC0-1V6KRP4fG9kEvikn-s1Qy7ocd4zeLFQ5JHFQYaimvyfYBk5ojeLpMpNC2cmdFBkoyvHu0aKVsa6GNSHOe04B5hE1A3MECh4-bDQs-HrM9R5ee-n0uP2jYiyjPz7NeJ6QB-9Kqjna6Rww6MpEu4C46z2Epbsy2YIPoJUcWNcsJJfI-_qkyhpf_L8R_nBUaOu8bEOtyYAwvYpAoB1YICDnk0rSsoiL0hgAXS97UTvw_N7HnS-voB1eO1OTeJZemZrfU3XdAWknACdvGGd_lk8BoBRmn5JSUOjLBKnO_yhmi'
		}).then((response) => {
			expect(response.status).to.eq(200);
		});
        
	});
   
	it('Create and post new Business task as Business user',() => {

		cy.visit('/');

		let category = ['Social Media','Web Dev','General Admin','Influencers','Design','Promo Staff','Photography','Blogging','Something Else'];

		cy.get('#BusinessCategories li #title').each((title,index) => {
			cy.wrap(title).should('contain.text',category[index]);      
		});

		cy.get('#BusinessCategories li #title').eq(3).click();

		cy.get('#txtTitle').clear().type('InfluencerTask');

		cy.get('#txtDescription').type('This is for testing the app');

		cy.get('#txtNewTaskRequirement').type('Artificial Intelligence');

		cy.get('span[data-target="newTaskRequirementSubmitButton"]').click();

		cy.get('.bottomRightActionLabel').click();

		cy.get('#tabHolders li').
			filter('.active').should('contain', 'Where & When');

		cy.get('#locationButton .toggleButton').eq(1).click();

		cy.get('#txtDueDT').click();

		cy.get('.today.active').click();

		cy.get('.bottomRightActionLabel').click();

		cy.get('#taskerCounter').clear().type('500');

		cy.get('#txtBudget').type(5);

		cy.get('#postTaskButton').click();

		cy.get('.postjobContent').click();

		cy.wait(500);
        
		cy.get('.tabHolder li').
			filter('.active').find('span').should('contain','Posted');

		cy.get('#buyingList .taskItemHolder').should('have.length.greaterThan', 1);

	});
});
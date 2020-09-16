import {randomEmail} from '../modules/utils';

describe('Create new Business account using twillio Magic Number',() => {

	let randomemail;

	let otpcode;

	it('New Business account creation', () => {
    
		Cypress.Cookies.debug(true);

		randomemail = randomEmail();    

		cy.userCreation(randomemail).then((body) => {

			otpcode = body.messages[0].body.split(':')[1].trim();

			cy.request('POST','/register/checkverificationtext',{
				'Number':'+12053584549',
				'Code':'4444'
			}).then((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('matches').to.equal(true);
			});

			cy.log(otpcode);
            cy.log(randomemail);
            

            cy.fixture('business/business.json').then((businessData) => {
				businessData.Email = randomemail;
                cy.request(
                    'POST',
                    '/register/registerbusiness',
                    businessData
                ).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('success').to.equal(true);
                });  
            });
    
        });    
   
    	cy.visit('/login');

		cy.get('#Onboardingclose').click();

		cy.get('.skipbutton').click();

		cy.get('.category-btn').should('contain','Business');

		cy.get('#business').should('have.class','active');

		cy.get('#BusinessCategories li').should('have.length',9);

	});

});

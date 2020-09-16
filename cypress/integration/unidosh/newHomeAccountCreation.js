import {randomEmail} from '../modules/utils.js'; 

describe('Create new Home account using twillio Magic Number',() => {

	let otpcode;

	let email;

	it('New Home account creation',() => {
    
		Cypress.Cookies.debug(true);

		email = randomEmail();    

		cy.userCreation(email).then((body) => {

			// otpcode = body.messages[0].body.split(':')[1].trim();

			cy.request('POST','/register/checkverificationtext',{
				'Number':'+12053584549',
				'Code':'4444'
			}).then((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('matches').to.equal(true);
			});

			cy.fixture('home/home.json').then((homeData) => {
				homeData.Email = email;
                cy.request(
                    'POST',
                    '/register/registerpublic',
                    homeData
                ).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('success').to.equal(true);
                });  
            });
        });
   
		cy.visit('/login');

		// cy.get('#txtLogInEmail').type(randomemail)

		// cy.get('#txtLogInPassword').type('1234')

		// cy.get('#btn_Login').submit()

		cy.get('#Onboardingclose').click();

		cy.get('.skipbutton').click();

		cy.get('.category-btn').should('contain','Bothi');

		cy.get('#home').should('have.class','active');

		cy.get('#HomeCategories li').should('have.length',9);

	});

});


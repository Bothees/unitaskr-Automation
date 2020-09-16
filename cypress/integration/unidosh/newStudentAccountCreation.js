import {randomNumber} from '../modules/utils';

describe('Create new account using twillio Magic Number',() => {

	let randomemail;

	let otpcode;

	it('New Student account creation',() => {

		var num = randomNumber();

		Cypress.Cookies.debug(true);

		randomemail = 'Auto-test' + num + '@gmail.com';

		cy.userCreation(randomemail).then((body) => {

			cy.wait(2000);

			// otpcode = body.messages[0].body.split(':')[1].trim();
    
			cy.request('POST','/register/checkverificationtext',{
				'Number':'+12053584549',
				'Code':'4444'
			}).then((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('matches').to.equal(true);
			});
    
            cy.log(randomemail);
            
            cy.fixture('student/student.json').then((studentData) => {
                studentData.email = randomemail;
                cy.request(
                    'POST',
                    '/register/registerstudent',
                    studentData
                ).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.have.property('success').to.equal(true);
                });  
            });
        });
	
		cy.visit('/login')

		cy.get('#Onboardingclose').click()

		cy.get('.skipbutton').click()

		cy.get('.student-home .title').should('contain','Tasks')
    });

});

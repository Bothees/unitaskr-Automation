
describe('New Account creation',() => {


	it.skip('Create new account to Login',() => {

		cy.visit('https://app.unidoshdev.com/login');

		cy.get('.studentSection').click();

		cy.contains('Sign up using your email address').click();

		cy.get('input[name="firstname"]').type('testing-student').should('have.value','testing-student');

		cy.get('input[name="lastname"]').type('testing-student').should('have.value','testing-student');

		cy.get('#txtRegisterEmailAddress').type('testregistration100@gmail.com').should('have.value','testregistration100@gmail.com');

		cy.get('#txtRegisterPassword').type('Test123$').should('have.value','Test123$');

		cy.get('#txtRegisterConfirmPassword').type('Test123$').should('have.value','Test123$');

		cy.get('#btn_Submit').click();

		cy.server();

		cy.route({
			method:'POST',
			url:'https://app.unidoshdev.com/register/checkverificationtext',            
			status:200,
			response: {
				'success':true,
				'matches':true
			}
		}).as('verification');

		cy.get('#txtNumber').type('005550006');

		cy.contains('SEND CONFIRMATION CODE').click();

		cy.wait(1000);

		cy.get('.validationList').should('not.have.text','Something went wrong, please try again');

		cy.get('#txtVerifyCode1').type('1234');

		cy.contains('VERIFY PHONE NUMBER').click();

		cy.wait('@verification').should('have.property', 'status', 200);

		cy.get('@verification').its('response.body.success').should('eq',true);
		cy.get('@verification').its('response.body.matches').should('eq',true);

		cy.get('#txtUniName').type('Oxford');

		cy.get('#txtStudying').type('Psychalogy');

		cy.get('#txtHometown').type('London');
        
		cy.get('.pac-container .pac-item').eq(0).click();

		cy.contains('NEXT').click();

		cy.wait(2000);

		cy.get('.modalWindow .rightIcons').click({force:true});

		cy.get('#txtMainLocation').type('London');
        
		cy.get('.pac-container .pac-item').eq(0).click();

		cy.route({
			method:'POST',
			url:'https://app.unidoshdev.com/register/registerstudent',
			status:200,
			response: {
				'success':true,
			}
		}).as('registration');

		cy.contains('Finish').click();

		cy.wait('@registration').should('have.property', 'status', 200);

		cy.get('@verification').its('response.body.success').should('eq',true);
       
	});
});
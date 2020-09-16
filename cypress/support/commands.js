// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('userCreation', (email) => {

	cy.request('POST','/register/checkemailexists',{
		'Email':email,
		'GoogleReCaptchaResponse':'03AGdBq27-FOBV48lggRxf3V56VIT5j67nU50_Aqw0aqOUOi0vE_4-UPigzx8z_JVzHTBigkkaQcZhGLm7S4_mK0pFzO4BonjYFQDIn3J4qIobv4ebgHWDoaCaiukL06fBdu5nEQ_xhIDkrNQxLt78pm5lNcBsywOGRUFCougsWZCB0C6tYgVTn_XKFCk4GxOmlUF1GFjGFPD-vZ-fOKkGthXkMsZu5dl8g8ckaJEmPSP0wLrnLY-T6eIS7fcBYbQUANvV9hExLY3nVio9mLiyC1yz6tp_vd9EEG5upNWx08C8SqstFd9AN-eNbVEXZufE1_ZRhho16EIc8aztPhTytNCePd7PZ_SOaqFn1d-q8TAmZvkMiFnMIx1-RlpXxfqVjZzmYjPKTdZt'

	}).then((response) => {
		expect(response.status).to.eq(200);
		expect(response.body).to.have.property('exists').to.equal(false);
	});

	// cy.request('POST','/register/sendverificationtext',
	// 	{
	// 		'Number':'+12053584549'
	// 	})
	// 	.then((response) => {
	// 		expect(response.status).to.eq(200);
	// 		expect(response.body).to.have.property('success').to.equal(true);
	// 	});
            
	// return cy.request({
	// 	method:'GET',
	// 	url:'https://api.twilio.com/2010-04-01/Accounts/AC767eff0aa8c33cdf4428c534861ee1e4/Messages.json',
	// 	auth: {
	// 		username: 'AC767eff0aa8c33cdf4428c534861ee1e4',
	// 		password: 'c7cbb20c74329ce4c163b324e6c52e49',
	// 		AuthMethod: 'BasicAuth'
	// 	}
	// }).its('body');
});


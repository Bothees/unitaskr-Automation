import { isPermissionAllowed } from 'cypress-browser-permissions';

describe('Create new Task and post',() => {

	it('Create and post new task as Home user',() => {

		cy.visit('https://app.unidoshdev.com/login');

		cy.contains('Home & Business').click();

		cy.contains('LOG IN').click({force:true});

		cy.get('#txtLogInEmail').type('bothees@gmail.com');

		cy.get('#txtLogInPassword').type('Test123$');

		cy.get('#btn_Login').click();

		cy.get('.category-btn b').should('contain','Bothi-test');

		let category = ['Delivery','Cleaning','Extra Hands','Flat Pack','Tech Help','Organising','Pets','Child Care','Something Else'];

		cy.get('#HomeCategories li #title').each((title,index) => {
			cy.wrap(title).should('contain.text',category[index]);      
		});

		cy.get('#HomeCategories li #title').eq(0).click();

		cy.get('#txtTitle').clear().type('TestingTask');

		cy.get('#txtDescription').type('This is for testing the app');

		cy.get('#txtNewTaskRequirement').type('Testingssgsgsgs');

		cy.get('span[data-target="newTaskRequirementSubmitButton"]').click();

		cy.get('#postTaskButton').click();

		cy.get('#tabHolders li').
			filter('.active').should('contain', 'Where & When');

		cy.get('#txtLocation').type('RM3');

		cy.get('.pac-container .pac-item').eq(0).click();

		cy.get('#txtDueDT').click();

		cy.get('.today.active').click();

		cy.get('#postTaskButton').click();

		cy.get('#tabHolders li').
			filter('.active').should('contain', 'Budget');

		cy.get('#postTaskButton').click();

		// cy.get('.total-payment').should('have.attr','data-page')

		// cy.get('#drpPaymentMethodall').select('Add new payment method')

		// cy.wait(500)

		// const getIframeDocument = () => {
		//     return cy
		//     .get('iframe[name="__privateStripeFrame13"]')
		//     // Cypress yields jQuery element, which has the real
		//     // DOM element under property "0".
		//     // From the real DOM iframe element we can get
		//     // the "document" element, it is stored in "contentDocument" property
		//     // Cypress "its" command can access deep properties using dot notation
		//     // https://on.cypress.io/its
		//     .its('0.contentDocument').should('exist')
		//   }    
    
    
		//   const getIframeBody = () => {
		//     // get the document
		//     return getIframeDocument()
		//     // automatically retries until body is loaded
		//     .its('body').should('not.be.undefined')
		//     // wraps "body" DOM element to allow
		//     // chaining more Cypress commands, like ".find(...)"
		//     .then(cy.wrap)
		//   }


		// //   cy.wait(5000)
		// //   cy.get('.__PrivateStripeElement > iframe').then($element => {
          
		// //     const $body = $element.contents().find('body')
          
		// //     let stripe = cy.wrap($body)
		// //     stripe.find('input[name="cardnumber"]').type('5555555555554444')
		// //     stripe = cy.wrap($body)
		// //     stripe.find('input[name="exp-date"]').click().type('0121')
		// //     stripe = cy.wrap($body)
		// //     stripe.find('input[name="cvc"]').click().type('111')
		// //   })  

		// getIframeBody().find('input[name="cardnumber"]').click({force:true}).type('5555555555554444',{force:true})

		// getIframeBody().find('input[name="exp-date"]').click().type('0121')

		// getIframeBody().find('input[name="cvc"]').click().type('111')

		// cy.get('.submitPaymentButton').click({force:true})

		// cy.get('#drpPaymentMethodall').select('Card ending 4444')

		// cy.get('.btn-primary').click()

		cy.get('.congo-tasker').should('contain.text','Bothi-test');
     
		cy.get('.postjobContent').click();

		cy.wait(500);
        
		cy.get('.tabHolder li').
			filter('.active').find('span').should('contain','Posted');

		cy.get('#buyingList .taskItemHolder').should('have.length.greaterThan', 1);

	});
});

describe('Database connection to get values', () => {
	it('Get data from DB',() => {
		cy.task('queryDb', 'SELECT * FROM `Unidosh`.`Tasks`').then(function (rows) {
			console.log(rows);
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				console.log(row.Description);
				console.log(row.BudgetType);
			}
		});


		cy.task('queryDb', 'SELECT * FROM `Unidosh`.`Users`').then(function (rows) {
			console.log(rows);
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				console.log(row.FirstName);
				console.log(row.LastName);
				console.log(row.BusinessName);
			}
		});
	});
});

describe('notifications', () => {
	it('should be enabled', () => {
		expect(isPermissionAllowed('notifications')).to.be.true;
		expect(isPermissionAllowed('geolocation')).to.be.true;
	});
});
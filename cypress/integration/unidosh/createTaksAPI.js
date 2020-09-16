import {randomEmail, getFutureDate} from '../modules/utils';
describe('Create new task using API',() => {

	let email;

	before( function() {
		email = randomEmail();    

		cy.userCreation(email).then((body) => {

			// const otpcode = body.messages[0].body.split(':')[1].trim();
        
			cy.request('POST','/register/checkverificationtext',{
				'Number':'+12053584549',
				'Code':'4444'
			}).then((response) => {
				expect(response.status).to.eq(200);
				expect(response.body).to.have.property('matches').to.equal(true);
			});
        
			cy.log(otpcode);
        
			cy.request('POST','/register/registerpublic',{
				'Email':email,
				'Password':'1234',
				'FirstName':'Home',
				'LastName':'Test',
				'ReferralCode':'',
				'Mobile':'+12053584549',
				'GoogleAccessKey':'',
				'FacebookAccessKey':'',
				'SocialProfilePictureUrl':'',
				'ProfilePictureBase64':'',
				'verificationCode':'4444',
				'DeviceToken':'',
				'DeviceType':0,
				'SecurityEmailtoken':''
			})
				.its('body').then((body) => {
					expect(body).to.have.property('success').to.equal(true);
				});
		});
	});


	it('Add new task through API',() => {
        
		var number;

		var date = getFutureDate();

		cy.log(date);
		cy.request('POST','/jobs/addtask',{
			'TaskId':0,
			'CategoryId':4,
			'Title':'TestThroughAPI',
			'Description':'This is for testing through API',
			'Images':[],
			'GoogleLocation':'',
			'Location':'Essex',
			'Lat':'',
			'Lon':'',
			'LocationType':1,
			'DueDT':'',
			'Budget':5,
			'BudgetType':1,
			'TaskerCount':'1',
			'Duration':'',
			'TaskRequirement1':'Testinggdgd',
			'IsTaskPosted':false,
			'IsImageUpdated':false
		}).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('success').to.equal(true);
			const respBody = response.body;
			number = respBody['id'];
			cy.log(number);
			const result = JSON.parse(JSON.stringify(response.body.data));
			console.log(result);
			var usrId = result.userId;
			console.log(usrId);
		});


		cy.request('POST','/publicjobs/BudgetPerTask',{
			'Budget': '5',
			'BudgetType': 1,
			'Duration': '',
			'TaskerCount': '1'
		}).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('duration').to.equal(1);
		});

		cy.request('POST','/jobs/addtask',{
			'TaskId':number,
			'CategoryId':4,
			'Title':'TestThroughAPI',
			'Description':'This is for testing through API',
			'Images':[],
			'GoogleLocation':'Romford RM2, UK',
			'Location':'Essex',
			'Lat':51.6042029,
			'Lon':0.2300152000000001,
			'LocationType':1,
			'DueDT':date,
			'Budget':5,
			'BudgetType':1,
			'TaskerCount':'1',
			'Duration':'',
			'TaskRequirement1':'Technical',
			'IsTaskPosted':true,
			'IsImageUpdated':false
		}).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('success').to.equal(true);
			expect(response.body).to.have.property('taskPosted').to.equal(true);
		});

		cy.wait(1500);

		cy.visit('/');

		cy.get('#Onboardingclose').click();

		cy.get('.skipbutton').click();
    
		cy.get('#imgnonActivity').click();

		cy.get('#buyingList .taskTitle').contains('TestThroughAPI');
    
	});
});
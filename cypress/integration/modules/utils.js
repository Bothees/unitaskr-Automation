export function randomEmail() {
	const uuid = () => Cypress._.random(0, 1e6);
	const id = uuid();
	const testname = `Auto-test${id}@gmail.com`;
	return testname;
}


export function randomNumber() {
	const uuid = () => Cypress._.random(0, 100000);
	const id = uuid();
	return id;
}

export function getFutureDate() {
	var targetDate = new Date();
	targetDate.setDate(targetDate.getDate() + 3);

	var dd = targetDate.getDate();
	var mm = targetDate.getMonth() + 1; // 0 is January, so we must add 1
	var yyyy = targetDate.getFullYear();

	var dateString = yyyy + '-' + mm + '-' + dd;
	return dateString;
}
const drone = require('drone-node');

const client = new drone.Client({
	url: 'http://localhost:80',
	token:'bJKdwoh6UMQit6UpnmhyRa4SiR4kmKUN'
});

client.getRepos().then((res) => {
	console.log(res);
}).catch((reason) => {
	console.error(reason);
});
'use strict';
const Pixiv = require('../');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const pixiv = new Pixiv(username, password);

pixiv.ranking().then(json => {
	console.log(JSON.stringify(json, null, 2));
}).catch(console.log);

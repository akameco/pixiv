'use strict';
const Pixiv = require('../');
const co = require('co');
const wait = require('./util');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const pixiv = new Pixiv(username, password);

pixiv.favorite().then(res => {
	return res.map(v => v.work.id);
}).then(ids => {
	co(function * () {
		for (const id of ids) {
			const filename = yield pixiv.download(id);
			console.log(`downloaded: ${filename}`);
			yield wait();
		}
	});
});

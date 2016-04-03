'use strict';
const Pixiv = require('../');
const pixivImg = require('pixiv-img');
const co = require('co');
const wait = require('./util');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const pixiv = new Pixiv(username, password);

pixiv.favorite()
	.then(json => json.response)
	.then(arr => {
		co(function * () {
			for (const v of arr) {
				const filename = yield pixivImg(v.work.image_urls.large);
				console.log(v.work.title, v.work.user.name);
				console.log(`downloaded: ${filename}`);
				yield wait();
			}
		});
	});

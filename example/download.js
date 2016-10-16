'use strict';
const pixivImg = require('pixiv-img'); // eslint-disable-line import/no-unresolved
const Pixiv = require('../');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const pixiv = new Pixiv(username, password);

pixiv.search('艦これ10000users入り', {mode: 'tag'})
	.then(json => {
		const work = json.response[0];
		console.log(`downloading... ${work.title} by ${work.user.name} `);
		return pixivImg(work.image_urls.large);
	}).then(() => console.log('finish!'))
	.catch(console.log);

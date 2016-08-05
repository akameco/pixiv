'use strict';
const {PixivApp} = require('../');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const pixiv = new PixivApp(username, password);

pixiv.userIllusts(471355).then(console.log);
pixiv.userBookmarksIllust(471355).then(console.log);
pixiv.userBookmarksIllust(471355).then(console.log);
pixiv.illustFollow().then(console.log);
pixiv.illustComments(57907953).then(console.log);
pixiv.trendingTagsIllust().then(console.log);
pixiv.userDetail(471355).then(console.log);

pixiv.searchIllust('艦これ10000users入り').then(res => {
	next(res.next_url);
});

function next(url) {
	pixiv.next(url).then(res => {
		console.log(res);
		if (res.next_url) {
			next(res.next_url);
		} else {
			console.log('end');
		}
	});
}

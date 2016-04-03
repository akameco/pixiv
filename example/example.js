'use strict';
const Pixiv = require('../');

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

const pixiv = new Pixiv(username, password);

pixiv.user(471355).then(res => {
	const userInfo = res.response[0];
	console.log(userInfo.name);
	// => 嵐月
});

pixiv.work(56099861).then(res => {
	const workInfo = res.response[0];
	console.log(workInfo.title);
	// => 春の到来
	console.log(workInfo.caption);
	// => 🌸･ﾟ･:｡(*＞ω＜*)｡:*･ﾟ🌸
});

pixiv.userWorks(471355).then(res => {
	res.response.forEach(work => {
		console.log(work.title);
	});
});
/* =>
FULL CODE 2
やりなおし魔術機工師の再戦録２
ギアスログ⑩
【C89】お品書き
FLASH NOISE
Birthday Boy 2015
...
*/

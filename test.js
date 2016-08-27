import test from 'ava';
import Pixiv from './';

const userId = 471355;

test.beforeEach('new Pixiv()', t => {
	const username = process.env.USERNAME;
	const password = process.env.PASSWORD;
	t.context.pixiv = new Pixiv(username, password);
});

test('expose a constructor', async t => {
	t.true(typeof Pixiv === 'function');
});

test('works', async t => {
	const json = await t.context.pixiv.works(2958);
	t.is(typeof json, 'object');
});

test('error pixiv.work has empty arguments', async t => {
	try {
		await t.context.pixiv.works();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.pass(err);
	}
});

test('users', async t => {
	const json = await t.context.pixiv.users(userId);
	t.true(typeof json.response[0] === 'object');
});

test('error pixiv.user has empty arguments', async t => {
	try {
		await t.context.pixiv.users();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.pass(err);
	}
});

test('userWorks', async t => {
	const json = await t.context.pixiv.usersWorks(userId);
	t.is(typeof json, 'object');
});

test('error pixiv.userWorks has empty arguments', async t => {
	try {
		await t.context.pixiv.usersWorks();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.pass();
	}
});

test('search by 艦これ', async t => {
	const json = await t.context.pixiv.search('艦これ');
	t.true(Array.isArray(json.response));
});

test('search by 艦これ with tag', async t => {
	const json = await t.context.pixiv.search('艦これ', {mode: 'tag'});
	t.true(Array.isArray(json.response));
});

test('search by 艦これ only manga', async t => {
	const json = await t.context.pixiv.search('艦これ', {types: 'manga'});
	t.true(Array.isArray(json.response));
	t.true(json.response.every(v => v.type === 'manga'));
});

test('error pixiv.search has empty arguments', async t => {
	try {
		await t.context.pixiv.search();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.pass();
	}
});

test('ranking', async t => {
	const json = await t.context.pixiv.ranking();
	t.is(json.response[0].mode, 'daily');
	t.true(Array.isArray(json.response[0].works));
});

test('ranking type illust', async t => {
	const json = await t.context.pixiv.ranking('illust');
	t.is(json.response[0].content, 'illust');
	t.true(Array.isArray(json.response[0].works));
});

test('feeds', async t => {
	const json = await t.context.pixiv.feeds();
	t.true(Array.isArray(json.response));
});

test('favoriteWorks', async t => {
	const json = await t.context.pixiv.favoriteWorks();
	t.true(Array.isArray(json.response));
});

test('userFollowing', async t => {
	const json = await t.context.pixiv.usersFollowing(userId);
	t.true(Array.isArray(json.response));
});

test('uerFeeds', async t => {
	const json = await t.context.pixiv.usersFeeds(userId);
	t.true(Array.isArray(json.response));
});

test('followingWorks', async t => {
	const json = await t.context.pixiv.followingWorks();
	t.true(Array.isArray(json.response));
});

test('following', async t => {
	const json = await t.context.pixiv.following();
	t.true(Array.isArray(json.response));
});

test('userFovariteWorks', async t => {
	const json = await t.context.pixiv.usersFavoriteWorks(userId);
	t.true(Array.isArray(json.response));
});

test('latestWorks', async t => {
	const json = await t.context.pixiv.latestWorks();
	t.true(Array.isArray(json.response));
	t.is(json.pagination.next, 2);
});

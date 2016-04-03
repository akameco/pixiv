import test from 'ava';
import Pixiv from '../';

test.beforeEach('new Pixiv()', t => {
	const username = process.env.USERNAME;
	const password = process.env.PASSWORD;
	t.context.pixiv = new Pixiv(username, password);
});

test('expose a constructor', async t => {
	t.true(typeof Pixiv === 'function');
});

test('works', async t => {
	const json = await t.context.pixiv.works(56131089);
	t.same(json.response[0].title, 'test');
});

test('error pixiv.work has empty arguments', async t => {
	try {
		await t.context.pixiv.works();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.ok(err);
	}
});

test('users', async t => {
	const json = await t.context.pixiv.users(7076552);
	t.same(json.response[0].account, 'akameco');
});

test('error pixiv.user has empty arguments', async t => {
	try {
		await t.context.pixiv.users();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.ok(err);
	}
});

test('userWorks', async t => {
	const json = await t.context.pixiv.userWorks(7076552);
	t.true(typeof json === 'object');
});

test('error pixiv.userWorks has empty arguments', async t => {
	try {
		await t.context.pixiv.userWorks();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.ok(err);
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
		t.ok(err);
	}
});

test('ranking', async t => {
	const json = await t.context.pixiv.ranking();
	t.same(json.response[0].mode, 'daily');
	t.true(Array.isArray(json.response[0].works));
});

test('ranking type illust', async t => {
	const json = await t.context.pixiv.ranking('illust');
	t.same(json.response[0].content, 'illust');
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
	const json = await t.context.pixiv.userFollowing(7076552);
	t.true(Array.isArray(json.response));
});

test('uerFeeds', async t => {
	const json = await t.context.pixiv.userFeeds(7076552);
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
	const json = await t.context.pixiv.userFavoriteWorks(7076552);
	t.true(Array.isArray(json.response));
});

test('latestWorks', async t => {
	const json = await t.context.pixiv.latestWorks();
	t.true(Array.isArray(json.response));
	t.is(json.pagination.next, 2);
});

import test from 'ava';
import Pixiv from '../';
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

test('expose a constructor', async t => {
	t.true(typeof Pixiv === 'function');
});

test('works', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.works(56131089);
	t.same(json.response[0].title, 'test');
});

test('error pixiv.work has empty arguments', async t => {
	const pixiv = new Pixiv(username, password);
	try {
		await pixiv.works();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.ok(err);
	}
});

test('users', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.users(7076552);
	t.same(json.response[0].account, 'akameco');
});

test('error pixiv.user has empty arguments', async t => {
	const pixiv = new Pixiv(username, password);
	try {
		await pixiv.users();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.ok(err);
	}
});

test('userWorks', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.userWorks(7076552);
	t.true(typeof json === 'object');
});

test('error pixiv.userWorks has empty arguments', async t => {
	const pixiv = new Pixiv(username, password);
	try {
		await pixiv.userWorks();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.ok(err);
	}
});

test('search by 艦これ', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.search('艦これ');
	t.true(Array.isArray(json.response));
});

test('search by 艦これ with tag', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.search('艦これ', {mode: 'tag'});
	t.true(Array.isArray(json.response));
});

test('error pixiv.search has empty arguments', async t => {
	const pixiv = new Pixiv(username, password);
	try {
		await pixiv.search();
		t.fail('Exception is not thrown');
	} catch (err) {
		t.ok(err);
	}
});

test('ranking', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.ranking();
	t.same(json.response[0].mode, 'daily');
	t.true(Array.isArray(json.response[0].works));
});

test('ranking type illust', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.ranking('illust');
	t.same(json.response[0].content, 'illust');
	t.true(Array.isArray(json.response[0].works));
});

test('feeds', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.feeds();
	t.true(Array.isArray(json.response));
});

test('favorite', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.favorite();
	t.true(Array.isArray(json.response));
});

test('userFollowing', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.favorite();
	t.true(Array.isArray(json.response));
});

import test from 'ava';
import Pixiv from '../';
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

test('expose a constructor', async t => {
	t.true(typeof Pixiv === 'function');
});

test('work', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.work(56131089);
	t.same(json.title, 'test');
});

test('user', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.user(7076552);
	t.same(json.account, 'akameco');
});

test('userWorks', async t => {
	const pixiv = new Pixiv(username, password);
	const json = await pixiv.userWorks(7076552);
	t.true(typeof json === 'object');
});

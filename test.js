import test from 'ava';
import Pixiv from './';

test('fake', async t => {
	t.true(typeof Pixiv === 'function');
});

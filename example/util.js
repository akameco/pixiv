'use strict';

module.exports = ms => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, ms || 2000);
	});
};
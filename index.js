'use strict';
const fs = require('fs');
const path = require('path');
const got = require('got');
const queryString = require('query-string');
const objectAssign = require('object-assign');

class Pixiv {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	_auth() {
		return new Promise(resolve => {
			if (this.headers && this.headers.Authorization) {
				resolve();
			}

			const body = {
				client_id: "bYGKuGVw91e0NMfPGp44euvGt59s",  // eslint-disable-line
				client_secret: "HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK", // eslint-disable-line
				grant_type: "password", // eslint-disable-line
				username: this.username,
				password: this.password
			};

			got('https://oauth.secure.pixiv.net/auth/token', {body, json: true}).then(res => {
				const token = res.body.response.access_token;
				this.headers = {
					Authorization: `Bearer ${token}`
				};
				resolve();
			});
		});
	}

	authGot(url, opts) {
		opts = opts || {};

		return new Promise(resolve => {
			this._auth().then(() => {
				const defaultOpts = {
					headers: this.headers,
					json: true
				};

				opts = objectAssign(opts, defaultOpts);

				got(url, opts).then(res => {
					if (res.body.response.length === 1) {
						resolve(res.body.response[0]);
					} else {
						resolve(res.body.response);
					}
				});
			});
		});
	}

	work(id) {
		if (!id) {
			return Promise.reject(new Error('Illust Id is required.'));
		}

		const query = {image_sizes: 'large'}; // eslint-disable-line
		return this.authGot(`https://public-api.secure.pixiv.net/v1/works/${id}`, {query});
	}

	user(id) {
		if (!id) {
			return Promise.reject(new Error('UserId is required.'));
		}

		return this.authGot(`https://public-api.secure.pixiv.net/v1/users/${id}`);
	}

	userWorks(id) {
		if (!id) {
			return Promise.reject(new Error('UserId is required.'));
		}

		return this.authGot(`https://public-api.secure.pixiv.net/v1/users/${id}/works`);
	}

	download(target, opts) {
		opts = opts || {};

		if (/^http/.test(target)) {
			const parsed = queryString.parse(target);
			target = parsed.illust_id;
		}

		return new Promise(resolve => {
			this.work(target)
				.then(json => json.image_urls.large)
				.then(url => saveImage(url, opts))
				.then(resolve);
		});
	}
}

function saveImage(url, opts) {
	const directory = opts.directory || '';
	let filename = opts.filename || path.basename(url);
	filename = path.join(directory, filename);

	return new Promise(resolve => {
		const options = {
			encoding: null,
			headers: {
				Referer: 'http://www.pixiv.net/'
			}
		};

		got.stream(url, options).pipe(fs.createWriteStream(filename)).on('close', () => {
			resolve(filename);
		});
	});
}

module.exports = Pixiv;

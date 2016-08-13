'use strict';
const url = require('url');
const got = require('got');

class Auth {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	_auth() {
		if (this.headers && this.headers.Authorization) {
			return Promise.resolve();
		}

		const body = {
			client_id: 'bYGKuGVw91e0NMfPGp44euvGt59s',
			client_secret: 'HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK',
			grant_type: 'password',
			username: this.username,
			password: this.password
		};

		return got('https://oauth.secure.pixiv.net/auth/token', {body, json: true}).then(res => {
			const token = res.body.response.access_token;
			this.headers = {
				Authorization: `Bearer ${token}`
			};
		});
	}

	authRequest(target, opts) {
		return this._auth().then(() => {
			opts = Object.assign({}, {
				headers: this.headers,
				json: true
			}, opts);

			return got(target, opts);
		}).then(res => res.body);
	}

	authGot(apiUrl, path, query, method) {
		const reqestURL = url.resolve(apiUrl, path);
		return this.authRequest(reqestURL, Object.assign({}, {query}, method));
	}
}

module.exports = Auth;

'use strict';
const url = require('url');
const got = require('got');

class Auth {
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
				client_id: 'bYGKuGVw91e0NMfPGp44euvGt59s',
				client_secret: 'HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK',
				grant_type: 'password',
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

	authRequest(target) {
		return new Promise((resolve, reject) => {
			this._auth().then(() => {
				const opts = {headers: this.headers, json: true};
				got(target, opts).then(res => {
					resolve(res.body);
				}).catch(reject);
			});
		});
	}

	authGot(apiUrl, path, query, method) {
		method = method || 'get';
		return new Promise((resolve, reject) => {
			this._auth().then(() => {
				const opts = Object.assign({
					headers: this.headers,
					json: true
				}, {query});

				const reqestURL = url.resolve(apiUrl, path);
				got[method](reqestURL, opts).then(res => {
					resolve(res.body);
				}).catch(reject);
			});
		});
	}
}

module.exports = Auth;

'use strict';
const fs = require('fs');
const path = require('path');
const got = require('got');
const queryString = require('query-string');

class Pixiv {
	constructor(username, password) {
		this.username = username;
		this.password = password;
	}

	auth() {
		return new Promise(resolve => {
			if (this.headers && this.headers.Authorization) {
				resolve(this.headers);
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
				resolve(this.headers);
			});
		});
	}

	fetchInfo(id) {
		if (/^http/.test(id)) {
			const parsed = queryString.parse(id);
			id = parsed.illust_id;
		}

		return new Promise(resolve => {
			const query = {image_sizes: 'large'}; // eslint-disable-line
			const options = {
				headers: this.headers,
				json: true,
				query
			};

			got(`https://public-api.secure.pixiv.net/v1/works/${id}`, options).then(res => {
				resolve(res.body.response[0]);
			});
		});
	}

	download(id, opts) {
		opts = opts || {};
		return new Promise(resolve => {
			this.auth()
				.then(() => this.fetchInfo(id))
				.then(json => json.image_urls.large)
				.then(url => saveImage(url, opts))
				.then(resolve);
		});
	}
}

function saveImage(url, opts) {
	const dirname = opts.dirname || '';
	let filename = opts.filename || path.basename(url);
	filename = path.join(dirname, filename);

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

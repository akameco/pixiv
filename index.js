'use strict';
const fs = require('fs');
const path = require('path');
const got = require('got');
const queryString = require('query-string');
const objectAssign = require('object-assign');

const IMAGE_SIZES = 'px_128x128,px_480mw,small,medium,large';

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
				client_id: "bYGKuGVw91e0NMfPGp44euvGt59s",  // eslint-disable-line camelcase
				client_secret: "HP3RmkgAmEGro0gn1x9ioawQE8WMfvLXDz3ZqxpK", // eslint-disable-line camelcase
				grant_type: "password", // eslint-disable-line camelcase
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
		return new Promise((resolve, reject) => {
			opts = opts || {};

			this._auth().then(() => {
				opts = objectAssign({
					headers: this.headers,
					json: true
				}, opts);

				got(url, opts).then(res => {
					if (res.body.response.length === 1) {
						resolve(res.body.response[0]);
					} else {
						resolve(res.body.response);
					}
				}).catch(reject);
			});
		});
	}

	work(id) {
		if (id === undefined) {
			return Promise.reject(new Error('Illust Id is required.'));
		}
		const query = {
			image_sizes: IMAGE_SIZES // eslint-disable-line camelcase
		};
		return this.authGot(`https://public-api.secure.pixiv.net/v1/works/${id}`, {query});
	}

	user(id) {
		if (id === undefined) {
			return Promise.reject(new Error('UserId is required.'));
		}

		return this.authGot(`https://public-api.secure.pixiv.net/v1/users/${id}`);
	}

	userWorks(id) {
		if (id === undefined) {
			return Promise.reject(new Error('UserId is required.'));
		}

		return this.authGot(`https://public-api.secure.pixiv.net/v1/users/${id}/works`);
	}

	search(q, opts) {
		if (q === undefined) {
			return Promise.reject(new Error('Search words is required.'));
		}

		opts = opts || {};

		const query = objectAssign({
			q,
			page: 1,
			per_page: 100, // eslint-disable-line camelcase
			// order: desc, asc
			order: 'desc',
			sort: 'date',
			// period: all, day, week, month
			period: 'all',
			// mode: text, tag, exact_tag, caption
			mode: 'text',
			types: ['illustration', 'manga', 'ugoira'].join(','),
			include_stats: true, // eslint-disable-line camelcase
			include_sanity_level: true, // eslint-disable-line camelcase
			image_sizes: IMAGE_SIZES // eslint-disable-line camelcase
		}, opts);

		return this.authGot(`https://public-api.secure.pixiv.net/v1/search/works`, {query});
	}

	// type: [all, illust, manga, ugoira]
	ranking(type, opts) {
		type = type || 'all';
		opts = opts || {mode: 'daily'};

		const query = {
			// mode: daily, weekly, monthly, rookie, original, male, female, daily_r18, weekly_r18, male_r18, female_r18, r18g
			mode: opts.mode,
			page: 1,
			per_page: 100, // eslint-disable-line camelcase
			image_sizes: IMAGE_SIZES // eslint-disable-line camelcase
		};

		return this.authGot(`https://public-api.secure.pixiv.net/v1/ranking/${type}`, {query});
	}

	feed(r18) {
		const bool2num = b => b ? 1 : 0;

		const query = {
			relation: 'all',
			type: 'touch_nottext',
			show_r18: bool2num(r18) || 1 // eslint-disable-line camelcase
		};

		return this.authGot('https://public-api.secure.pixiv.net/v1/me/feeds.json', {query});
	}

	favorite() {
		const query = {
			image_sizes: IMAGE_SIZES // eslint-disable-line camelcase
		};

		return this.authGot('https://public-api.secure.pixiv.net/v1/me/favorite_works', {query});
	}

	userFollowing(id, opts) {
		opts = opts || {};

		const query = objectAssign({
			page: 1,
			per_page: 30 // eslint-disable-line camelcase
		}, opts);

		return this.authGot(`https://public-api.secure.pixiv.net/v1/users/${id}/following.json`, {query});
	}

	download(target, opts) {
		return new Promise(resolve => {
			opts = opts || {};

			// saveImage when image url
			if (/(jpg|png|gif)$/.test(target)) {
				saveImage(target, opts).then(resolve);
			}

			if (/illust_id/.test(target)) {
				const parsed = queryString.parse(target);
				target = parsed.illust_id;
			}

			this.work(target)
				.then(json => json.image_urls.large)
				.then(url => saveImage(url, opts))
				.then(resolve);
		});
	}
}

function saveImage(imgUrl, opts) {
	return new Promise((resolve, reject) => {
		if (imgUrl === undefined) {
			reject(new Error('imgUrl is required.'));
		}

		opts = opts || {};

		const directory = opts.directory || '';
		let filename = opts.filename || path.basename(imgUrl);
		filename = path.join(directory, filename);

		const options = {
			encoding: null,
			headers: {
				Referer: 'http://www.pixiv.net/'
			}
		};

		got.stream(imgUrl, options).pipe(fs.createWriteStream(filename)).on('close', () => {
			resolve(filename);
		});
	});
}

module.exports.saveImage = Pixiv.prototype.saveImage = saveImage;
module.exports = Pixiv;

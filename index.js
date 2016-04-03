'use strict';
const got = require('got');
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
			this._auth().then(() => {
				opts = objectAssign({
					headers: this.headers,
					json: true
				}, opts);

				got(url, opts).then(res => {
					resolve(res.body);
				}).catch(reject);
			});
		});
	}

	works(id) {
		if (id === undefined) {
			return Promise.reject(new Error('Illust Id is required.'));
		}
		const query = {
			image_sizes: IMAGE_SIZES // eslint-disable-line camelcase
		};
		return this.authGot(`https://public-api.secure.pixiv.net/v1/works/${id}`, {query});
	}

	users(id) {
		if (id === undefined) {
			return Promise.reject(new Error('UserId is required.'));
		}

		return this.authGot(`https://public-api.secure.pixiv.net/v1/users/${id}`);
	feeds(r18) {
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
		opts = objectAssign({mode: 'daily'}, opts);

		const query = {
			// mode: daily, weekly, monthly, rookie, original, male, female, daily_r18, weekly_r18, male_r18, female_r18, r18g
			mode: opts.mode,
			page: 1,
			per_page: 100, // eslint-disable-line camelcase
			image_sizes: IMAGE_SIZES // eslint-disable-line camelcase
		};

		return this.authGot(`https://public-api.secure.pixiv.net/v1/ranking/${type}`, {query});
	}

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
		const query = objectAssign({
			page: 1,
			per_page: 30 // eslint-disable-line camelcase
		}, opts);

		return this.authGot(`https://public-api.secure.pixiv.net/v1/users/${id}/following.json`, {query});
	}
}

module.exports = Pixiv;

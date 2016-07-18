'use strict';
/* eslint-disable camelcase */
const url = require('url');
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

	authGot(path, opts) {
		return new Promise((resolve, reject) => {
			this._auth().then(() => {
				opts = objectAssign({
					headers: this.headers,
					json: true
				}, opts);

				got(url.resolve('https://public-api.secure.pixiv.net/v1/', path), opts).then(res => {
					resolve(res.body);
				}).catch(reject);
			});
		});
	}

	works(id, opts) {
		if (!id) {
			return Promise.reject(new Error('Illust Id is required.'));
		}

		const query = objectAssign({
			image_sizes: IMAGE_SIZES,
			include_stats: true
		}, opts);

		return this.authGot(`works/${id}`, {query});
	}

	users(id) {
		if (!id) {
			return Promise.reject(new Error('UserId is required.'));
		}

		return this.authGot(`users/${id}`);
	}

	feeds(opts) {
		const query = objectAssign({
			relation: 'all',
			type: 'touch_nottext',
			show_r18: 1
		}, opts);

		return this.authGot('me/feeds', {query});
	}

	favoriteWorks(opts) {
		const query = objectAssign({
			image_sizes: IMAGE_SIZES
		}, opts);

		return this.authGot('me/favorite_works', {query});
	}

	following(opts) {
		const query = objectAssign({
			page: 1,
			per_page: 100,
			publicity: 'public'
		}, opts);

		return this.authGot('me/following', {query});
	}

	followingWorks(opts) {
		const query = objectAssign({
			page: 1,
			per_page: 100,
			include_stats: true,
			include_sanity_level: true,
			image_sizes: IMAGE_SIZES
		}, opts);

		return this.authGot('me/following/works', {query});
	}

	userWorks(id, opts) {
		if (!id) {
			return Promise.reject(new Error('UserId is required.'));
		}

		const query = objectAssign({
			page: 1,
			include_stats: true,
			include_sanity_level: true,
			image_sizes: IMAGE_SIZES
		}, opts);

		return this.authGot(`users/${id}/works`, {query});
	}

	userFavoriteWorks(id, opts) {
		const query = objectAssign({
			page: 1,
			per_page: 100,
			include_stats: true,
			include_sanity_level: true,
			image_sizes: IMAGE_SIZES
		}, opts);

		return this.authGot(`users/${id}/favorite_works`, {query});
	}

	userFollowing(id, opts) {
		const query = objectAssign({
			page: 1,
			per_page: 30
		}, opts);

		return this.authGot(`users/${id}/following`, {query});
	}

	userFeeds(id, opts) {
		const query = objectAssign({
			relation: 'all',
			type: 'touch_nottext',
			show_r18: 1
		}, opts);

		return this.authGot(`users/${id}/feeds`, {query});
	}

	// type: [all, illust, manga, ugoira]
	ranking(type, opts) {
		type = type || 'all';
		const query = objectAssign({
			// mode: daily, weekly, monthly, rookie, original, male, female, daily_r18, weekly_r18, male_r18, female_r18, r18g
			mode: 'daily',
			page: 1,
			per_page: 100,
			include_stats: true,
			image_sizes: IMAGE_SIZES
		}, opts);

		return this.authGot(`ranking/${type}`, {query});
	}

	latestWorks(opts) {
		const query = objectAssign({
			page: 1,
			per_page: 100,
			include_stats: true,
			include_sanity_level: true,
			image_sizes: IMAGE_SIZES
		}, opts);
		return this.authGot(`works`, {query});
	}

	search(q, opts) {
		if (!q) {
			return Promise.reject(new Error('Search words is required.'));
		}

		const query = objectAssign({
			q,
			page: 1,
			per_page: 100,
			// order: desc, asc
			order: 'desc',
			sort: 'date',
			// period: all, day, week, month
			period: 'all',
			// mode: text, tag, exact_tag, caption
			mode: 'text',
			types: ['illustration', 'manga', 'ugoira'].join(','),
			include_stats: true,
			include_sanity_level: true,
			image_sizes: IMAGE_SIZES
		}, opts);

		return this.authGot(`search/works`, {query});
	}
}

module.exports = Pixiv;

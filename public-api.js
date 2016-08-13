'use strict';
const Auth = require('./auth');

const profile_image_sizes = 'px_170x170,px_50x50';
const image_sizes = 'px_128x128,px_480mw,small,medium,large';

class Pixiv {
	constructor(username, password) {
		this.auth = new Auth(username, password);
	}

	got(path, query, opts) {
		return this.auth.authGot('https://public-api.secure.pixiv.net/v1/', path, query, opts);
	}

	works(id, query) {
		query = Object.assign({
			image_sizes,
			include_stats: true
		}, query);
		return this.got(`works/${id}`, query);
	}

	users(id, query) {
		query = Object.assign({
			profile_image_sizes,
			image_sizes,
			include_stats: 1,
			include_profile: 1,
			include_workspace: 1,
			include_contacts: 1
		}, query);
		return this.got(`users/${id}`, query);
	}

	feeds(query) {
		query = Object.assign({
			relation: 'all',
			type: 'touch_nottext',
			show_r18: 1
		}, query);
		return this.got('me/feeds', query);
	}

	favoriteWorks(query) {
		query = Object.assign({
			page: 1,
			per_page: 50,
			publicity: 'public',
			image_sizes: 'px_128x128,px_480mw,large'
		}, query);
		return this.got('me/favorite_works', query);
	}

	addFavoriteWorks(id, query) {
		query = Object.assign({
			work_id: id,
			publicity: 'public'
		}, query);
		return this.got('me/favorite_works', query, 'post');
	}

	removeFavorite(ids, query) {
		query = Object.assign({
			ids: ids.join(','),
			publicity: 'public'
		}, query);
		return this.got('me/favorite_works', query, 'delete');
	}

	followingWorks(query) {
		query = Object.assign({
			page: 1,
			per_page: 30,
			image_sizes: 'px_128x128,px_480mw,large',
			include_stats: true,
			include_sanity_level: true
		}, query);
		return this.got('me/following/works', query);
	}

	following(query) {
		query = Object.assign({
			page: 1,
			per_page: 30,
			publicity: 'public'
		}, query);
		return this.got('me/following', query);
	}

	follow(id, query) {
		query = Object.assign({
			target_user_id: id,
			publicity: 'public'
		}, query);
		return this.got('me/favorite-users', query, 'post');
	}

	unfollow(ids, query) {
		query = Object.assign({
			delete_ids: ids.join(','),
			publicity: 'public'
		}, query);
		return this.got('me/favorite-users', query, 'delete');
	}

	usersWorks(id, query) {
		query = Object.assign({
			page: 1,
			per_page: 30,
			include_stats: true,
			include_sanity_level: true,
			image_sizes: 'px_128x128,px_480mw,large'
		}, query);
		return this.got(`users/${id}/works`, query);
	}

	usersFavoriteWorks(id, query) {
		query = Object.assign({
			page: 1,
			per_page: 30,
			include_stats: true,
			include_sanity_level: true,
			image_sizes: 'px_128x128,px_480mw,large'
		}, query);
		return this.got(`users/${id}/favorite_works`, query);
	}

	usersFeeds(id, query) {
		query = Object.assign({
			relation: 'all',
			type: 'touch_nottext',
			show_r18: true
		}, query);
		return this.got(`users/${id}/feeds`, query);
	}

	usersFollowing(id, query) {
		query = Object.assign({
			page: 1,
			per_page: 30
		}, query);
		return this.got(`users/${id}/following`, query);
	}

	ranking(type, query) {
		type = type || 'all';
		query = Object.assign({
			mode: 'daily',
			page: 1,
			per_page: 50,
			include_stats: true,
			include_sanity_level: true,
			image_sizes: 'px_128x128,px_480mw,large',
			profile_image_sizes
		}, query);
		return this.got(`ranking/${type}`, query);
	}

	search(q, query) {
		query = Object.assign({
			q,
			page: 1,
			per_page: 30,
			// period: all, day, week, month
			period: 'all',
			// order: desc, asc
			order: 'desc',
			sort: 'date',
			// mode: text, tag, exact_tag, caption
			mode: 'text',
			types: 'illustration,manga,ugoira',
			include_stats: true,
			include_sanity_level: true,
			image_sizes: 'px_128x128,px_480mw,large'
		}, query);
		return this.got('search/works', query);
	}

	latestWorks(query) {
		query = Object.assign({
			page: 1,
			per_page: 30,
			include_stats: true,
			include_sanity_level: true,
			image_sizes: 'px_128x128,px_480mw,large',
			profile_image_sizes
		}, query);
		return this.got('works', query);
	}

	// old api
	userWorks(id, query) {
		this.usersWorks(id, query);
	}

	userFavoriteWorks(id, query) {
		this.usersFavoriteWorks(id, query);
	}

	userFeeds(id, query) {
		this.usersFeeds(id, query);
	}

	userFollowing(id, query) {
		this.usersFollowing(id, query);
	}
}

module.exports = Pixiv;

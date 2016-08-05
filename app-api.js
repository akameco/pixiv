'use strict';
const Auth = require('./auth');

const filter = 'for_ios';

class PixivApp {
	constructor(username, password) {
		this.auth = new Auth(username, password);
	}

	authGot(path, query, opts) {
		opts = opts || {};
		const v = opts.v || 'v1';
		const method = opts.method || 'get';
		return this.auth.authGot(`https://app-api.pixiv.net/${v}/`, path, query, method);
	}

	next(nextUrl) {
		return this.auth.authRequest(nextUrl);
	}

	userDetail(id, query) {
		query = Object.assign({
			user_id: id,
			filter
		}, query);
		return this.authGot('user/detail', query);
	}

	userIllusts(id, query) {
		query = Object.assign({
			user_id: id,
			type: 'illust',
			filter
		});
		return this.authGot('user/illusts', query);
	}

	userBookmarksIllust(id, query) {
		query = Object.assign({
			user_id: id,
			restrict: 'public',
			filter
		}, query);
		return this.authGot('user/bookmarks/illust', query);
	}

	illustFollow(query) {
		query = Object.assign({
			restrict: 'public'
		}, query);
		return this.authGot('illust/follow', query, {v: 'v2'});
	}

	illustComments(id, query) {
		query = Object.assign({
			illust_id: id,
			include_total_comments: 'true'
		}, query);
		return this.authGot('illust/comments', query);
	}

	illustRelated(id, query) {
		query = Object.assign({
			illust_id: id,
			filter
		}, query);
		return this.authGot('illust/related', query);
	}

	illustRecommended(query) {
		query = Object.assign({
			content_type: 'illust',
			include_ranking_label: 'true',
			filter
		}, query);
		return this.authGot('illust/recommended', query);
	}

	illustRanking(query) {
		query = Object.assign({
			mode: 'day',
			filter
		}, query);
		return this.authGot('illust/ranking', query);
	}

	searchIllust(word, query) {
		query = Object.assign({
			word,
			search_target: 'partial_match_for_tags',
			sort: 'date_desc',
			filter
		}, query);
		return this.authGot('search/illust', query);
	}

	trendingTagsIllust(query) {
		query = Object.assign({
			filter
		}, query);
		return this.authGot(`trending-tags/illust`, query);
	}
}

module.exports = PixivApp;

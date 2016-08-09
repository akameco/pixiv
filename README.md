# pixiv.js [![Build Status](https://travis-ci.org/akameco/pixiv.svg?branch=master)](https://travis-ci.org/akameco/pixiv)

> pixiv API client

## Install

```
$ npm install --save pixiv.js
```

## Usage

```js
pixiv.users(471355).then(res => {
	console.log(res.response[0].name);
	// => 嵐月
});
```

If you want to downloading image, you can use with [pixiv-img](https://github.com/akameco/pixiv-img).

```
$ npm install --save pixiv-img
```

```js
const Pixiv = require('pixiv.js');
const pixivImg = require('pixiv-img');

const pixiv = new Pixiv('your username...', 'your password...');

pixiv.search('艦これ10000users入り', {mode: 'tag'})
	.then(json => {
		const work = json.response[0];
		console.log(`downloading... ${work.title} by ${work.user.name} `);
		return pixivImg(work.image_urls.large);
	}).then(() => console.log('finish!'))
	.catch(console.log);

// => downloading... 鹿島風さん by ぺこ
// => finish!
```

See examples.

## API

### Pixiv(username, password)

#### username

*Required*<br>
Type: `string`

your pixiv username.

#### password

*Required*<br>
Type: `string`

your pixiv password.

### `pixiv.works(illustId)`
### `pixiv.users(userId)`
### `pixiv.feeds([options])`
### `pixiv.favoriteWorks([options])`
### `pixiv.addFavoriteWorks(illustId, [options])`
### `pixiv.removeFavoriteWorks(illustIds, [options])`
### `pixiv.followingWorks([options])`
### `pixiv.following([options])`
### `pixiv.follow(userId, [options])`
### `pixiv.unfollow(userIds, [options])`
### `pixiv.usersWorks(userId, [options])`
### `pixiv.usersFavoriteWorks(userid, [options])`
### `pixiv.usersFeeds(userid, [options])`
### `pixiv.usersFollowing(userid, [options])`
### `pixiv.ranking(rankingType, [options])`
### `pixiv.search(searchWord, [options])`
### `pixiv.latestWorks([options])`

#### userId
Type: `string`, `number`

#### illustId
Type: `string`, `number`

#### illustIds
Type: `Array<number>`

#### searchWord
Type: `string`<br>
query word

#### rankingType
Type: `string`<br>
Default: `all`<br>
Values: `all` `illust` `manga` `ugoira`


## API Types

```js
// Default
// image_sizes: 'px_128x128,px_480mw,small,medium,large'
// include_stats: true
works(id: number, query?: {
	image_sizes?: string,
	include_stats?: bool
}): Object

// Default
// image_sizes: 'px_128x128,px_480mw,small,medium,large'
// include_stats: true
// include_profile: true
// include_workspace: true
// include_contact: true
users(id: number, query?: {
	image_sizes?: string
	include_stats?: bool,
	include_profile?: bool,
	include_workspace?: bool,
	include_contacts?: bool
}): Object

// Default
// relation: 'all'
// show_r18: true
feed(query?: {
	relation: 'all'
	show_r18: bool
}): Object

// Default
// page: 1
// per_page: 50
// publicity: 'public'
// image_sizes: 'px_128x128,px_480mw,large'
favoriteWorks(query?: {
	page?: number,
	per_page?: number,
	publicity?: 'public' | 'private'
	image_sizes?: string
}): Object

// Default
// publicity: 'public'
addFavoriteWorks(id: number, query?: {
	publicity?: 'public' | 'private'
}): Object

// Default
// publicity: 'public'
removeFavoriteWorks(ids: Array<number>, query?: {
	publicity?: 'public' | 'private'
}): Object

// Default
// page: 1
// per_page: 30
// image_sizes: 'px_128x128,px_480mw,large'
// include_stats: true,
// include_sanity_level: true
followingWorks(query?: {
	page?: number,
	per_page?: number,
	image_sizes?: string,
	include_stats?: bool,
	include_sanity_level?: bool
}): Object

// Default
// page: 1,
// per_page: 30,
// publicity: 'public'
following(query?: {
	page?: number,
	per_page?: number,
	publicity?: 'public' | 'private'
}): Object

// Default
// publicity: 'public'
follow(query?: {
	publicity?: 'public' | 'private'
}): Object

// Default
// publicity: 'public'
unfollow(ids: Array<number>, query?: {
	publicity?: 'public' | 'private'
}): Object

// Default
// page: 1
// per_page: 30
// include_stats: true,
// include_sanity_level: true
// image_sizes: 'px_128x128,px_480mw,large'
usersWorks(id: number, query?: {
	page?: number,
	per_page?: number,
	include_stats?: bool,
	include_sanity_level?: bool,
	image_sizes?: string
}): Object

// Default
// page: 1
// per_page: 30
// include_stats: true,
// include_sanity_level: true
// image_sizes: 'px_128x128,px_480mw,large'
usersFavoriteWorks(id: number, query?: {
	page?: number,
	per_page?: number,
	include_stats?: bool,
	include_sanity_level?: bool,
	image_sizes?: string
}): Object

// Default
// relation: 'all'
// show_r18: true
usersFeeds(id: number, query?: {
	relation?: 'all',
	show_r18?: bool
}): Object

// Default
// page: 1
// per_page: 30
usersFollowing(id: number, query?: {
	page?: number,
	per_page?: number
}): Object

// Default
// type: 'all'
// mode: 'daily'
// page: 1
// per_page: 50
// include_stats: true
// include_sanity_level: true
// image_sizes: 'px_128x128,px_480mw,large'
// profile_image_sizes: 'px_170x170,px_50x50'
ranking(type: 'all' | 'illust' | 'manga' | 'ugoira', query?: {
	mode?: 'daily' | 'weekly' | 'monthly' | 'male' | 'female' | 'original' | 'rookie' | 'daily_r18' | 'weekly_r18' | 'male_r18'  | 'r18g'
	page?: number,
	per_page?: number,
	include_stats?: bool,
	include_sanity_level?: bool,
	image_sizes?: string,
	profile_image_sizes?: string
}): Object

// Default
// page: 1
// per_page: 30
// period: 'all'
// order: 'desc'
// sort: 'date'
// mode: 'text'
// types: 'illustration,manga,ugoira'
// include_stats: true
// include_sanity_level: true
search(word: string, query?: {
	page?: number,
	per_page?: number,
	period?: 'all' | 'day' | 'week' | 'month',
	order?: 'desc' | 'asc',
	sort?: 'date',
	mode?: 'text' | 'tag' | 'exact_tag' | 'caption',
	types?: string,
	include_stats?: bool,
	include_sanity_level?: bool,
}): Object

// Default
// page: 1
// per_page: 30
// include_stats: true
// include_sanity_level: true
latestWorks(query?: {
	page?: number,
	per_page?: number,
	include_stats?: bool,
	include_sanity_level?: bool
}): Object
```

## Usage

```js
pixiv.users(471355).then(res => {
	console.log(JSON.stringify(res.response[0], null, 2));
});
```

```json
{
  "id": 471355,
  "account": "creayus",
  "name": "嵐月",
  "is_following": true,
  "is_follower": null,
  "is_friend": null,
  "is_premium": false,
  "profile_image_urls": {
    "px_16x16": "http://i3.pixiv.net/img23/profile/creayus/7393018_ss.jpg",
    "px_50x50": "http://i3.pixiv.net/img23/profile/creayus/7393018_s.jpg"
  },
  "stats": null,
  "profile": null
}
```

```js
pixiv.works(56099861).then(res => {
	console.log(JSON.stringify(res.response[0], null, 2));
});
```

```json
{
  "id": 56099861,
  "title": "春の到来",
  "caption": "🌸･ﾟ･:｡(*＞ω＜*)｡:*･ﾟ🌸",
  "tags": [
    "VOCALOID",
    "初音ミク",
    "ふつくしい",
    "春は來る",
    "VOCALOID1000users入り"
  ],
  "tools": [],
  "image_urls": {
    "px_128x128": "http://i2.pixiv.net/c/128x128/img-master/img/2016/03/31/00/15/16/56099861_p0_square1200.jpg",
    "px_480mw": "http://i2.pixiv.net/c/480x960/img-master/img/2016/03/31/00/15/16/56099861_p0_master1200.jpg",
    "small": "http://i2.pixiv.net/c/150x150/img-master/img/2016/03/31/00/15/16/56099861_p0_master1200.jpg",
    "medium": "http://i2.pixiv.net/c/600x600/img-master/img/2016/03/31/00/15/16/56099861_p0_master1200.jpg",
    "large": "http://i2.pixiv.net/img-original/img/2016/03/31/00/15/16/56099861_p0.png"
  },
  "width": 582,
  "height": 800,
  "stats": null,
  "publicity": 0,
  "age_limit": "all-age",
  "created_time": "2016-03-31 00:15:16",
  "reuploaded_time": "2016-03-31 00:15:16",
  "user": {
    "id": 1023317,
    "account": "taeyeop",
    "name": "gomzi",
    "is_following": false,
    "is_follower": false,
    "is_friend": false,
    "is_premium": null,
    "profile_image_urls": {
      "px_50x50": "http://i1.pixiv.net/img35/profile/taeyeop/9847127.png"
    },
    "stats": null,
    "profile": null
  },
  "is_manga": false,
  "is_liked": false,
  "favorite_id": 0,
  "page_count": 1,
  "book_style": "right_to_left",
  "type": "illustration",
  "metadata": null,
  "content_type": null
}
```

```js
pixiv.search('艦これ1000users入り', {mode: 'tag'}).then(res => {
	console.log(JSON.stringify(res, null, 2));
});
```

## Tests

Export your pixiv username & password before running Tests.

```
export USERNAME=your pixiv username...
export PASSWORD=your pixiv password...
```

```
$ npm test
```


## Related

- [pixiv-img](https://github.com/akameco/pixiv-img) - save the image of pixiv

## License

MIT
IT

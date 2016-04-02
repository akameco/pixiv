# pixiv.js [![Build Status](https://travis-ci.org/akameco/pixiv.js.svg?branch=master)](https://travis-ci.org/akameco/pixiv.js)

> pixiv API client

## Installation

```
$ npm install --save pixiv.js
```

## Usage

```js
const Pixiv = require('pixiv.js');
const pixiv = new Pixiv('your username', 'your password');
const url = 'http://www.pixiv.net/member_illust.php?mode=medium&illust_id=55029576';

pixiv.download(url).then(filename => {
	console.log(filename);
	// => 55029576_p0.png
});
```

## API

### Pixiv(username, password)

#### username

*Required*  
Type: `string`

your pixiv username.

#### password

*Required*  
Type: `string`

your pixiv password.

### pixiv.download(url, [options])

Download image file from pixiv.

#### url

*Required*  
Type: `string`, `number`

url or illust_id.

```js
pixiv.download('http://www.pixiv.net/member_illust.php?mode=medium&illust_id=55029576').then(filename => {
	console.log(filename);
	// => 55029576_p0.png
});

pixiv.download(55029576).then(filename => {
	console.log(filename);
	// => 55029576_p0.png
});
```

#### options

Type: `object`

##### filename

Type: `string`

Set the download filename.

##### directory

Type: `string`

Set the download directory.
Default is current directory.

### pixiv.user(userId)

Get user info json.

#### userId

*Required*  
Type: `string`, `number`

#### Usage

```js
pixiv.user(471355).then(info => {
	console.log(JSON.stringify(info, null, 2));
});
```

```
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

### pixiv.work(illustId)

Get illust info json.

#### illustId

*Required*  
Type: `string`, `number`

#### Usage

```js
pixiv.work(56099861).then(info => {
	console.log(JSON.stringify(info, null, 2));
});
```

```
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

### pixiv.userWorks(userId)

Get user works.

### userId

*Required*  
Type: `string`, `number`

### pixiv.search(query, [options])

search pixiv

#### query

query word

*Required*  
Type: `string`

#### options

##### mode

Type: `string`
Default: `text`
Values: `text` `tag` `exact_tag` `caption`

#### page

Type: `string`, `number`
Default: 1

#### Usage

```js
pixiv.search('艦これ1000users入り', {mode: 'tag'}).then(res => {
	console.log(JSON.stringify(res, null, 2));
});
```

### pixiv.ranking(type, [options])

Get ranking data.

### type

Type: `string`
Default: `all`
Values: `all` `illust` `manga` `ugoira`


### options

#### mode

Type: `string`
Default: `daily`
Values: `daily` `weekly` `monthly` `rookie` `original` `male` `female` `daily_r18` `weekly_r18` `male_r18` `female_r18` `r18g`

#### page

Type: `string`, `number`
Default: 1

## Tests

Export your pixiv username & password before running Tests.

```
export USERNAME=your pixiv username...
export PASSWORD=your pixiv password...
```

```
$ npm test
```

## License

MIT

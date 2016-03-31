# pixiv.js [![Build Status](https://travis-ci.org/akameco/pixiv.js.svg?branch=master)](https://travis-ci.org/akameco/pixiv.js)

> awsome pixiv api client

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
});
```

## License

MIT

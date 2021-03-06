# majifix-service-request

[![Build Status](https://travis-ci.org/CodeTanzania/majifix-service-request.svg?branch=develop)](https://travis-ci.org/CodeTanzania/majifix-service-request)
[![Dependencies Status](https://david-dm.org/CodeTanzania/majifix-service-request/status.svg?style=flat-square)](https://david-dm.org/CodeTanzania/majifix-service-request)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/CodeTanzania/majifix-service-request/tree/develop)

A representation of an issue(or service request) reported by a civilian(or customer) e.g Water Leakage occur at a particular area.

## Requirements

- [NodeJS v9.9.0+](https://nodejs.org)
- [MongoDB v3.4.10+](https://www.mongodb.com/)
- [Mongoose v5.0.14+](https://github.com/Automattic/mongoose)

## Installation

```sh
$ npm install @codetanzania/majifix-service-request --save
```

## Usage

```js
const mongoose = require('mongoose');
const { app } = require('@codetanzania/majifix-service-request');

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI);

//fire the app
app.start(function(error, env) {
  ...
});
```

## Testing

- Clone this repository

- Install all development dependencies

```sh
$ npm install
```

- Run example

```sh
$ npm run dev
```

- Then run test

```sh
$ npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## References

- [Open311 GeoReport v2](http://wiki.open311.org/GeoReport_v2/)
- [popolo project](https://www.popoloproject.com/)
- [http://geojson.org/](http://geojson.org/)
- [https://tools.ietf.org/html/rfc7946](https://tools.ietf.org/html/rfc7946)
- [https://opengovdata.io/](https://opengovdata.io/)

## Licence

The MIT License (MIT)

Copyright (c) 2018 - present CodeTanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

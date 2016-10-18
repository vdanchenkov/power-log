# power-log - log function empowered by power-assert

## Installation
### Instrumentation

This module uses excellent power-assert instrumentors to gather intermediate expressions values. There is several ways to do it described [here](https://github.com/power-assert-js/power-assert#be-sure-to-transform-test-code). Make sure to add pattern `log(value)` to instrumentor's configuration. Otherwise it won't work.

Easiest way to use to enable it in webpack is a babel plugin.

```sh
npm install -D babel-plugin-espower
```

Configure it to instrument log calls.

```js
"plugins": [
  [ "babel-plugin-espower", {
    "embedAst": true,
    "patterns": [
      "log(value)"
    ]
  }]
]
```

### Logger

```sh
npm install -D power-log
```

## Usage

```js
var data = { str: "apple pie" }
var key = 'str'
var result = `There is ${data[key].split(' ').length} words`
```
Wrap any expression with pass-through `log` function to print it to console.  

```js
var log = require('power-log')

var data = { str: "apple pie" }
var key = 'str'
var result = log(`There is ${data[key].split(' ').length} words`)
```

```
# src/BlockDetails/Card.js:17

 log(`There is ${ data[key].split(' ').length } words`)
     |            |   ||    |          |               
     |            |   ||    |          2               
     |            |   ||    ["apple","pie"]            
     |            |   |"str"                           
     |            |   "apple pie"                      
     |            Object{str:"apple pie"}              
     "There is 2 words"                                

```

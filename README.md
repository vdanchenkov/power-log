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

## Alternatives

If all you need is several values in a way they are easily identified, you
may simply wrap them in an object.

```js
console.log({ data, key })
```

But there is cases where separate statement would not work. In following example functions might have side-effects so we can not call them several times and there is no room for separate statement.

```js
const f = (a, b) => otherFunc() + foo(a, bar(b))
```

To get results of bar and foo invocations you can use this library

```js
import log from 'power-log'
const f = (a, b) => otherFunc() + log(foo(a, bar(b)))
```

or define simple pass-through logging function similar to the one provided by this module

```js
const log = arg => (console.log(arg), arg)
const f = (a, b) => otherFunc() + log(foo(a, log(bar(b))))
```

or refactor to multi-line version

```js
import log from 'power-log'
const f = (a, b) => {
  const barResult = bar(b)
  const fooResult = foo(a, barResult)
  console.log({ barResult, fooResult })
  return otherFunc() + fooResult
}
```

if logged functions have no side-effects and it's ok to call them several times, you can
use comma operator to inject console.log in the middle of statement.

```js
const f = (a, b) => otherFunc() + (
  console.log({ barResult: bar(b), fooResult: foo(a, bar(b)) }),
  foo(a, bar(b))
)
```

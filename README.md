# power-log - logs expressions with Power Assert tooling

This project is built on top of power-assert by Takuto Wada (@twada).

Provided modules:

- power-log - log function, formatter
- babel-plugin-power-log - plugin that automatically requires `power-log` module when
`log` function is used, and there is no such function in current scope. So you can
skip writing `import log from 'power-log' every time you want to debug something.
- babel-preset-power-log - preset that adds `babel-plugin-power-log` plugin and
instruments code with `babel-plugin-espower` to make it all work.

## Installation

```sh
npm install --save-dev babel-preset-power-log
```

Put in .babelrc
```
{ "presets": "babel-preset-power-log" }
```

## Usage

Wrap any expression with pass-through `log` function to print it to console.  

```js
var data = { str: "apple pie" }
var key = 'str'
var result = log(`There is ${data[key].split(' ').length} words`)
```

Outputs:
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

To get results of bar and foo invocations you can define simple pass-through logging function similar to the one provided by this module

```js
const log = arg => (console.log(arg), arg)
const f = (a, b) => otherFunc() + log(foo(a, log(bar(b))))
```

or refactor to multi-line version

```js
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

var createFormatter = require('power-assert-formatter')

var formatter = createFormatter({ })

module.exports = function (arg) {
  if (arg.source && arg.powerAssertContext) {
    console.log(formatter({ source: arg.source, args: [arg.powerAssertContext] }))
    return arg.powerAssertContext.value
  } else {
    // fallback
    console.log(arg)
    return arg
  }
}

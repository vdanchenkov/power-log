'use strict';

module.exports = {
  env: {
    development: {
      plugins: [
        [
          require('babel-plugin-espower'),
          {
            "embedAst": true,
            "patterns": [
              "log(value)"
            ]
          }
        ]
      ]
    }
  }
}

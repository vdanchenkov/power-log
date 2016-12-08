'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var t = _ref.types;
  return {
    visitor: {
      CallExpression: function CallExpression(path, _ref2) {
        var file = _ref2.file;

        var callee = path.node.callee;
        if (t.isIdentifier(callee) && callee.name === 'log' && !path.scope.hasBinding('log')) {
          file.set('powerLogRequireNeeded', true);
        }
      },

      Program: {
        exit: function exit(path, _ref3) {
          var file = _ref3.file;

          if (file.get('powerLogRequireNeeded')) {
            var requireDeclaration = t.variableDeclaration('var', [t.variableDeclarator(t.identifier('log'), t.callExpression(t.identifier('require'), [t.stringLiteral('power-log')]))]);
            path.node.body.unshift(requireDeclaration);
          }
        }
      }
    }
  };
};
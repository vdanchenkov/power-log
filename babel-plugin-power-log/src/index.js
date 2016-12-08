export default ({ types: t }) => ({
  visitor: {
    CallExpression(path, { file }) {
      const callee = path.node.callee
      if (t.isIdentifier(callee) && callee.name === 'log' && !path.scope.hasBinding('log')) {
        file.set('powerLogRequireNeeded', true)
      }
    },
    Program: {
      exit(path, { file }) {
        if (file.get('powerLogRequireNeeded')) {
          const requireDeclaration = t.variableDeclaration('var', [
            t.variableDeclarator(
              t.identifier('log'),
              t.callExpression(t.identifier('require'), [ t.stringLiteral('power-log') ])
            )
          ])
          path.node.body.unshift(requireDeclaration)
        }
      }
    }
  }
})

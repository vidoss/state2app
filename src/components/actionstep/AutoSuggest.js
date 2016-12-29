const _camelCase = require('lodash.camelcase');
const _get = require('lodash.get');
const {parseModule} = require('shift-parser');

const longest = arr => arr.reduce((a,b) => a.length > b.length ? a : b, '');

function suggestActionTypeName(verb, url, prevType) {
  const code = `\`${url}\``;
  let ast;
  try {
    ast = parseModule(code).items[0].expression.elements;
  } catch(e) {
    return prevType ? prevType : `${verb}_`
  }

  const pathParams = ast.filter( el => el.type === 'IdentifierExpression')
                      .map(el => `BY_${el.name.toUpperCase()}` );
  const paths = ast.filter(el => el.type === 'TemplateElement')
                  .map( el => el.rawValue.toUpperCase().split('/') )
                  .reduce( (pathArr, p) => pathArr.concat(p), []);

  const actionTypeName = `${verb}_${longest(paths)}`
  if (pathParams.length === 0) {
    return actionTypeName;
  }

  return `${actionTypeName}_${longest(pathParams)}`
}

function suggestActionName(type) {
  return _camelCase(type);
}

function suggestActionFunction(actionName, type) {
  return `const ${actionName} = createAction(ActionTypes.${type}, WebAPI.${actionName})`;
}

function onUrlChange(action) {
  const {
    type: prevType,
    verb = 'GET',
    url
  } = action;

  const type = suggestActionTypeName(verb, url, prevType);
  const actionName = suggestActionName(type)
  const actionFunction = suggestActionFunction(actionName, type)
  return {
    ...action,
    url,
    type,
    actionName,
    actionFunction
  }
}

module.exports = {
  onUrlChange
}

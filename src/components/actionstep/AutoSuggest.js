const _camelCase = require('lodash.camelcase');
const _get = require('lodash.get');


function suggestActionTypeName(verb, url, prevType) {
  return prevType ? prevType : `${verb}_` ;
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

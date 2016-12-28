const _camelCase = require('lodash.camelcase');
const expRegex = /\$\{([^}]*)/;
const {AjaxActionTypeSuffix} = require('./Constants');

function deriveActionTypeName(verb, url) {
  const urlParts = url.split('/').reduce(
    (urlInfo, path) => {
      let {longest, expression} = urlInfo;
      if (expRegex.test(path)) {
        expression = `BY_${path.match(expRegex)[1].toUpperCase()}`;
      } else if (urlInfo.longest.length < path.length) {
        longest = path.toUpperCase();
      }
      return {
        ...urlInfo,
        longest,
        expression
      }
    },
    {
      verb,
      longest: '',
      expresion: ''
    }
  );

  return urlParts.expression ? `${verb}_${urlParts.longest}_${urlParts.expression}` : `${verb}_${urlParts.longest}`;
}

function deriveActionName(type) {
  return _camelCase(type);
}

function deriveActionTypes(type) {
  return AjaxActionTypeSuffix.map(
    suffix => `${type}_${suffix}`
  )
}

function onUrlChange(action) {
  const {actionName, actionNameChanged, type, typeChanged, verb = 'GET', url} = action;
  const actionType = deriveActionTypeName(verb, url);

  return {
    ...action,
    url: url,
    type: typeChanged ? type : actionType,
    types: deriveActionTypes(actionType),
    actionName: actionNameChanged ? actionName : deriveActionName(actionType)
  }
}

module.exports = {
  onUrlChange
}

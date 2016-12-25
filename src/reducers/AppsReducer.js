const {AppsActionTypes} = require('../constants');
const {createReducer} = require('../common/utils/ReducerUtil');

const defaultState = {
  apps: {}
};

function addApp(state, action) {
  const {key, app} = action;
  return {
    ...state,
    apps: {
      ...state.apps,
      [key]: {
        ...app,
        uid: key
      }
    }
  }
}

function removeApp(state, action) {
  const {key} = action;
  return {
    ...state,
    apps: state.apps.filter( app => app.key !== key)
  }
}

const actionHandlers = {
  [AppsActionTypes.ADD_APP]              : addApp,
  [AppsActionTypes.REMOVE_APP]           : removeApp
}

module.exports = createReducer(defaultState, actionHandlers);

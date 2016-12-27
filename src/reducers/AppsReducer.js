const {AppsActionTypes} = require('../constants');
const {createReducer} = require('../common/utils/ReducerUtil');

const defaultState = {
  apps: {},
  current: {}
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
    apps: Object.keys(state.apps).filter( app => app.key !== key).reduce(
      (appsObj, app) =>({...appsObj, [app]: state.apps[app]}),
      {}
    )
  }
}

function setCurrent(state, action) {
  const {current} = action;
  return {
    ...state,
    current: {
      ...state.current,
      ...current
    }
  }
}

function appModuleAdded(state, action) {
  const {uid, val, module} = action;
  const appId = state.current.appId;

  if (!appId) {
    console.warn('AppsReducer.appModuleAdded() No curren tappId!!');
    return state;
  }

  const currModule = state.apps[appId][module] || {};
  return {
    ...state,
    apps: {
      ...state.apps,
      [appId]: {
        ...state.apps[appId],
        [module]: {
          ...currModule,
          [uid]: val
        }
      }
    }
  }
}

const actionHandlers = {
  [AppsActionTypes.ADD_APP]              : addApp,
  [AppsActionTypes.REMOVE_APP]           : removeApp,
  [AppsActionTypes.SET_CURRENT]          : setCurrent,
  [AppsActionTypes.APP_MODULE_ADDED]     : appModuleAdded
}

module.exports = createReducer(defaultState, actionHandlers);

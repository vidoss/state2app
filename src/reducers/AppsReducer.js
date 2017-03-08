const {AppsActionTypes} = require('../constants');
const {createReducer} = require('../common/utils/ReducerUtil');
const _get = require('lodash.get');

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
  const {appId} = state.current;

  const currModule = _get(state, `apps.${appId}.${module}`, {});

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

function appModuleChanged(state, action) {
  const {uid, val, module} = action;
  const {appId} = state.current;

  const currModule = _get(state, `apps.${appId}.${module}`, {});
  const currAttr = _get(state, `apps.${appId}.${module}.${uid}`, {});
  return {
    ...state,
    apps: {
      ...state.apps,
      [appId]: {
        ...state.apps[appId],
        [module]: {
          ...currModule,
          [uid]: {
            ...currAttr,
            ...val
          }
        }
      }
    }
  }
}

const actionHandlers = {
  [AppsActionTypes.ADD_APP]              : addApp,
  [AppsActionTypes.REMOVE_APP]           : removeApp,
  [AppsActionTypes.SET_CURRENT]          : setCurrent,
  [AppsActionTypes.APP_MODULE_ADDED]     : appModuleAdded,
  [AppsActionTypes.APP_MODULE_CHANGED]   : appModuleChanged
}

module.exports = createReducer(defaultState, actionHandlers);

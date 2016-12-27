const {AppsActionTypes} = require('../constants');

const addApp = (key, app) => ({
  key,
  app,
  type: AppsActionTypes.ADD_APP
});

const removeApp = (key) => ({
  key,
  type: AppsActionTypes.REMOVE_APP
});

const appModuleAdded = (module, uid, val) => ({
  uid,
  module,
  val,
  type: AppsActionTypes.APP_MODULE_ADDED
});

const appModuleRemoved = (module, uid) => ({
  uid,
  module,
  type: AppsActionTypes.APP_MODULE_REMOVED
})

const appModuleChanged = (module, uid, val) => ({
  uid,
  module,
  val,
  type: AppsActionTypes.APP_MODULE_CHANGED
})

const setCurrent = (current) => ({
  current,
  type: AppsActionTypes.SET_CURRENT
})

module.exports = {
  addApp,
  removeApp,
  setCurrent,
  appModuleAdded,
  appModuleRemoved,
  appModuleChanged
}

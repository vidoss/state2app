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

module.exports = {
  addApp,
  removeApp
}

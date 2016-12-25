const AppReducer = require('../common/reducers/AppReducer');
const UserReducer = require('./UserReducer');
const AppsReducer = require('./AppsReducer');

module.exports = {
  app: AppReducer,
  user: UserReducer,
  apps: AppsReducer
}

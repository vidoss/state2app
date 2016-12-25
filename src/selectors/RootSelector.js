const UserSelector = state => state.user.user;
const AppsSelector = state => Object.keys(state.apps.apps).map( appId => state.apps.apps[appId]);

module.exports = {
  UserSelector,
  AppsSelector
}

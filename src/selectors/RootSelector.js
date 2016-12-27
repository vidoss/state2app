const {createSelector} = require('reselect');

const UserSelector = state => state.user.user;
const AppsSelector = state => state.apps.apps;
const CurrentSelector = state => state.apps.current;

const CurrentAppSelector = createSelector(
  CurrentSelector,
  AppsSelector,
  ({appId}, apps) => apps[appId] || {}
);

const AppsListSelector = createSelector(
  AppsSelector,
  apps => Object.keys(apps).map(uid => apps[uid])
)

module.exports = {
  UserSelector,
  AppsSelector,
  CurrentSelector,
  CurrentAppSelector,
  AppsListSelector
}

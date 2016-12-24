const {AppActionTypes} = require('../constants');

function setCurrentLocation(location) {
  return {
    type: AppActionTypes.SET_CURRENT_LOCATION,
    location
  }
}

const setFlag = flag => ({flag, type: AppActionTypes.SET_APP_FLAGS});
const setUser = user => ({user, type: AppActionTypes.SET_USER});

module.exports = {
  setCurrentLocation,
  setFlag,
  setUser
}

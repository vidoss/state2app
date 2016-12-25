const {UserActionTypes} = require('../constants');

const setUser = user => ({
  user,
  type: UserActionTypes.SET_USER
});

module.exports = {
  setUser
}

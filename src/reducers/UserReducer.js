const {UserActionTypes} = require('../constants');
const {createReducer} = require('../common/utils/ReducerUtil');

const defaultState = {
};

function setUser(state, action) {
  const {user} = action;
  return {
    ...state,
    user
  }
}

const actionHandlers = {
  [UserActionTypes.SET_USER]             : setUser
}

module.exports = createReducer(defaultState, actionHandlers);

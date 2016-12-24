const {AppActionTypes} = require('../constants');
const {createReducer} = require('../utils/ReducerUtil');

const defaultState = {
  current: {},
  showError: false
};

function setCurrentLocation(state, action) {
  const {location} = action;

  return {
    ...state,
    current: {
      ...state.current,
      location
    }
  }
}

const setFlag = (flag, value) => (state, action) => {
  return {
    ...state,
    [flag]: value
  }
}

function handleFailure(state, action) {
  return {
    ...state,
    loading: false,
    showError: true,
    error: action.response
  }
}

function setAppFlag(state, action) {
  const {flag} = action;
  return {
    ...state,
    ...flag
  }
}

function setUser(state, action) {
  return {
    ...state,
    user: action.user
  }
}

const actionHandlers = {
  [AppActionTypes.SET_CURRENT_LOCATION] : setCurrentLocation,
  [AppActionTypes.REQUEST_STARTED]      : setFlag('loading', true),
  [AppActionTypes.REQUEST_FAILURE]      : handleFailure,
  [AppActionTypes.REQUEST_SUCCESS]      : setFlag('loading', false),
  [AppActionTypes.SET_APP_FLAGS]        : setAppFlag,
  [AppActionTypes.SET_USER]             : setUser
}

module.exports = createReducer(defaultState, actionHandlers);

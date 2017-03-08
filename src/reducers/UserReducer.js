const {handleActions} = require('redux-actions');

const defaultState = {
};

module.exports = handleActions({

  SET_USER: (state, action) => ({
    ...state,
    user: action.payload
  })

}, defaultState)

const { createStore, combineReducers, applyMiddleware } = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const loggerMiddleware = require('redux-logger');
const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const { loadJsonFromScript } = require('./common/utils/LoadingUtil');
const {setMessages} = require('./common/utils/MessageUtil');
const {UserActions} = require('./actions');
require('./styles'); // Load styles before AppMain

const AppMain = require('./containers/AppMain');
const reducers = require('./reducers');
const firebase = require('firebase');

function initFirebase(dispatch) {
  firebase.initializeApp(loadJsonFromScript('firebase-config'));
  const auth = firebase.auth();
  auth.onAuthStateChanged(
    (user) => user ? dispatch(UserActions.setUser(user))
                   : auth.signInAnonymously().then(
                     anonUser => {
                       firebase.database().ref(`users/${anonUser.uid}`).set({
                         uid: anonUser.uid
                       });
                       dispatch(UserActions.setUser(anonUser));
                     }
                   )
  );
}

const logger = loggerMiddleware({logger: console});

const initialState = {
};

const reducer = combineReducers(reducers);

const finalCreateStore = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

const store = finalCreateStore(reducer, initialState);

initFirebase(store.dispatch);
setMessages(loadJsonFromScript('messages-bundle'));

ReactDOM.render((
  <Provider store={store}>
    <AppMain />
  </Provider>
), document.getElementById('root'));

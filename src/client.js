const { createStore, combineReducers, applyMiddleware } = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const loggerMiddleware = require('redux-logger');
const React = require('react');
const ReactDOM = require('react-dom');
const {Provider} = require('react-redux');
const { loadJsonFromScript } = require('./common/utils/LoadingUtil');
const {setMessages} = require('./common/utils/MessageUtil');
const {AppActions} = require('./common/actions');
require('./styles'); // Load styles before AppMain

const AppMain = require('./containers/AppMain');
const reducers = require('./reducers');
const firebase = require('firebase');

const logger = loggerMiddleware({logger: console});

const initialState = {
};

const reducer = combineReducers(reducers);

const finalCreateStore = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

const store = finalCreateStore(reducer, initialState);

setMessages(loadJsonFromScript('messages-bundle'));
firebase.initializeApp(loadJsonFromScript('firebase-config'));
const auth = firebase.auth();
auth.onAuthStateChanged(
  (user) => user ? store.dispatch(AppActions.setUser(user))
                 : auth.signInAnonymously().then(
                   anonUser => store.dispatch(AppActions.setUser(anonUser))
                 )
)

ReactDOM.render((
  <Provider store={store}>
    <AppMain />
  </Provider>
), document.getElementById('root'));

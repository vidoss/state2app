const React = require('react');
const {connect} = require('react-redux');
const {Layout, Panel, NavDrawer} = require('react-toolbox');
const firebase = require('firebase');
const theme = require('./AppBuilder.scss');
const {StateView} = require('../components/stateview');
const {StateSteps} = require('../components/statesteps');
const {AppsActions} = require('../actions');

const appModules = [ 'actions' ];

class AppBuilder extends React.Component {

  dbrefs = {};

  subscribeToModules = (module) => {
    const {handleModuleAdded, handleModuleRemoved, handleModuleChanged, appId} = this.props;
    const database = firebase.database();
    const module_abs = `${module}_absolute`;

    if (this.dbrefs[module]) {
      return;
    }

    this.dbrefs[module] = database.ref(`apps/${appId}/${module}`);
    this.dbrefs[module].on('child_added', data => {
      this.dbrefs[module_abs] = database.ref(`${module}/${data.key}`);
      this.dbrefs[module_abs].on('child_changed', handleModuleChanged(module, data.key, data.val()))
      handleModuleAdded(module, data.key, data.val())
    });
    this.dbrefs[module].on('child_removed', data => handleModuleRemoved(module, data.key));
  }

  getAppInfo = () => {
    const {params, addApp} = this.props;
    const appId = params.appId;
    if (!appId) {
      return;
    }
    firebase.database().ref(`apps/${appId}`).once('value').then( (app) => addApp(app.key, app.val()))
    appModules.forEach(this.subscribeToModules);
  };

  componentWillMount = () => this.getAppInfo();

  componentWillUnmount = () => appModules.forEach( module => {
    this.dbrefs[module].off();
    if (this.dbrefs[`${module}_absolute`]) {
      this.dbrefs[`${module}_absolute`].off();
    }
  });

  render() {
    return (
      <Layout theme={theme}>
        <NavDrawer fixed pinned={true} >
          <StateView />
        </NavDrawer>
        <Panel>
          <StateSteps />
        </Panel>
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addApp(uid, app) {
      dispatch(AppsActions.addApp(uid, app));
    },
    handleModuleAdded(module, uid, val) {
      dispatch(AppsActions.appModuleAdded(module, uid, val));
    },
    handleModuleRemoved(module, uid) {
      dispatch(AppsActions.appModuleRemoved(module, uid));
    },
    handleModuleChanged(module, uid, val) {
      dispatch(AppsActions.appModuleChanged(module, uid, val));
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(AppBuilder);

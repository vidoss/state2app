const React = require('react');
const {BrowserRouter, Match, Redirect} = require('react-router');
const StandardLayout  = require('../common/containers/StandardLayout');
const {Layout, Panel, NavDrawer} = require('react-toolbox');
const {StateView} = require('../components/stateview');
const {StateSteps} = require('../components/statesteps');
const theme = require('./AppMain.scss');
const {connect} = require('react-redux');

const UserPlayground = () => (
  <Layout theme={theme}>
    <NavDrawer fixed pinned={true} >
      <StateView />
    </NavDrawer>
    <Panel>
      <StateSteps />
    </Panel>
  </Layout>
);

const AppMain = (props) => {
    const {user} = props;
    return (
      <BrowserRouter>
        <StandardLayout>
          <Match pattern="/" exactly render={
            () => user ? <Redirect to={`/user/${user.uid}`} /> : null
          } />
          <Match pattern="/user/:userId" component={UserPlayground} />
        </StandardLayout>
      </BrowserRouter>
    )
}

function mapStateToProps(state) {
  return {
    user: state.app.user
  }
}

module.exports = connect(mapStateToProps)(AppMain);

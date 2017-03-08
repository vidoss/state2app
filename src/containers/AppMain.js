const React = require('react');
const {BrowserRouter, Match, Redirect} = require('react-router');
const StandardLayout  = require('../common/containers/StandardLayout');
const {connect} = require('react-redux');
const UserHome = require('./UserHome');
const AppBuilder = require('./AppBuilder');
const {UserSelector} = require('../selectors');

const AppMain = (props) => {
    const {user} = props;
    return (
      <BrowserRouter>
        <StandardLayout>
          <Match pattern="/" exactly render={
            () => user ? <Redirect to={`/user/${user.uid}`} /> : null
          } />
          <Match pattern="/user/:userId" component={UserHome} />
          <Match pattern="/app/:appId" component={AppBuilder} />
        </StandardLayout>
      </BrowserRouter>
    )
}

function mapStateToProps(state) {
  return {
    user: UserSelector(state)
  }
}

module.exports = connect(mapStateToProps)(AppMain);

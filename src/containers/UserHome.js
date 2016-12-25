const React = require('react');
const {Link} = require('react-router');
const {Card, CardTitle, Button} = require('react-toolbox');
const theme = require('./UserHome.scss');
const {connect} = require('react-redux');
const firebase = require('firebase');
const {AppsActions} = require('../actions');
const {UserSelector, AppsSelector} = require('../selectors');

const AppCard = (props) => {
  const {app} = props;

  return (
    <Link to={`/app/${app.uid}`}>
      <Card className={theme.appCard}>
          <CardTitle title={app.uid} />
      </Card>
    </Link>
  )
}

class UserHome extends React.Component {

  getUserApps = (props) => {
    const {user, handleAppAdded, handleAppRemoved} = props;
    if (!user || this.appsRef) {
      return;
    }
    this.appsRef = firebase.database().ref(`users/${user.uid}/apps`);
    this.appsRef.on('child_added', data => handleAppAdded(data.key, data.val()));
    this.appsRef.on('child_removed', data => handleAppRemoved(data.key));
  };

  componentWillMount = () => this.getUserApps(this.props);
  componentWillUnmount = () => this.appsRef.off();
  componentWillReceiveProps = (props) => this.getUserApps(props);

  handleNewApp = () => {
    const {user} = this.props;
    const newApp = this.appsRef.push();

    newApp.set(true);
    firebase.database().ref(`apps/${newApp.key}`).set({
      users: {
        [user.uid]: true
      }
    })
  }

  render() {
    const {apps} = this.props;
    return (
      <div>
        <Button icon='add' className={theme.appAdd} floating accent onClick={this.handleNewApp} />
        <div className={theme.appWrapper}>
        {
          apps.map(app => <AppCard key={app.uid} app={app} />)
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: UserSelector(state),
    apps: AppsSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleAppAdded(key, app) {
      dispatch(AppsActions.addApp(key, app))
    },
    handleAppRemoved(key) {
      dispatch(AppsActions.removeApp(key))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(UserHome);

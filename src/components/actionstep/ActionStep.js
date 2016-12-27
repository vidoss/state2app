const React = require('react');
const AjaxAction = require('./AjaxAction');
const {getMessage} = require('../../common/utils/MessageUtil');
const firebase = require('firebase');
const ActionKind = require('./ActionKind');

const {
  Button
} = require('react-toolbox');


class ActionStep extends React.Component {

  addAction = (type) => {
    const {appId} = this.props;
    const fdb = firebase.database();
    const actionRef = fdb.ref(`apps/${appId}/actions`).push();

    actionRef.set(true, () => {
      fdb.ref(`actions/${actionRef.key}`).set({
        type,
        appId,
        current: true
      });
    })
  }

  handleAddAction = () => this.addAction(ActionKind.SIMPLE_ACTION)
  handleAddAjaxAction = () => this.addAction(ActionKind.AJAX_ACTION)

  handleOnChange = (uid, action) => {
    const {appId} = this.props;
    if (!uid || !appId) {
      console.error('ActionSteps.handleOnChange() - appId or actionId missing', appId, uid);
      return;
    }
    firebase.database().ref(`apps/${appId}/actions/${uid}`).set(action);
  }

  render() {
    const {actions} = this.props;

    return (
      <div>
        <div>
          {
            Object.keys(actions || {}).map(
              uid => <AjaxAction key={uid} actions={actions[uid]} onChange={this.handleOnChange}/>
            )
          }
        </div>
        <div>
          <Button onClick={this.handleAddAction}>
            {getMessage('add.action', 'Add Simple Action')}
          </Button>
          <Button onClick={this.handleAddAjaxAction}>
            {getMessage('add.fetch.action', 'Add Server Fetch Action')}
          </Button>
        </div>
      </div>
    )
  }
}

module.exports = ActionStep;

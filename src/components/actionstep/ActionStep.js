const React = require('react');
const AjaxAction = require('./AjaxAction');
const {getMessage} = require('../../common/utils/MessageUtil');
const firebase = require('firebase');
const {ActionKind} = require('./Constants');

const {
  Button
} = require('react-toolbox');

const defaultAction = {
  simple: {
    current: true,
    type: ''
  },
  ajax: {
    webApiCode: '',
    ajaxActionCode: '',
    actionTypesCode: '',
    current: true,
    type: ''
  }
}

class ActionStep extends React.Component {

  addAction = (actionKind, actionDefaults) => {
    const {appId} = this.props;
    const fdb = firebase.database();
    const actionRef = fdb.ref(`apps/${appId}/actions`).push();

    actionRef.set(true, () => {
      fdb.ref(`actions/${actionRef.key}`).set({
        actionKind,
        appId,
        ...actionDefaults
      });
    })
  }

  handleAddAction = () => this.addAction(ActionKind.SIMPLE_ACTION, defaultAction.simple)
  handleAddAjaxAction = () => this.addAction(ActionKind.AJAX_ACTION, defaultAction.ajax)

  handleOnChange = (uid, action) => {
    if (!uid) {
      console.error('ActionSteps.handleOnChange() - Empty uid', uid);
      return;
    }
    // Change any indefined to empty string, fb fails on undefined.
    const cleanAction = Object.keys(action).reduce(
      (actionObj, key) => ({...actionObj, [key]: action[key] === void 0 ? '' : action[key]}),
      {}
    );
    firebase.database().ref(`actions/${uid}`).set(cleanAction);
  }

  render() {
    const {actions} = this.props;

    return (
      <div>
        <div>
          {
            Object.keys(actions || {}).map(
              uid => <AjaxAction key={uid} uid={uid} action={actions[uid]} onChange={this.handleOnChange}/>
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

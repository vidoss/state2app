const React = require('react');
const AjaxAction = require('./AjaxAction');
const {getMessage} = require('../../common/utils/MessageUtil');
const {connect} = require('react-redux');
//const {ActionsSelector} = require('./selectors');
//const ActionActions = require('ActionActions');

const {
  Button
} = require('react-toolbox');

class ActionStep extends React.Component {

  render() {
    return (
      <div>
        <div>
          <AjaxAction />
        </div>
        <div>
          <Button>{getMessage('add.action', 'Add Simple Action')}</Button>
          <Button>{getMessage('add.fetch.action', 'Add Server Fetch Action')}</Button>
        </div>
      </div>
    )
  }
}
/*
function mapDispatchToProps(dispatch, props) {
  return {
    handleUrlChange(url) {
      dispatch(ActionActions.setActionType({url}))
    }
  }
}
*/
module.exports = connect()(ActionStep);

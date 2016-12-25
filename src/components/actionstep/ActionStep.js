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
    const {handleAddAction, handleAddAjaxAction} = this.props;

    return (
      <div>
        <div>
          <AjaxAction />
        </div>
        <div>
          <Button onClick={handleAddAction}>{getMessage('add.action', 'Add Simple Action')}</Button>
          <Button onClick={handleAddAjaxAction}>{getMessage('add.fetch.action', 'Add Server Fetch Action')}</Button>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    handleAddAction() {

    },
    handleAddAjaxAction() {

    }
  }
}

function mapStateToProps(state) {
  return state;
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ActionStep);

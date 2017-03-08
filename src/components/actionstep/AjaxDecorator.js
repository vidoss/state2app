const React = require('react');
const {CompositeDecorator} = require('draft-js');

const ACTION_TYPE_REGEX = /FETCH_[A-Za-z_]*/g;

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr = regex.exec(text);

  while (matchArr !== null) {
    callback(matchArr.index, matchArr.index + matchArr[0].length);
    matchArr = regex.exec(text);
  }
}

function actionTypeStratergy(contentBlock, callback, contentState) {

  findWithRegex(ACTION_TYPE_REGEX, contentBlock, callback);
}

class ActionTypeComponent extends React.Component {

    render() {
      return (
        <span style={{color: 'red'}}>{this.props.children}</span>
      )
  }
}

const AjaxDecorator = new CompositeDecorator([
  {
    strategy: actionTypeStratergy,
    component: ActionTypeComponent,
  }
]);

module.exports = AjaxDecorator;

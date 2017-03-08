const React = require('react');
const {getMessage} = require('../../common/utils/MessageUtil');
const {EditorState, ContentState, convertFromRaw, convertToRaw} = require('draft-js');
const {CodeEditor} = require('../../common/components/codeeditor');
const theme = require('./AjaxAction.scss');
const AjaxDecorator = require('./AjaxDecorator');
const {
  webApiTemplate,
  ajaxActionTemplate,
  actionTypesTemplate
} = require('./Constants');
// const AutoSuggest = require('./AutoSuggest');
const {
  Card,
  CardTitle,
  CardText
} = require('react-toolbox');


class AjaxAction extends React.Component {

  state = {
    webApiState: EditorState.createWithContent(ContentState.createFromBlockArray(webApiTemplate)),
    actionTypesState: EditorState.createWithContent(ContentState.createFromBlockArray(actionTypesTemplate), AjaxDecorator),
    ajaxActionState: EditorState.createWithContent(ContentState.createFromBlockArray(ajaxActionTemplate))
  };

  updateEditorState = (action) => {
      const {webApiCode, actionTypesCode, ajaxActionCode} = action;
      const {webApiState, actionTypesState, ajaxActionState} = this.state;
      if (webApiCode) {
        webApiState.set(EditorState.createWithContent(convertFromRaw(JSON.parse(webApiCode))))
      }
      if (actionTypesCode) {
        actionTypesState.set(EditorState.createWithContent(convertFromRaw(JSON.parse(actionTypesCode)), AjaxDecorator))
      }
      if (ajaxActionCode) {
        ajaxActionState.set(EditorState.createWithContent(convertFromRaw(JSON.parse(ajaxActionCode))))
      }
  }

  componentWillMount = () => this.updateEditorState(this.props.action);
  componentWillReceiveProps = (props) => this.updateEditorState(props.action);

/*
  handleUrlChange = (url) => {
    const {uid, action, onChange} = this.props;
    onChange(uid, AutoSuggest.onUrlChange({...action, url}));
  }

  handleVerbChange = (verb) => {
    const {uid, action, onChange} = this.props;
    onChange(uid, AutoSuggest.onUrlChange({...action, verb}));
  }

  handleActionNameChange = (actionName) => {
    const {uid, action, onChange} = this.props;
    onChange(uid, {...action, actionName, actionNameChanged: true});
  }

  handleActionTypeChange = (type) => {
    const {uid, action, onChange} = this.props;
    onChange(uid, {...action, type, typeChange: true});
  }
*/
  handleWebApiChange = (webApiState) => this.props.onChange(this.props.uid, {...this.props.action, webApiCode: JSON.stringify(convertToRaw(webApiState.getCurrentContent()))});
  handleActionTypesChange = (actionTypesState) => this.props.onChange(this.props.uid, {...this.props.action, actionTypesCode: JSON.stringify(convertToRaw(actionTypesState.getCurrentContent()))});
  handleAjaxActionChange = (ajaxActionState) => this.props.onChange(this.props.uid, {...this.props.action, ajaxActionCode: JSON.stringify(convertToRaw(ajaxActionState.getCurrentContent()))});


  render() {
    const {webApiState, actionTypesState, ajaxActionState} = this.state;
    return (
      <div>
        <Card>
          <CardTitle
            title={getMessage('fetch.action','Server Fetch Action')}
            subtitle={getMessage('fetch.action.subtitle','Edit action code for server fetch action')}
          />
          <CardText>
            <div className={theme.file}>{getMessage('action.types', 'Action Types')} :</div>
            <CodeEditor editorState={actionTypesState} onChange={this.handleActionTypesChange} />
            <div className={theme.file}>{getMessage('redux.actions', 'Redux Actions')} :</div>
            <CodeEditor editorState={ajaxActionState} onChange={this.handleAjaxActionChange} />
            <div className={theme.file}>{getMessage('web.api','WebAPI (Client)')} :</div>
            <CodeEditor editorState={webApiState} onChange={this.handleWebApiChange} />
          </CardText>
        </Card>
      </div>
    )
  }
}

module.exports = AjaxAction;

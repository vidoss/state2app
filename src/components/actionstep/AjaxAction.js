const React = require('react');
const {getMessage} = require('../../common/utils/MessageUtil');
const {Editor, EditorState, ContentState} = require('draft-js');
const theme = require('./AjaxAction.scss');
const {HTTPVerbs, apiUrlPrefix} = require('./Constants');
const AutoUpdate = require('./AutoUpdate');
const {
  Card,
  CardTitle,
  CardText,
  Input,
  Dropdown
} = require('react-toolbox');

const verbs = Object.keys(HTTPVerbs).map( verb => ({value: verb, label: verb}));

class AjaxAction extends React.Component {
  state = {
    editorState: EditorState.createWithContent(ContentState.createFromText(''))
  };

  onChange = (editorState) => this.setState({editorState});

  handleUrlChange = (url) => {
    const {uid, action, onChange} = this.props;
    onChange(uid, AutoUpdate.onUrlChange({...action, url}));
  }

  handleVerbChange = (verb) => {
    const {uid, action, onChange} = this.props;
    onChange(uid, AutoUpdate.onUrlChange({...action, verb}));
  }

  handleActionNameChange = (actionName) => {
    const {uid, action, onChange} = this.props;
    onChange(uid, {...action, actionName, actionNameChanged: true});
  }

  handleActionTypeChange = (type) => {
    const {uid, action, onChange} = this.props;
    onChange(uid, {...action, type, typeChange: true});
  }

  render() {
    const {action} = this.props;
    const {
      url = '',
      verb = 'GET',
      type = ''
    } = action;
    const hint = getMessage('action.url.hint','customer/${customerId}'); // eslint-disable-line  no-template-curly-in-string

    return (
      <div>
        <Card>
          <CardTitle
            title={getMessage('fetch.action','Server Fetch Action')}
            subtitle={getMessage('fetch.action.subtitle','Enter server fetch action details')}
          />
          <CardText>
            <div className={theme.url} >
              <Dropdown value={verb} source={verbs} theme={theme} onChange={this.handleVerbChange}/>
              <div className={theme.prefix}>
                {apiUrlPrefix}
              </div>
              <Input
                type="text"
                className={theme.urlInput}
                onChange={this.handleUrlChange}
                value={url}
                label={getMessage('action.url','<Enter URL>')}
                hint={hint} // eslint-disable-line  no-template-curly-in-string
                />
            </div>
            <Input
              type="text"
              label={getMessage('action.type','Action Type:')}
              onChange={this.handleActionTypeChange}
              value={type}
              />
            <Editor editorState={this.state.editorState} onChange={this.onChange} />
          </CardText>
        </Card>
      </div>
    )
  }
}

module.exports = AjaxAction;

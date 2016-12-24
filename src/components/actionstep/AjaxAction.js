const React = require('react');
const {getMessage} = require('../../common/utils/MessageUtil');
const {Editor, EditorState} = require('draft-js');
const theme = require('./AjaxAction.scss');
const {
  Card,
  CardTitle,
  CardText,
  Input,
  Dropdown
} = require('react-toolbox');

const verbs = ['GET','POST','PUT','DELETE'].map( verb => ({value: verb, label: verb}));

class AjaxAction extends React.Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onChange = (editorState) => this.setState({editorState});

  render() {
    const {url, handleUrlChange} = this.props;
    const hint = !url && getMessage('action.url.hint','customer/${customerId}'); // eslint-disable-line  no-template-curly-in-string

    return (
      <div>
        <Card>
          <CardTitle
            title={getMessage('fetch.action','Server Fetch Action')}
            subtitle={getMessage('fetch.action.subtitle','Enter server fetch action details')}
          />
          <CardText>
            <div className={theme.url} >
              <Dropdown value="GET" source={verbs} theme={theme}/>
              <div className={theme.prefix}>
                /api/
              </div>
              <Input
                type="text"
                className={theme.urlInput}
                onChange={handleUrlChange}
                value={url}
                label={getMessage('action.url','<Enter URL>')}
                hint={hint} // eslint-disable-line  no-template-curly-in-string
                />
            </div>
            <Input type="text" label={getMessage('action.name','Function Name:')} />
            <Editor editorState={this.state.editorState} onChange={this.onChange} />
          </CardText>
        </Card>
      </div>
    )
  }
}

module.exports = AjaxAction;

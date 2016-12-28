const React = require('react');
const Draft = require('draft-js');
const CodeUtils = require('draft-js-code');

class CodeEditor extends React.Component {

    handleKeyCommand = (command) => {
        let newState;
        const {editorState, onChange} = this.props;
        if (CodeUtils.hasSelectionInBlock(editorState)) {
            newState = CodeUtils.handleKeyCommand(editorState, command);
        }

        if (!newState) {
            newState = Draft.RichUtils.handleKeyCommand(editorState, command);
        }

        if (newState) {
            onChange(newState);
            return true;
        }
        return false;
    }

    keyBindingFn = (e) => {
        const {editorState} = this.props;
        let command;

        if (CodeUtils.hasSelectionInBlock(editorState)) {
            command = CodeUtils.getKeyBinding(e);
        }
        if (command) {
            return command;
        }

        return Draft.getDefaultKeyBinding(e);
    }

    handleReturn = (e) => {
        const {editorState} = this.props;

        if (!CodeUtils.hasSelectionInBlock(editorState)) {
            return;
        }

        this.onChange(
            CodeUtils.handleReturn(e, editorState)
        );
        return true;
    }

    handleTab = (e) => {
        const {editorState} = this.props;

        if (!CodeUtils.hasSelectionInBlock(editorState)) {
            return;
        }

        this.onChange(
            CodeUtils.handleTab(e, editorState)
        );
    }

    render() {
      const {editorState, onChange} = this.props;

      return <Draft.Editor
          editorState={editorState}
          onChange={onChange}
          keyBindingFn={this.keyBindingFn}
          handleKeyCommand={this.handleKeyCommand}
          handleReturn={this.handleReturn}
          onTab={this.handleTab}
      />;
    }
}

module.exports = CodeEditor;

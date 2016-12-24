const React = require('react');
const {StepWizard, Step} = require('../../common/components/stepwizard');
const {getMessage} = require('../../common/utils/MessageUtil');
const {ActionStep} = require('../actionstep');

class StateSteps extends React.Component {
  render() {
    return (
      <StepWizard>
        <Step
          title={getMessage('label.actions','Redux Actions')}
          >
            <ActionStep />
        </Step>
      </StepWizard>
    )
  }
}

module.exports = StateSteps;

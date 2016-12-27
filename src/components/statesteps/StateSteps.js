const React = require('react');
const {StepWizard, Step} = require('../../common/components/stepwizard');
const {getMessage} = require('../../common/utils/MessageUtil');
const {ActionStep} = require('../actionstep');

const StateSteps = props => {
  const {app} = props;

  return (
    <StepWizard>
      <Step
        title={getMessage('label.actions','Redux Actions')}
        >
          <ActionStep appId={app.uid} actions={app.actions} />
      </Step>
    </StepWizard>
  )
}

module.exports = StateSteps;

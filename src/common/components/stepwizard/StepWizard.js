const React = require('react');
const {Step: InjectStep} = require('./Step');
const { themr } = require('react-css-themr');
const { STEP_WIZARD } = require('../identifiers');

const stepWizardFactory = (Step) => {

  class StepWizard extends React.Component {

    state = {
      step: 0
    }

    handleNextClick = () => {
      const {step} = this.state;
      const {onNextClick} = this.props;

      const proceed = onNextClick && onNextClick(step);

      if (!proceed) {
        return;
      }

      if (typeof proceed.then === 'function') {
        return proceed.then(() => this.setState({step: step+1}))
      }

      return this.setState({step: step+1})

    }

    handleCancelClick = () => {
      const {step} = this.state;
      this.setState({
        step: step === 0 ? 0 : step -1
      },
      () => this.props.onCancelClick(step) )
    }

    render() {
      const {theme, children} = this.props;
      const {step} = this.state;
      const noOfChildren = React.Children.count(children);

      return (
        <div className={theme.wizard}>
          {
            children &&
            React.Children.map(
              children,
              (child, stepIndex) => {
                const done     = stepIndex < step;
                const active   = step === stepIndex;
                const stepNo   = String(stepIndex + 1);
                const lastStep = stepIndex === noOfChildren - 1;
                return React.cloneElement(child, {
                      onNextClick: this.handleNextClick,
                      onCancelClick: this.handleCancelClick,
                      active,
                      done,
                      stepNo,
                      lastStep,
                      stepIndex
                    });

              }
            )
          }
        </div>
      )
    }
  }

  return StepWizard;
}

const StepWizard = stepWizardFactory(InjectStep);
const ThemedStepWizard= themr(STEP_WIZARD)(StepWizard);

module.exports = {
  StepWizard,
  ThemedStepWizard,
  stepWizardFactory
}

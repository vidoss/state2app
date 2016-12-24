const React = require('react');
const theme = require('./HorizontalRadio.scss');
const {RadioGroup} = require('react-toolbox');
const classnames = require('classnames');

const HorizontalRadioGroup = (props) => {
  const {className, children, ...rest} = props;
  const groupClassName = classnames(className, theme.horizontal);

  return (
    <RadioGroup {...rest} className={groupClassName} >
      {children}
    </RadioGroup>
  )
}


module.exports = {
  HorizontalRadioGroup
}

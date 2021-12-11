import React, { useState } from 'react';
import SwitchToggle from '@dooboo-ui/native-switch-toggle';
import PropTypes from 'prop-types';

import { Colors } from '../../theme';
import styles from './styles';

const Switch = ({ value, onChange, disabled }) => {
  const [toggleValue, onToggle] = useState(value);
  const onPressToggle = () => {
    onChange(!toggleValue);
    onToggle(!toggleValue);
  };

  return (
    <SwitchToggle
      circleColorOn={Colors.white}
      circleColorOff={Colors.white}
      switchOn={toggleValue}
      containerStyle={styles.containerStyle}
      circleStyle={styles.circleStyle}
      backgroundColorOff={Colors.bgColorSwitch}
      backgroundColorOn={Colors.primary}
      onPress={onPressToggle}
      {...{ disabled }}
    />
  );
};

Switch.propTypes = {
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Switch.defaultProps = { disabled: false };
// export default Switch;

export default React.memo(Switch, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
});

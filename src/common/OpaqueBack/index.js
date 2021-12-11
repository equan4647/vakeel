import PropTypes from 'prop-types';
import React from 'react';

import { NavigationService } from '../../utils';
import { ButtonView } from '../../components';
import { Metrics, Colors } from '../../theme';
import { HeaderBackImage } from '..';
import styles from './styles';

const OpaqueBack = ({ onPress, isWhite }) => {
  const backgroundColor = isWhite ? Colors.white : Colors.blackO37;
  const tintColor = isWhite ? Colors.black : Colors.white;

  return (
    <ButtonView
      style={[styles.opaqueCircle, { backgroundColor }]}
      hitSlop={Metrics.hitSlop}
      onPress={() => {
        onPress?.();

        NavigationService.pop();
      }}
    >
      <HeaderBackImage style={[styles.back, { tintColor }]} />
    </ButtonView>
  );
};

OpaqueBack.propTypes = { onPress: PropTypes.func, isWhite: PropTypes.bool };
OpaqueBack.defaultProps = { isWhite: false };

export default React.memo(OpaqueBack);

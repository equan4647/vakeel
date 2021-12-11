import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../../components';
import styles from './styles';

const InputError = ({ error }) => {
  if (error) {
    return <Text style={styles.errorText}>{error?.message ?? ''}</Text>;
  }
  return null;
};

InputError.propTypes = {
  error: PropTypes.object,
};
InputError.defaultProps = { error: undefined };
export default InputError;

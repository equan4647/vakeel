import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { BottomButton } from '../../common';
import { AppStyles } from '../../theme';
import styles from './styles';

const FormContainer = ({
  buttonText,
  buttonPress,
  isButtonDisabled,
  children,
}) => (
  <>
    <ScrollView
      style={AppStyles.container}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
    {buttonPress ? (
      <BottomButton
        disabled={isButtonDisabled}
        title={buttonText}
        onPress={buttonPress}
      />
    ) : null}
  </>
);

FormContainer.propTypes = {
  buttonText: PropTypes.string,
  buttonPress: PropTypes.func,
  children: PropTypes.any.isRequired,
  isButtonDisabled: PropTypes.bool,
};
FormContainer.defaultProps = {
  isButtonDisabled: false,
  buttonText: '',
  buttonPress: undefined,
};

export default FormContainer;

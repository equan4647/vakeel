import React from 'react';
import PropTypes from 'prop-types';

import { BottomButtonContainer, AppButton } from '..';
import { strings } from '../../utils/i18n';
import { ButtonView, Text } from '../../components';
import { AppStyles, Metrics } from '../../theme';
import styles from './styles';
import { View, ViewPropTypes } from 'react-native';

const BottomButton = ({
  title,
  onPress,
  onPressCancel,
  withContainer,
  style,
  ...rest
}) => {
  const Container = withContainer ? BottomButtonContainer : View;

  return (
    <Container style={[AppStyles.rowAligned, style]}>
      {onPressCancel ? (
        <ButtonView hitSlop={Metrics.hitSlop} onPress={onPressCancel}>
          <Text style={styles.cancel}>{strings('app.cancell')}</Text>
        </ButtonView>
      ) : null}

      <AppButton container={AppStyles.flex1} {...{ title, onPress, ...rest }} />
    </Container>
  );
};

BottomButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  onPressCancel: PropTypes.func,
  withContainer: PropTypes.bool,
  style: ViewPropTypes.style,
};

BottomButton.defaultProps = {
  title: strings('app.next'),
  onPressCancel: undefined,
  withContainer: true,
};

export default BottomButton;

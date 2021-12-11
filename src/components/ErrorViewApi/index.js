// @flow
import { View, StyleSheet, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { AppStyles, Metrics } from '../../theme';
import { strings } from '../../utils/i18n';
import { AppButton } from '../../common';
import { Text } from '..';

export default class ErrorViewApi extends React.PureComponent {
  static propTypes = {
    errorMessage: PropTypes.string.isRequired,
    onPressRetry: PropTypes.func.isRequired,
    containerStyle: ViewPropTypes.style,
  };

  static defaultProps = { containerStyle: {} };

  render() {
    const { errorMessage, onPressRetry, containerStyle } = this.props;
    return (
      <View
        style={[AppStyles.container, AppStyles.alignCenterView, containerStyle]}
      >
        <Text style={styles.errorMessage} size="size_18" color="warmGrey">
          {errorMessage}
        </Text>
        <AppButton
          onPress={onPressRetry}
          title={strings('api_error_messages.retry')}
          container={styles.button}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    width: '60%',
    textAlign: 'center',
    lineHeight: Metrics.ratio(24),
  },
  button: {
    paddingHorizontal: Metrics.ratio(20),
    marginTop: Metrics.baseMargin,
  },
});

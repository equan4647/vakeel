// @flow
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { AppStyles, Metrics } from '../../theme';
import { strings } from '../../utils/i18n';
import { Text } from '..';

export default class EmptyViewApi extends React.PureComponent {
  static propTypes = {
    emptyMessage: PropTypes.string,
  };

  static defaultProps = {
    emptyMessage: strings('api_error_messages.no_result_found'),
  };

  render() {
    const { emptyMessage } = this.props;
    return (
      <View style={[AppStyles.alignCenterView, AppStyles.container]}>
        <Text style={styles.message} size="size_18" color="warmGrey">
          {emptyMessage}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  message: {
    width: '60%',
    textAlign: 'center',
    lineHeight: Metrics.ratio(24),
  },
});

// @flow
import React from 'react';

import { ActivityIndicator, View } from 'react-native';

import { Colors } from '../../theme';

export default class BottomLoaderViewApi extends React.PureComponent {
  static defaultProps = {};

  render() {
    return (
      <View
        style={{ padding: 16, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  }
}

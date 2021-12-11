// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';

import { ButtonView, Text } from '..';
import { Images, Colors } from '../../theme';

export default class BottomErrorViewApi extends React.PureComponent {
  static defaultProps = {
    errorMessage: PropTypes.string.isRequired,
    onPressRetry: PropTypes.func.isRequired,
  };

  render() {
    const { errorMessage, onPressRetry } = this.props;
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image source={Images.images.alert} />
        <Text
          style={{ flex: 1, marginHorizontal: 12, textAlign: 'center' }}
          type="medium"
        >
          {errorMessage}
        </Text>
        <ButtonView
          onPress={onPressRetry}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: Colors.paleLilac,
            borderRadius: 4,
          }}
        >
          <Text>Retry</Text>
        </ButtonView>
      </View>
    );
  }
}

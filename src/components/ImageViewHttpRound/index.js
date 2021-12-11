// @flow
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { ImageViewHttp } from '../../components';
import { Metrics, Colors } from '../../theme';

export default class ImageViewHttpRound extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    size: PropTypes.any,
    borderRadius: PropTypes.any,
    borderWidth: PropTypes.number,
  };

  static defaultProps = {
    style: {},
    size: Metrics.ratio(60),
    borderRadius: undefined,
    borderWidth: 1,
  };

  render() {
    const { style, borderWidth, size, borderRadius, ...rest } = this.props;

    const imageStyle = StyleSheet.flatten([
      {
        width: size,
        height: size,
        borderRadius: borderRadius || size / 2,
        borderWidth,
        borderColor: Colors.lightBlueGrey,
      },
      style,
    ]);

    return (
      <ImageViewHttp
        style={imageStyle}
        borderRadius={borderRadius || size / 2}
        placeholderStyle={{ width: size / 2, height: size / 2 }}
        {...rest}
      />
    );
  }
}

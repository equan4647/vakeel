// @flow
import ImageLoad from 'react-native-image-placeholder';
import PropTypes from 'prop-types';
import React from 'react';

import Image from '../Image';

export default class ImageViewHttp extends React.PureComponent {
  static propTypes = {
    // placeholderSource
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    isShowActivity: PropTypes.bool,
    url: PropTypes.any,
    isLocal: PropTypes.bool,
    cache: PropTypes.string,
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    isShowActivity: false,
    url: '',
    style: {},
    isLocal: false,
    cache: 'default',
  };

  render() {
    const { isShowActivity, cache, url, isLocal, source, ...rest } = this.props;

    if (isLocal) {
      return <Image {...rest} source={url} />;
    }

    return url || source ? (
      <ImageLoad
        isShowActivity={isShowActivity}
        source={source ?? { uri: url, cache }}
        {...rest}
      />
    ) : (
      <ImageLoad {...rest} isShowActivity={false} source={{ uri: 'dummy' }} />
    );
  }
}

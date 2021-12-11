import PropTypes from 'prop-types';
import React from 'react';
import { ViewPropTypes } from 'react-native';

import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import styles from './styles';

const EmptyViewCarousel = ({ message, style }) => {
  return (
    <Text style={[styles.emptyView, style]} type="medium" size="size_15">
      {message}
    </Text>
  );
};

EmptyViewCarousel.propTypes = {
  message: PropTypes.string,
  style: ViewPropTypes.style,
};
EmptyViewCarousel.defaultProps = { message: strings('app.no_data_found') };

export default EmptyViewCarousel;

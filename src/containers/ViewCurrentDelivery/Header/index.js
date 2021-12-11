import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../../../components';
import styles from './styles';

const Header = ({ title }) => {
  return (
    <View style={styles.header}>
      <Text color="white" type="semiBold">
        {title}
      </Text>
    </View>
  );
};

Header.propTypes = { title: PropTypes.string.isRequired };
Header.defaultProps = {};

export default React.memo(Header);

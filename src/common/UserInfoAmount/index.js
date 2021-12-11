import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text, ImageViewHttpRound } from '../../components';
import styles from './styles';
import { AppUtil } from '../../utils';

const UserInfoAmount = ({ source, username, price, style }) => (
  <View style={styles.container}>
    <View style={styles.userContainer}>
      {username ? (
        <>
          <ImageViewHttpRound url={source} size={30} style={styles.userImage} />
          <Text style={styles.userName}>{username}</Text>
        </>
      ) : null}
    </View>

    <Text style={styles.price}>{AppUtil.formatPrice(price)}</Text>
  </View>
);

UserInfoAmount.propTypes = {
  style: ViewPropTypes.style,
  source: PropTypes.any.isRequired,
  username: PropTypes.string.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
UserInfoAmount.defaultProps = { style: {} };

export default UserInfoAmount;

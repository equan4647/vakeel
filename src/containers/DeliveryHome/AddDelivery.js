import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { AppStyles, Images } from '../../theme';
import { AppUtil, NavigationService } from '../../utils';
import { Text, Image } from '../../components';
import { strings } from '../../utils/i18n';
import { AppButton } from '../../common';
import styles from './styles';

const AddDelivery = () => {
  const bookBringer = () =>
    AppUtil.doIfAuthorized(() =>
      NavigationService.navigate('AddDelivery', undefined, 'AddDeliveryStack')
    );

  return (
    <View style={AppStyles.container}>
      <View style={AppStyles.flex1}>
        <Image source={Images.icons.deliveryIcon} />

        <Text style={styles.text}>{strings('app.delivery_home')}</Text>
      </View>

      <AppButton
        container={styles.button}
        title={strings('app.book_a_bringer')}
        onPress={bookBringer}
      />
    </View>
  );
};

AddDelivery.propTypes = {
  onDeliveryAdded: PropTypes.func,
};

AddDelivery.defaultProps = { onDeliveryAdded: undefined };

export default AddDelivery;

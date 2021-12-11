import { ScrollView } from 'react-native';
import React from 'react';

import { ImageViewHttp } from '../../../components';
import { Metrics } from '../../../theme';
import styles from './styles';
import { useSelector } from 'react-redux';
import { deliverySelectors } from '../../../ducks/delivery';
import { DeliveryUtil } from '../../../DataUtils';

const DeliveryImages = () => {
  const currentDelivery = useSelector(deliverySelectors.getActiveOrder);

  if (DeliveryUtil.packageImages(currentDelivery).length > 0) {
    return (
      <ScrollView
        horizontal
        contentContainerStyle={styles.imagesContainer}
        directionalLockEnabled
      >
        {DeliveryUtil.packageImages(currentDelivery)?.map((imgURL, index) => (
          <ImageViewHttp
            url={imgURL}
            style={styles.image}
            key={index.toString()}
            borderRadius={Metrics.ratio(8)}
            placeholderStyle={styles.placeholderStyle}
          />
        ))}
      </ScrollView>
    );
  } else {
    return null;
  }
};

export default React.memo(DeliveryImages);

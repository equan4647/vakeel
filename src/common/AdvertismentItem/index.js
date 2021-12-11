import { View, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

import {
  Text,
  ButtonView,
  Image,
  ImageViewHttpBackground,
} from '../../components';
import styles from './styles';
import { advertisingSelectors } from '../../ducks/advertising';
import { AdvertisingUtil } from '../../DataUtils';
import { Metrics } from '../../theme';
import { AppUtil } from '../../utils';
import { strings } from '../../utils/i18n';

const AdvertismentItem = props => {
  const { advertisingItem, onPress } = props;

  // const advertisingItem = useSelector(
  //   advertisingSelectors.getAdvertisementItem(item)
  // );

  const onCallNowPress = () => {
    AppUtil.call(AdvertisingUtil.phone(advertisingItem));
  };

  const onVisitWebsitePress = () => {
    AppUtil.openWebUrl(AdvertisingUtil.website(advertisingItem));
  };

  const renderButton = (btnTitle, btnOnPress) => {
    return (
      <ButtonView onPress={btnOnPress} style={styles.button}>
        <Text style={styles.btnText}>{btnTitle}</Text>
      </ButtonView>
    );
  };

  const renderSeperator = () => {
    return <View style={styles.seperator} />;
  };

  return (
    <ButtonView onPress={() => onPress(advertisingItem.id)} style={{}}>
      <Text style={styles.title}>{AdvertisingUtil.title(advertisingItem)}</Text>
      <Text style={styles.addType}>{strings('app.sponsored')}</Text>
      <ImageViewHttpBackground
        url={AdvertisingUtil.image(advertisingItem)}
        containerStyle={styles.image}
        width={Metrics.scale(335)}
        height={Metrics.ratio(222)}
      />
      <Text numberOfLines={2} style={styles.description}>
        {AdvertisingUtil.description(advertisingItem)}
      </Text>
      <View style={styles.buttonsContainer}>
        {renderButton('Call Now', onCallNowPress)}
        {renderSeperator()}
        {renderButton('Visit Website', onVisitWebsitePress)}
      </View>
    </ButtonView>
  );
};

export default AdvertismentItem;

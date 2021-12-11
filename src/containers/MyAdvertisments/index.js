import { View } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

import { AdvertismentList } from '../../common';
import { AppUtil, DataHandler, NavigationService } from '../../utils';
import { advertismentData } from '../../data';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { IDENTIFIERS } from '../../config/Constants';
import { authSelectors } from '../../ducks/auth';

const MyAdvertisments = ({ navigation }) => {
  const onAddAdsPress = () =>
    AppUtil.doIfAuthorized(() => {
      DataHandler.resetAdvertisingInfo({});
      NavigationService.navigate('AdvertismentAddStack');
    });

  const user_id = useSelector(authSelectors.getUserID);

  NavigationService.setAddHeader(
    navigation,
    strings('app.my_advertisements'),
    onAddAdsPress
  );
  return (
    <View style={AppStyles.flex}>
      <AdvertismentList
        isMyAds
        data={advertismentData}
        identifier={IDENTIFIERS.MY_ADVERTISING_LIST}
        payload={{ creator_type: 'basic', user_id }}
      />
    </View>
  );
};

export default MyAdvertisments;

import { useSelector } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';
import React from 'react';

import { AppStyles } from '../../theme';
import { AdvertismentList, EmptyView } from '../../common';
import { AppUtil, NavigationService } from '../../utils';
import { advertismentData } from '../../data';
import { IDENTIFIERS, MODULE } from '../../config/Constants';
import { getLastLocation } from '../../ducks/location/selectors';
import { strings } from '../../utils/i18n';
import { getRadius } from '../../ducks/radius/selectors';

const Advertisments = ({ navigation }) => {
  const lastLocation = useSelector(getLastLocation(MODULE.ADVERTISMENT));
  const radius = useSelector(getRadius(MODULE.ADVERTISMENT));

  const onMyAdsPress = () =>
    AppUtil.doIfAuthorized(() =>
      NavigationService.navigate('MyAdvertisments', {
        myAds: true,
      })
    );

  NavigationService.setAdvertismentHeader(navigation, onMyAdsPress);

  const renderEmptyView = () => {
    return (
      <View style={AppStyles.flex}>
        <EmptyView
          text={strings('app.empty_text_view_buying')}
          arrowTowards="left"
        />
      </View>
    );
  };

  const renderContent = () => {
    return (
      <AdvertismentList
        identifier={IDENTIFIERS.ADVERTISING_LIST}
        data={advertismentData}
        payload={{ lat: lastLocation.lat, long: lastLocation.lng, radius }}
      />
    );
  };

  return (
    <View style={AppStyles.flex}>
      {_.isEmpty(lastLocation) ? renderEmptyView() : renderContent()}
    </View>
  );
};

export default Advertisments;

import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState, useRef } from 'react';

import { AdvertismentItem } from '..';

import { DataHandler, NavigationService, Util } from '../../utils';
import styles from './styles';
import EmptyView from '../EmptyView';
import { strings } from '../../utils/i18n';
import { FlatListApi } from '../../components';
import {
  advertisingSelectors,
  advertisingActions,
} from '../../ducks/advertising';
import { requestFlagSelectors } from '../../ducks/requestFlags';

const viewabilityConfig = {
  itemVisiblePercentThreshold: 100,
};

const AdvertismentList = ({ data, isMyAds, identifier, payload }) => {
  const [viewableAds, setViewableAds] = useState([]);

  const dispatch = useDispatch();

  const advertisingList = useSelector(
    advertisingSelectors.getAdvertisingList(identifier)
  );

  const advertisingItem = useSelector(
    advertisingSelectors.getAdvertisementData
  );

  // reset list when unamount
  React.useEffect(() => {
    return () => {
      dispatch(advertisingActions.resetAdvertismentList(identifier));
    };
  }, []);

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`ADVERTISING_LIST_${identifier}`)
  );

  const onItemPress = id => {
    NavigationService.navigate('AdvertismentDetail', {
      isMyAds,
      id,
    });
  };

  const onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (!Util.isEmpty(changed)) {
      changed.forEach(item => {
        const data = DataHandler.getStore().getState().advertising.data;
        const isViewed = data[item.key]?.is_viewed ?? 0;
        if (item.isViewable && !viewableAds.includes(item.key) && !isViewed) {
          const viewable = viewableAds.push(item.key);
          setViewableAds(viewableAds);
          dispatch(
            advertisingActions.requestAdvertismentView({
              advertisement_id: item.key,
            })
          );
        }
      });
    }
  };
  const renderEmptyView = () => {
    return isMyAds ? (
      <EmptyView
        image="ads"
        containerStyle={styles.emptyView}
        indented
        text={strings('app.advertise_empty_text')}
      />
    ) : (
      <EmptyView
        image="ads"
        arrowTowards="left"
        containerStyle={styles.emptyView}
        indented
        text={strings('app.advertisment_empty_text')}
      />
    );
  };

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  const rest = isMyAds
    ? {}
    : {
        viewabilityConfigCallbackPairs: viewabilityConfigCallbackPairs.current,
      };

  return (
    <FlatListApi
      // viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      // onViewableItemsChanged={onViewableItemsChanged}
      data={advertisingList}
      extraData={advertisingList}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={renderEmptyView}
      contentContainerStyle={styles.contentContainerStyle}
      requestAction={advertisingActions.requestAdvertisingListing}
      ItemSeparatorComponent={() => <View style={styles.separatorStyle} />}
      keyExtractor={item => `${item}`}
      renderItem={({ item, index }) => {
        const data = advertisingItem[item];
        return (
          <AdvertismentItem advertisingItem={data} onPress={onItemPress} />
        );
      }}
      {...{
        requestFlags,
        payload,
        // listStyle,
        // contentContainerStyle,
        identifier,
        // filters,
      }}
      {...rest}
    />
  );
};

export default AdvertismentList;

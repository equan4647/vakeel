import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { AdvertismentItem } from '..';
import { advertisingActions } from '../../ducks/advertising';
import { NavigationService, Util } from '../../utils';
import { LoaderViewApi } from '../../components';
import styles from './styles';

const Advertise = ({ location, module, radius, style }) => {
  const [data, setData] = useState({});
  const [loader, setLoader] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    requestAdvertisment();
  }, []);

  const onItemPress = id => {
    NavigationService.navigate('AdvertismentDetail', {
      id,
    });
  };

  const requestAdvertisment = () => {
    const payload = {
      module_type: module,
      long: location?.lng,
      lat: location?.lat,
      radius,
      single_advertisement: 1,
    };

    dispatch(
      advertisingActions.requestSingleAdvertisment(
        payload,
        onSuccess,
        onFailure
      )
    );
  };

  const onSuccess = data => {
    const { id, is_viewed } = data;
    setData(data);
    setLoader(false);
    is_viewed === '0' && requestViewItem(id);
  };

  const requestViewItem = id => {
    dispatch(
      advertisingActions.requestAdvertismentView({
        advertisement_id: id,
      })
    );
  };

  const onFailure = () => {
    setLoader(false);
  };

  const renderLoader = () => {
    return <LoaderViewApi style={styles.loader} />;
  };

  const renderContent = () => {
    return (
      <View style={[styles.content, style]}>
        <AdvertismentItem advertisingItem={data} onPress={onItemPress} />
      </View>
    );
  };

  return (
    <>
      {loader && renderLoader()}
      {!Util.isEmpty(data) && renderContent()}
    </>
  );
};

export default Advertise;

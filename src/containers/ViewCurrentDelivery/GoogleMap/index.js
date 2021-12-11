import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { Image, PixelRatio, Platform } from 'react-native';

import { AppStyles, Metrics } from '../../../theme';
import { deliverySelectors } from '../../../ducks/delivery';
import { DeliveryUtil } from '../../../DataUtils';
import { populateMap } from '../../../utils/DeliveryRoomHelper';
import { COORDINATES_DELTA } from '../../../config/Constants';
import styles from './styles';
import { Util } from '../../../utils';

const edgePadding = {
  top: Platform.select({
    ios: Metrics.screenHeight * 0.375,
    android: PixelRatio.getPixelSizeForLayoutSize(Metrics.screenHeight * 0.375),
  }),
  bottom: Platform.select({
    ios: Metrics.screenHeight * 0.35,
    android: PixelRatio.getPixelSizeForLayoutSize(Metrics.screenHeight * 0.35),
  }),

  right: Metrics.scale(40),
  left: Metrics.ratio(40),
};

const GoogleMap = () => {
  const currentDelivery = useSelector(deliverySelectors.getActiveOrder);
  const mapRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (mapRef && mapRef.current) {
        mapRef.current.fitToSuppliedMarkers(
          populateMap(currentDelivery).markerIDs,
          { edgePadding, animated: true }
        );
      }
    }, 500);
  }, [DeliveryUtil.driverLocation(currentDelivery)]);

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={AppStyles.flex1}
      ref={mapRef}
      // initialRegion={{
      //   ...DeliveryUtil.driverLocation(currentDelivery),
      //   ...COORDINATES_DELTA,
      // }}
    >
      {populateMap(currentDelivery).markers.map((marker, index) => {
        if (!marker.latlong?.latitude || !marker.latlong?.longitude) {
          return null;
        }
        return (
          <Marker
            key={index}
            identifier={marker.id}
            coordinate={marker.latlong}
          >
            <Image
              source={marker.icon}
              resizeMode="contain"
              style={marker.id === 'driver' ? styles.marker : styles.pin}
            />
          </Marker>
        );
      })}
    </MapView>
  );
};

GoogleMap.propTypes = {};
GoogleMap.defaultProps = {};

export default React.memo(GoogleMap);

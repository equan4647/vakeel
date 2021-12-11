import { View } from 'react-native';
import React from 'react';

import { InlineMaps, OpaqueBack } from '../../common';
import { NavigationService } from '../../utils';
import styles from './styles';

const MapViewFullScreen = ({ navigation, route }) => {
  // hide header
  NavigationService.hideHeader(navigation);

  const latitude = route?.params?.latitude ?? 0;
  const longitude = route?.params?.longitude ?? 0;

  return (
    <>
      <InlineMaps
        isFullScreen={true}
        latitude={latitude}
        longitude={longitude}
      />
      <View style={styles.header}>
        <OpaqueBack />
      </View>
    </>
  );
};

export default MapViewFullScreen;

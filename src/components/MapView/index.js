import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {Metrics, Images} from '../../theme';
import {Image} from 'react-native';

export default () => (
  <>
    <MapView
      style={{flex: 1}}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 34.0937458,
        longitude: -118.3614976,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
      // onMapReady={}
      showsUserLocation
      showsMyLocationButton
      toolbarEnabled={false}
      showsCompass={false}>
      <Marker
        coordinate={{
          latitude: 34.0937458,
          longitude: -118.3614976,
        }}
        title={'marker.title'}
        description={'marker.description'}>
        <Image source={Images.icons.marker} />
      </Marker>
    </MapView>
  </>
);

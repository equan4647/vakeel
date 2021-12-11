import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { NavigationService } from '../../utils';
import { ButtonView } from '../../components';
import { CustomMarker } from '../../common';
import { Metrics } from '../../theme';
import styles from './styles';

const InlineMaps = ({ latitude, longitude, isFullScreen }) => {
  const [loading, setLoading] = React.useState(true);
  const loadingTime = isFullScreen ? 300 : 1000;

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, loadingTime);
  }, []);

  const height = isFullScreen ? Metrics.screenHeight : Metrics.inlineMapHeight;
  const customStyle = isFullScreen
    ? { borderRadius: 0, height }
    : {
        borderRadius: Metrics.borderRadius12,
        height,
        marginTop: Metrics.ratio(17),
      };
  const markerSize = isFullScreen ? Metrics.ratio(60) : Metrics.ratio(30);
  const pointerEvents = isFullScreen ? 'auto' : 'box-only';
  //const TagView = isFullScreen ? View : ButtonView;

  const lat = Number(latitude);
  const long = Number(longitude);

  const renderMap = () => {
    return (
      <View
        pointerEvents={pointerEvents}
        style={[styles.container, customStyle]}
      >
        {!loading && (
          <MapView
            liteMode={true}
            provider={PROVIDER_GOOGLE}
            style={{ height }}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <CustomMarker latitude={lat} longitude={long} size={markerSize} />
          </MapView>
        )}
      </View>
    );
  };

  if (isFullScreen) {
    return renderMap();
  }

  return (
    <ButtonView
      onPress={() => {
        NavigationService.navigate('MapViewFullScreen', {
          latitude,
          longitude,
        });
      }}
    >
      {renderMap()}
    </ButtonView>
  );
};

CustomMarker.propTypes = {
  latitude: PropTypes.any,
  longitude: PropTypes.any,
  isFullScreen: PropTypes.bool,
};
CustomMarker.defaultProps = {
  latitude: 0,
  longitude: 0,
  isFullScreen: false,
};

export default InlineMaps;

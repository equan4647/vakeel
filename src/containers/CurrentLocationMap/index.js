import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import React, { useEffect, useState } from 'react';
import { Keyboard, View } from 'react-native';
import _ from 'lodash';

import {
  GeocodeUtil,
  LocationUtil,
  NavigationService,
  Util,
} from '../../utils';
import { ActionButton, BottomButton, SearchInput } from '../../common';
import { COORDINATES_DELTA, SEARCH_KEY_INTERVAL } from '../../config/Constants';
import { ButtonView, Text } from '../../components';
import { AppStyles, Images } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';

const initialRegion = {
  latitude: 38.51071190035911,
  longitude: -101.53413696214557,
  ...COORDINATES_DELTA,
};

const CurentLocationMap = ({ navigation, route }) => {
  // set header
  NavigationService.setTitle(navigation, strings('app.set_location_on_map'));
  // NavigationService.hideHeader(navigation);

  const location = route?.params?.location ?? {};

  const initialRegionMap = Util.isEmpty(location)
    ? initialRegion
    : {
        latitude: location?.lat ?? 0,
        longitude: location?.lng ?? 0,
        ...COORDINATES_DELTA,
      };

  // set state
  const [isLoading, setLoading] = useState(true);
  const [inputText, setInputText] = useState(location?.formattedAddress ?? '');
  const [suggestionList, setSuggestionList] = useState([]);
  const [coordinate, setCoordinate] = useState(initialRegionMap);
  const [address, setAddress] = useState(location ?? '');
  const [isRegionComplete, setIsRegionComplete] = useState(false);
  const interval = React.useRef();
  const mapRef = React.useRef();
  const searchRef = React.useRef();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const setCoordinateMap = (region, animate = true) => {
    setCoordinate(region);

    if (animate && !isLoading) {
      mapRef.current.animateToRegion({ ...region, ...COORDINATES_DELTA }, 1);
    }
  };

  const saveAndDisplayAddress = info => {
    setInputText(info?.formattedAddress);
    setAddress(info);
  };

  /*on region change*/
  const onRegionChangeComplete = region => {
    setCoordinateMap(region, false);

    if (isRegionComplete) {
      GeocodeUtil.getAddressObject(
        { lat: region.latitude, lng: region.longitude },

        (result, isSuccess) => {
          if (isSuccess) {
            saveAndDisplayAddress(result);
          }
        }
      );
    } else {
      setIsRegionComplete(true);
    }
  };

  /* current location*/
  const selectCurrentLocation = () =>
    LocationUtil.getCurrentLocation(locationobj => {
      setIsRegionComplete(false);
      setCoordinateMap({
        latitude: locationobj.lat,
        longitude: locationobj.lng,
      });
      saveAndDisplayAddress(locationobj);
    });

  const onSearch = text => {
    setInputText(text);

    // remove old interval text
    if (interval.current) {
      clearInterval(interval.current);
    }

    if (text !== '') {
      // set interval for text seacrh request
      interval.current = setTimeout(() => {
        GeocodeUtil.searchAutoSuggestPlacesList(text, (result, isSuccess) => {
          if (isSuccess) {
            setSuggestionList(result);
          }
        });
      }, SEARCH_KEY_INTERVAL);
    }
  };

  const onPressSuggestion = listItem => {
    setInputText(listItem?.address);
    setSuggestionList([]);
    Keyboard.dismiss();

    GeocodeUtil.getAddressObject(
      { place_id: listItem.place_id },

      (location_Obj, success) => {
        location_Obj.formattedAddress = listItem.address;
        if (success) {
          const newRegion = {
            latitude: location_Obj.lat,
            longitude: location_Obj.lng,
          };
          setIsRegionComplete(false);
          setCoordinateMap(newRegion);
          setAddress(location_Obj);
        }
      }
    );
  };

  useEffect(() => {
    if (!isLoading && Util.isEmpty(location)) {
      LocationUtil.getCurrentLocation(locationobj =>
        setCoordinateMap({
          latitude: locationobj.lat,
          longitude: locationobj.lng,
        })
      );
    }
  }, [mapRef.current]);

  console.log({ address });

  return (
    <View style={AppStyles.flex}>
      {isLoading ? (
        <View style={AppStyles.flex} />
      ) : (
        <View style={styles.container}>
          <View style={styles.circle} />

          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={coordinate}
            onRegionChangeComplete={onRegionChangeComplete}
            ref={mapRef}
          />
        </View>
      )}

      <SearchInput
        forwardRef={searchRef}
        style={styles.searchInput}
        value={inputText}
        onSearch={onSearch}
        onClear={() => setInputText('')}
        clearButton
        customImageProps={{
          source: Images.icons.locationBlack,
          style: {},
        }}
      />

      {suggestionList.length > 0 ? (
        <View style={styles.suggestionContainer}>
          {suggestionList.map((item, index) => (
            <ButtonView
              key={index}
              style={styles.suggesttionItem}
              debounceTime={500}
              onPress={() => onPressSuggestion(item)}
            >
              <Text>{item?.address}</Text>
            </ButtonView>
          ))}
        </View>
      ) : null}

      <ActionButton
        type="current-location"
        containerStyle={styles.actionButton}
        onPress={selectCurrentLocation}
      />

      <BottomButton
        title={strings('app.done')}
        onPress={() => route.params?.onSave?.(address)}
        disabled={_.isEmpty(address)}
        debounceTime={500}
      />
    </View>
  );
};

export default CurentLocationMap;

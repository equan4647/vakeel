import { View, ScrollView, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';

import {
  NavigationService,
  GeocodeUtil,
  LocationUtil,
  DataHandler,
  Util,
} from '../../utils';
import {
  CurrentLocationButton,
  SearchInput,
  SearchSuggestionList,
} from '../../common';
import { SEARCH_INPUT_TYPE, SEARCH_KEY_INTERVAL } from '../../config/Constants';
import { KeyboardSpacer, ErrorViewApi } from '../../components';
import { AppStyles, Images } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';

import { getRecentLocations } from '../../ducks/location/selectors';
import { addRecentLocation } from '../../ducks/location/actions';

const LocationSearch = ({ navigation, route }) => {
  // get params
  const titleScreen = route.params?.title ?? strings('app.location');
  const locationOnMap = route.params?.locationOnMap ?? false;
  const selectedLocation = route.params?.selectedLocation ?? {};
  const searchImageProps = route.params?.searchImageProps ?? {};
  const recentLocations = useSelector(getRecentLocations);
  const searchPlaceholder =
    route.params?.searchPlaceholder ?? strings('app.search_placeholder');

  // dispatch const
  const dispatch = useDispatch();

  // set cross backhandler
  NavigationService.setCrossBackHeader(navigation, titleScreen);

  // set local state
  const [autoSuggestList, setAutoSuggestList] = React.useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = React.useState(false);
  const interval = React.useRef();

  // clear interval on unmount
  React.useEffect(() => {
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  // search inputs
  const onSearch = text => {
    // set text
    setSearchValue(text);

    // set auto suggest list if serach text is empty
    if (text === '') {
      setErrorMessage('');
      setAutoSuggestList([]);
    }

    // set loading
    setLoading(text === '' ? false : true);

    // remove old interval text
    if (interval.current) {
      clearInterval(interval.current);
    }

    if (text !== '') {
      // set interval for text seacrh request
      interval.current = setTimeout(() => {
        //code
        GeocodeUtil.searchAutoSuggestPlacesList(text, (result, isSuccess) => {
          if (isSuccess) {
            setErrorMessage('');
            setAutoSuggestList(result);
            setLoading(false);
          } else {
            setLoading(false);
            setErrorMessage(result);
            setAutoSuggestList([]);
          }
        });
      }, SEARCH_KEY_INTERVAL);
    }
  };
  const onClear = () => onSearch('');

  // set current location button title and text
  const location = locationOnMap ? '' : '';
  const title = locationOnMap
    ? strings('app.set_location_on_map')
    : strings('app.use_current_location');
  const locationButtonStyle = locationOnMap
    ? styles.locationButtonStyleMap
    : styles.locationButtonStyle;

  // on current location press
  const onPressLocation = () => {
    if (locationOnMap) {
      NavigationService.navigate('CurrentLocationMap', {
        onSave: locationInfo => {
          NavigationService.popToTop();
          NavigationService.pop();
          route.params?.onSelect(locationInfo);
          dispatch(addRecentLocation(locationInfo));
        },
        location: selectedLocation,
      });
    } else {
      LocationUtil.getCurrentLocation(locationobj => {
        // pop screen
        NavigationService.pop();
        // call callback
        route.params?.onSelect(locationobj);

        // add in recent locations
        dispatch(addRecentLocation(locationobj));
      });
    }
  };

  // on location selected
  const onSelectAutoSuggest = data => {
    // auto suggest location press

    if (data.place_id) {
      Keyboard.dismiss();
      DataHandler.getTopLoaderRef().show();
      const payload = { place_id: data.place_id };
      GeocodeUtil.getAddressObject(payload, (info, success) => {
        info.formattedAddress = data.address;
        DataHandler.getTopLoaderRef().hide();
        if (success) {
          // pop and call callback
          NavigationService.pop();
          route.params?.onSelect(info);

          // add in recent locations
          dispatch(addRecentLocation(info));
        } else {
          Util.showMessage(info);
        }
      });
    } else {
      // recent location is presssed
      NavigationService.pop();
      route.params?.onSelect?.(data);
    }
  };

  // render search input
  const renderSearchInput = () => {
    return (
      <SearchInput
        image={Images.icons.locationSearch}
        style={styles.inputStyle}
        {...{ onSearch, onClear }}
        returnKeyType="done"
        value={searchValue}
        clearButton
        customImageProps={searchImageProps}
        placeholder={searchPlaceholder}
        onSubmit={Keyboard.dismiss}
      />
    );
  };

  // render search input
  const renderCurrentLocationButton = () => {
    if (searchValue.length) {
      return null;
    }
    return (
      <CurrentLocationButton
        style={locationButtonStyle}
        location={location}
        title={title}
        onPress={onPressLocation}
      />
    );
  };

  const renderSuggestList = () => {
    const _data = searchValue.length ? autoSuggestList : recentLocations;
    const titleKey = searchValue.length ? 'address' : 'formattedAddress';

    if (errorMessage !== '' && searchValue.length > 0) {
      return (
        <ErrorViewApi
          errorMessage={errorMessage}
          onPressRetry={() => {
            onSearch(searchValue);
          }}
          containerStyle={styles.errorView}
        />
      );
    }

    //if (_data.length > 0) {

    const emptyViewText =
      loading === false && searchValue.length > 0 && _data.length === 0
        ? strings('app.no_data_found')
        : '';

    console.log('_data', _data);

    return (
      <SearchSuggestionList
        type={
          searchValue.length
            ? SEARCH_INPUT_TYPE.SEARCH
            : SEARCH_INPUT_TYPE.LOCATION
        }
        data={_data}
        title={searchValue.length ? undefined : strings('app.recent_locations')}
        contentContainerStyle={AppStyles.flex1}
        style={searchValue.length ? {} : styles.listStyle}
        onPress={onSelectAutoSuggest}
        titleKey={titleKey}
        emptyViewText={emptyViewText}
      />
    );
    //}
    //return null;
  };

  return (
    <View style={AppStyles.container}>
      {renderSearchInput()}
      <ScrollView
        style={[AppStyles.backgroundColor, AppStyles.flex1]}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={AppStyles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        {renderCurrentLocationButton()}
        {renderSuggestList()}
        <KeyboardSpacer />
      </ScrollView>
    </View>
  );
};

export default LocationSearch;

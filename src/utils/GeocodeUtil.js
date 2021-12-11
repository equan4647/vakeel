// @flow
import Geocoder from 'react-native-geocoding';

import { GOOGLE_API_KEY } from '../config/Constants';
import DataHandler from './DataHandler';
import { strings } from './i18n';

function initLibrary() {
  Geocoder.init(GOOGLE_API_KEY);
}

function getAddressObject(params, callback) {
  /*
  callback(
    {
      city: 'karachi',
      state: 'Sindh',
      country: 'Pakistan',
      formattedAddress: 'karachi new nipa',
      lat: 24.87194,
      lng: 66.98806,
    },
    true
  );

  return null;
    */

  Geocoder.from(params)
    .then(json => {
      if (json.results && json.results.length > 0) {
        const result = json.results[0];

        console.log('result', result);

        const {
          city,
          state,
          country,
          areaAddress,
        } = getCityStateCountryFromResult(result);
        const formattedAddress = getFormattedAddressFromResult(result);
        const { lat, lng } = getLatLngFromResult(result);

        const addressObject = {
          city,
          state,
          country,
          formattedAddress,
          lat,
          lng,
          areaAddress,
        };

        console.log('addressObject', addressObject);

        callback(addressObject, true);
      } else {
        callback(strings('api_error_messages.no_result_found'), false);
      }
    })
    .catch(error => {
      console.log('error response', error);

      const errorMessage = getErrorMessage();
      callback(errorMessage, false);
    });
}

function searchAutoSuggestPlacesList(searchText, callback) {
  // Search by address
  Geocoder.autoSuggestList(searchText)
    .then(json => {
      const searchResults = [];
      if (json.predictions && json.predictions.length > 0) {
        const results = json.predictions;

        console.log('results', results);

        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          searchResults.push({
            address: result?.description
              ? result?.description.replace('،', ',')
              : '',
            place_id: result?.place_id ?? '',
          });
        }
      }
      callback(searchResults, true);
    })
    .catch(error => {
      if (error && error.code === 4) {
        callback([], true);
      } else {
        const errorMessage = getErrorMessage();
        callback(errorMessage, false);
      }
    });
}

function getCityStateCountryFromResult(result) {
  let city = '';
  let state = '';
  let country = '';
  let adressComponents = [];

  const { address_components } = result;

  address_components.forEach(object1 => {
    const { types, long_name } = object1;
    types.forEach(type => {
      switch (type) {
        case 'locality':
          city = long_name;
          adressComponents.push(long_name);
          break;
        case 'administrative_area_level_1':
          state = long_name;
          adressComponents.push(long_name);
          break;
        case 'country':
          country = long_name;
          adressComponents.push(long_name);
          break;
        // case 'administrative_area_level_2':
        //   adressComponents.push(result.address_components[i].long_name);
        //   break;
        case 'sublocality_level_2':
        case 'sublocality_level_1':
          adressComponents.push(long_name);
          break;
      }
    });
  });

  /*
  for (let i = 0; i < result.address_components.length; i++) {
    for (let j = 0; j < result.types.length; j++) {
      console.log(
        'type',
        result.address_components[i],
        result.address_components[i].types[j]
      );
      switch (result.address_components[i].types[j]) {
        case 'locality':
          city = result.address_components[i].long_name;
          adressComponents.push(result.address_components[i].long_name);
          break;
        case 'administrative_area_level_1':
          state = result.address_components[i].long_name;
          adressComponents.push(result.address_components[i].long_name);
          break;
        case 'country':
          country = result.address_components[i].long_name;
          adressComponents.push(result.address_components[i].long_name);
          break;
        // case 'administrative_area_level_2':
        //   adressComponents.push(result.address_components[i].long_name);
        //   break;
        case 'sublocality_level_2':
        case 'sublocality_level_1':
        case 'neighborhood':
          adressComponents.push(result.address_components[i].long_name);
          break;
      }
    }

  }
  */

  return { city, state, country, areaAddress: adressComponents.join(', ') };
}

function getLatLngFromResult(result) {
  const lat = result?.geometry?.location?.lat ?? 0;
  const lng = result?.geometry?.location?.lng ?? 0;
  return { lat, lng };
}

function getFormattedAddressFromResult(result) {
  const formattedAddress = result?.formatted_address ?? '';
  return formattedAddress;
}

function getErrorMessage() {
  const errorMessage = DataHandler.getIsInternetConnected()
    ? strings('api_error_messages.something_went_wrong')
    : strings('api_error_messages.network_not_available');
  return errorMessage;
}

export default {
  initLibrary,
  getCityStateCountryFromResult,
  searchAutoSuggestPlacesList,
  getLatLngFromResult,
  getFormattedAddressFromResult,
  getErrorMessage,
  getAddressObject,
};

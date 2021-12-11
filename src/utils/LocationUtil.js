// @flow
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { Linking } from 'react-native';

import GeocodeUtil from './GeocodeUtil';
import DataHandler from './DataHandler';
import { strings } from './i18n';
import Util from './Util';

function getCurrentLocation(
  onLocationSelected,
  showLoader = true,
  getAddress = true
) {
  // permission id
  const permissionId = Util.isPlatformAndroid()
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;

  // request location
  request(permissionId).then(result => {
    if (result === RESULTS.GRANTED) {
      if (showLoader) {
        DataHandler.getTopLoaderRef().show();
      }

      Geolocation.getCurrentPosition(
        position => {
          const lat = position?.coords?.latitude ?? 0;
          const lng = position?.coords?.longitude ?? 0;
          if (getAddress) {
            GeocodeUtil.getAddressObject({ lat, lng }, (info, success) => {
              if (showLoader) {
                DataHandler.getTopLoaderRef().hide();
              }
              if (success) {
                onLocationSelected(info);
              } else {
                Util.showMessage(info);
              }
            });
          } else {
            if (showLoader) {
              DataHandler.getTopLoaderRef().hide();
              onLocationSelected({ lat, lng });
            }
          }
        },
        error => {
          if (showLoader) {
            DataHandler.getTopLoaderRef().hide();
          }
          Util.showMessage(error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      //console.log('get current location');
    } else if (result === RESULTS.UNAVAILABLE || result === RESULTS.BLOCKED) {
      Util.showAlertConfirm(
        strings('permissions.permission_title_location'),
        strings('permissions.permission_description_location'),
        strings('permissions.open_settings'),
        () => {
          if (Util.isPlatformAndroid()) {
            Linking.openSettings();
          } else {
            Linking.openURL('App-Prefs:LOCATION_SERVICES');
          }
        }
      );
    }
  });
}

export default {
  getCurrentLocation,
};

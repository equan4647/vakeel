// import {Platform} from 'react-native';
// import BackgroundGeolocation, {
//   AuthorizationStatus,
//   LocationError,
// } from 'react-native-background-geolocation';
// import {PERMISSIONS} from 'react-native-permissions';

// import PermissionUtils from './PermissionUtils';

// const getCustomLocationPermission = (cancelable: Boolean = false) =>
//   PermissionUtils.checkPermission(
//     () => null,
//     Platform.select({
//       ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
//       android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
//     }),
//     'Need permission to access your location',
//     cancelable,
//   );

// const getCurrentLocation = (cb) => {
//   BackgroundGeolocation.getCurrentPosition(
//     {
//       desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
//       timeout: 3000,
//     },
//     cb,
//   );
//   // .catch(() => alert('rejcted'));
// };

// const addGeoFence = (
//   identifier,
//   radius,
//   latitude,
//   longitude,
//   notifyOnEntry = true,
//   notifyOnExit = true,
//   onSuccess,
//   onError,
// ) =>
//   BackgroundGeolocation.addGeofence({
//     identifier,
//     radius,
//     latitude,
//     longitude,
//     notifyOnEntry,
//     notifyOnExit,
//     notifyOnDwell: false,
//     loiteringDelay: 30000, // 30 seconds
//     extras: {
//       // Optional arbitrary meta-data
//       zone_id: 1234,
//     },
//   })
//     .then((success) => {
//       onSuccess(success);
//     })
//     .catch((error) => {
//       onError(error);
//     });

// // startGeofences
// const startGeoFencing = (onSuccess, onFailure) =>
//   BackgroundGeolocation.startGeofences(onSuccess, onFailure);

//   //getGeoFence
// const getGeoFence = async (name) => {
//   return await BackgroundGeolocation.getGeofence(name);
// };

// const stopLocationAndGeoFence = (onSuccess, onFailure) =>
//   BackgroundGeolocation.stop(onSuccess, onFailure);

//   //isBackgroundEnabled
// const isBackgroundLocationEnabled = (isEnabled: Function) =>
//   BackgroundGeolocation.getProviderState((state) => {
//     isEnabled(state.enabled);
//   });

// export default {
//   getCurrentLocation,
//   getCustomLocationPermission,
//   addGeoFence,
//   startGeoFencing,
//   stopLocationAndGeoFence,
//   getGeoFence,
//   isBackgroundLocationEnabled,
// };

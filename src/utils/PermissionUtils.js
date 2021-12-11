import {Alert, Platform} from 'react-native';
import {
  check,
  request,
  RESULTS,
  openSettings,
  PERMISSIONS,
} from 'react-native-permissions';

function openSettingModal(settingsDescription, cancelable) {
  const items = [{text: 'Open Settings', onPress: openSettings}];
  if (cancelable) {
    items.unshift({text: 'Cancel', style: 'cancel'});
  }
  Alert.alert('Permission required', settingsDescription, items, {cancelable});
}

function handlePermissions(triggerFunc, permission) {
  request(permission).then((result) => {
    if (result === RESULTS.GRANTED) {
      triggerFunc();
    }
  });
}

function checkPermission(
  triggerFunc: Function,
  permission = Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.CAMERA
    : PERMISSIONS.IOS.CAMERA,
  settingsDescription = 'Need permission to access this feature',
  cancelable = true,
) {
  check(permission).then((result) => {
    if (result === RESULTS.BLOCKED) {
      openSettingModal(settingsDescription, cancelable);
    } else {
      handlePermissions(triggerFunc, permission);
    }
  });
}

export default {checkPermission};

import { Text, LogBox, TextInput } from 'react-native';

import {
  allowTextFontScaling,
  allowIQKeyboardManager,
  allowIQKeyboardManagerToolbar,
} from '../config/AppConfig';

import { Util, IQKeyboardManager, FirebaseUtils } from '.';
import { Colors } from '../theme';

export default () => {
  if (__DEV__) {
    LogBox.ignoreAllLogs(true);
    // DevSettings._nativeModule.setHotLoadingEnabled(false);
  }
  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  //
  FirebaseUtils.configure();
  if (Util.isPlatformIOS()) {
    // Allow IQKeyboardManager
    IQKeyboardManager.setEnable(allowIQKeyboardManager);

    // Allow Button IQKeyboardManager
    IQKeyboardManager.setToolbarPreviousNextButtonEnable(
      allowIQKeyboardManagerToolbar
    );
  }

  Util.translucentApp();

  // Allow/disallow font-scaling in app
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = allowTextFontScaling;
  TextInput.defaultProps.selectionColor = Colors.primary;
};

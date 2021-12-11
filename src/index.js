import SplashScreen from 'react-native-splash-screen';
import React, { useEffect, useState } from 'react';
import { View, StatusBar, AppState } from 'react-native';
import { Provider } from 'react-redux';

import {
  DatePickerModal,
  MonthYearPickerModal,
  Options,
  DropDown,
  CompletedModal,
  GuestUserModal,
  TopLoader,
  SliderImagesModal,
  ImageViewerModal,
} from './modals';
import {
  ConfigureApp,
  DataHandler,
  GmailLogin,
  GeocodeUtil,
  Util,
} from './utils/';
import NetworkInfo from './utils/NetworkInfo';
import { MessageBar } from './components';
import AppNavigator from './navigator';
import configureStore from './store';
import { BlurView } from './common';
import { AppStyles } from './theme';

import { networkActions } from './ducks/network';

// init chathelper
import ChatHelper from './ChatUtil/ChatHelper';
import { FirebaseUtils } from './utils';

ConfigureApp();

const App = () => {
  // set store state
  const [storeState, setStore] = useState(null);

  // when store is configured
  const onStoreConfigure = store => {
    const { auth, userRoles, location } = store.getState();

    if (Util.isEmpty(auth.data) && userRoles.guestToken === '') {
      location.lastLocations = {};
      location.recentLocations = [];
    }

    FirebaseUtils.registerFCMListener();
    // init geocode
    GeocodeUtil.initLibrary();
    // init gmail
    GmailLogin.configureGoogleSignIn();
    // set store
    DataHandler.setStore(store);
    setStore(store);
    // set network listener
    NetworkInfo.networkInfoListener(
      store.dispatch,
      networkActions.networkInfoListener
    );

    // chat connect if user login
    const isUserLoggedIn = auth.data && auth.data.auth;
    if (isUserLoggedIn) {
      //request notificaion count
      //console.log('connect scocket');
      ChatHelper.connectToSocket(true);
    }

    // hide splash
    SplashScreen.hide();
  };

  const _handleAppStateChange = nextAppState => {
    Util.translucentApp();
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    // configure store
    configureStore(onStoreConfigure);
    //register fcm

    // remove network listener
    return () => {
      NetworkInfo.removeNetworkInfoListener(
        DataHandler.getStore(),
        networkActions.networkInfoListener
      );

      // chat disconnect
      ChatHelper.disconnectSocket();

      //unregister fcm
      FirebaseUtils.unRegisterFCMListener();
    };
  }, []);
  if (storeState === null) {
    return null;
  }

  //return null;

  return (
    <View style={AppStyles.flex}>
      <Provider store={storeState}>
        <AppNavigator />

        <MessageBar />

        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle="dark-content"
        />
        <SliderImagesModal ref={ref => DataHandler.setSliderModalRef(ref)} />
        <TopLoader ref={ref => DataHandler.setTopLoaderRef(ref)} />
        <GuestUserModal ref={ref => DataHandler.setGuestModalRef(ref)} />

        <DropDown ref={ref => DataHandler.setDropDownModalRef(ref)} />
        <Options ref={ref => DataHandler.setOptionsModalRef(ref)} />
        <BlurView ref={ref => DataHandler.setBlurViewRef(ref)} />
        <DatePickerModal ref={ref => DataHandler.setDatePickerModalRef(ref)} />
        <MonthYearPickerModal
          ref={ref => DataHandler.setMonthYearPickerModalRef(ref)}
        />
        <CompletedModal ref={ref => DataHandler.setCompletedModalRef(ref)} />
        <ImageViewerModal
          ref={ref => DataHandler.setImageViewerModalRef(ref)}
        />
      </Provider>
    </View>
  );
};
export default App;

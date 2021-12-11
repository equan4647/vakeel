import NetInfo from '@react-native-community/netinfo';

import DataHandler from './DataHandler';
import { ChatHelper } from '../ChatUtil';

class NetworkInfo {
  timer = null;
  unsubscribe = null;
  isFirstTime = true;

  networkInfoListener(dispatch, networkInfoAction) {
    /*
    NetInfo.fetch().then(state => {
      dispatch(networkInfoAction(state.isConnected));
      DataHandler.setInternetConnected(state.isConnected);
    });
    */

    this.unsubscribe = NetInfo.addEventListener(state => {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      DataHandler.setInternetConnected(state.isConnected);
      this.timer = setTimeout(() => {
        dispatch(networkInfoAction(state.isConnected));

        if (this.isFirstTime) {
          this.isFirstTime = false;
        } else {
          if (state.isConnected) {
            /*
            const { auth } = DataHandler.getStore().getState();
            if (auth.data && auth.data._id) {
              ChatHelper.onInternetConnect();
            }
            */
          }
        }
      }, 3000);
    });
  }

  removeNetworkInfoListener(dispatch, networkInfoAction) {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.isFirstTime = true;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}

export default new NetworkInfo();

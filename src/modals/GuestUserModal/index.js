import React, { useImperativeHandle, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import { ActivityIndicator, View } from 'react-native';

import { ErrorViewApi, LoaderView, Text, Image } from '../../components';
import { Colors, Images } from '../../theme';
import { Util } from '../../utils';
import styles from './styles';

import { requestFlagSelectors } from '../../ducks/requestFlags';
import { userRoleSelectors, userRoleActions } from '../../ducks/userRoles';
import { authSelectors } from '../../ducks/auth';
import { strings } from '../../utils/i18n';

const GuestUserModal = (props, forwardedRef) => {
  //set default state
  const [isDeviceBlock, setIsDeviceBlock] = useState(false);

  const guestUserToken = useSelector(userRoleSelectors.getGuestUserToken);
  const userInfo = useSelector(authSelectors.getUser);
  const requestFlagsGuestToken = useSelector(
    requestFlagSelectors.getRequestFlag('GUEST_TOKEN')
  );

  // dispatch const
  const dispatch = useDispatch();

  const showModal =
    isDeviceBlock || (Util.isEmpty(userInfo) && guestUserToken === '');

  const sendRequestGuestToken = () => {
    let uniqueId = DeviceInfo.getUniqueId();
    //const payload = {};
    const payload = { device_id: uniqueId };
    dispatch(userRoleActions.requestGuestToken(payload));
  };

  React.useEffect(() => {
    if (Util.isEmpty(userInfo) && guestUserToken === '') {
      sendRequestGuestToken();
    }
  }, []);

  // show and hide functions for ref
  useImperativeHandle(forwardedRef, () => ({
    deviceIsBlocked: () => {
      setIsDeviceBlock(true);
    },
  }));

  const renderContent = () => {
    const { loading, failure, errorMessage } = requestFlagsGuestToken;
    if (loading) {
      return <ActivityIndicator animating size="large" color={Colors.white} />;
    }
    if (failure) {
      return (
        <ErrorViewApi
          errorMessage={errorMessage}
          onPressRetry={sendRequestGuestToken}
          containerStyle={styles.errorView}
        />
      );
    }
    if (isDeviceBlock) {
      return (
        <View style={styles.block}>
          <Image source={Images.icons.warning} />
          <Text size="size_16" type="medium" style={styles.blockText}>
            {strings('api_error_messages.device_block_message')}
          </Text>
        </View>
      );
    }
  };

  if (showModal) {
    return <LoaderView renderContent={renderContent} />;
  }

  return null;
};
export default React.forwardRef(GuestUserModal);

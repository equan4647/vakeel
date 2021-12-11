import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import _ from 'lodash';

import { AppButton } from '..';
import { Loader } from '../../components';
import {
  BUTTON_TYPE,
  SOCIAL_LOGIN_TYPE,
  USER_TYPES,
} from '../../config/Constants';
import { authActions } from '../../ducks/auth';
import { Images } from '../../theme';
import { GmailLogin, NavigationService, Util } from '../../utils';
import FacebookAuth from '../../utils/FacebookAuth';
import { strings } from '../../utils/i18n';
import styles from './styles';

const Button = ({ image, onPress }) => (
  <AppButton
    container={styles.socialButton}
    type={BUTTON_TYPE.GRAY_BORDER}
    image={Images.icons[image]}
    {...{ onPress }}
  />
);

const SocialButton = () => {
  const dispatch = useDispatch();

  const requestAuth = payload =>
    dispatch(authActions.requestSocialAuth(payload));

  const checkSocialUser = (payload, data, onSuccess, onFailure) =>
    dispatch(
      authActions.requestCheckSocialUserExist(
        payload,
        data,
        onSuccess,
        onFailure
      )
    );

  const saveAppleCredentials = payload =>
    dispatch(authActions.saveAppleCredentials(payload));

  const appleCredentialsData = useSelector(
    state => state.appleCredentials.data
  );

  const loginWithGoogle = () =>
    GmailLogin.signInGoogle(fetchedData => {
      const { email, familyName, givenName, photo, id } = fetchedData;
      const payload = {
        email,
        platform_id: id,
        first_name: givenName,
        last_name: familyName,
        avatar: photo,
        platform_type: SOCIAL_LOGIN_TYPE.GMAIL,
        user_type: USER_TYPES.BASIC,
        notifications: true,
      };
      requestAuth(payload);
    });

  const loginWithFacebook = () => {
    FacebookAuth.login(fetchedData => {
      const { email, id, first_name, last_name, picture } = fetchedData;
      const payload = {
        email,
        first_name,
        last_name,
        platform_id: id,
        avatar: picture?.data?.url,
        platform_type: SOCIAL_LOGIN_TYPE.FACEBOOK,
        user_type: USER_TYPES.BASIC,
        notifications: true,
      };
      checkSocialUser(
        {
          platform_id: id,
          avatar: picture?.data?.url,
          platform_type: SOCIAL_LOGIN_TYPE.FACEBOOK,
          user_type: USER_TYPES.BASIC,
        },
        payload,
        () => requestAuth(payload),
        () => {
          if (_.isUndefined(payload.email)) {
            Util.showMessage(strings('app.enter_email'), 'sucess');
            NavigationService.navigate('Signup', { data: payload });
          } else {
            requestAuth(payload);
          }
        }
      );
    });
  };

  const loginWithApple = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user
    );

    if (credentialState === appleAuth.State.AUTHORIZED) {
      const { email, user } = appleAuthRequestResponse;
      if (email === null && Util.isEmpty(appleCredentialsData)) {
        const payload = {
          platform_id: user,
          platform_type: SOCIAL_LOGIN_TYPE.APPLE,
        };
        checkSocialUser(payload, appleAuthRequestResponse, onChecUserSuccess);
      } else {
        sendRequestAuth(appleAuthRequestResponse);
      }
    }
  };

  const onChecUserSuccess = (data, appleAuthResponse) => {
    const { email, first_name, last_name } = data;
    appleAuthResponse.email = email;
    appleAuthResponse.fullName.givenName = first_name;
    appleAuthResponse.fullName.familyName = last_name;
    sendRequestAuth(appleAuthResponse);
  };

  const sendRequestAuth = appleAuthRequestResponse => {
    const { email, fullName, user } = appleAuthRequestResponse;

    const payload = {
      email: email || appleCredentialsData[user].email,
      first_name:
        fullName.givenName || appleCredentialsData[user].fullName.givenName,
      last_name:
        fullName.familyName || appleCredentialsData[user].fullName.familyName,
      platform_id: user,
      platform_type: SOCIAL_LOGIN_TYPE.APPLE,
      user_type: USER_TYPES.BASIC,
      notifications: true,
    };

    if (Util.isEmpty(appleCredentialsData)) {
      saveAppleCredentials(appleAuthRequestResponse);
    }
    requestAuth(payload);
  };

  return (
    <View>
      {Util.isPlatformIOS() && (
        <AppButton
          type={BUTTON_TYPE.BLACK}
          image={Images.icons.apple}
          title={strings('app.sign_up_with_apple')}
          container={styles.apple}
          onPress={loginWithApple}
        />
      )}
      <View style={styles.container}>
        <Button image={'google'} onPress={loginWithGoogle} />
        <Button image={'facebook'} onPress={loginWithFacebook} />
        <Loader type="SOCIAL_AUTH" />
      </View>
    </View>
  );
};
export default React.memo(SocialButton);

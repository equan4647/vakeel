import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { ButtonView, ImageViewHttpRound, Text } from '../../components';
import { ProgressBar } from '../../common';
import { Colors, Images, Metrics } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { Util } from '../../utils';
import { getUser } from '../../ducks/auth/selectors';
import { UserUtil } from '../../DataUtils';
import { useUserRole } from '../../utils/CustomHooks';
import AppButton from '../AppButton';

const Header = () => {
  const user = useSelector(getUser),
    isGuest = useUserRole();

  const ProfileLink = isGuest ? View : ButtonView;

  const onPressProfileLink = () =>
    isGuest ? Util.DoNothing : Util.navigateFromDrawer('ViewProfile');
  return (
    <View style={styles.header}>
      <ImageViewHttpRound
        url={UserUtil.avatar(user)}
        source={isGuest ? Images.images.guestProfile : undefined}
        size={54}
        style={styles.avatar}
        cache="force-cache"
      />

      <Text type="semiBold" size="size_16" color={Colors.white}>
        {isGuest ? strings('app.guest_user') : UserUtil.full_name(user)}
      </Text>

      <ProfileLink hitSlop={Metrics.hitSlop} onPress={onPressProfileLink}>
        <Text style={styles.viewProfile}>
          {strings(isGuest ? 'app.login_see_features' : 'app.view_profile')}
        </Text>

        {!isGuest ? (
          <>
            <ProgressBar
              width={Metrics.screenWidth * 0.53 - Metrics.ratio(40)}
              progress={UserUtil.getProfileProgress(user)}
              style={styles.progress}
            />

            {UserUtil.isProfileComplete(user) ? null : (
              <Text style={styles.compProfileInst}>
                {strings('app.complete_profile_instructions')}
              </Text>
            )}
          </>
        ) : (
          <>
            <AppButton
              title={strings('app.login')}
              container={styles.loginDrawer}
              onPress={() =>
                Util.navigateFromDrawer('Login', {}, 'AuthModal', 50)
              }
            />
            <Text style={styles.dontHaveAccount}>
              {strings('app.dont_have_account')}
            </Text>

            <Text
              style={styles.signupdrawer}
              onPress={() =>
                Util.navigateFromDrawer(
                  'Signup',
                  { fromMenu: true },
                  'AuthModal',
                  50
                )
              }
            >
              {strings('app.signup')}
            </Text>
          </>
        )}
      </ProfileLink>
    </View>
  );
};
export default React.memo(Header);

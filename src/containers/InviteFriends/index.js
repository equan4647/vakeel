import React from 'react';
import { Image, View, Share } from 'react-native';
import { useSelector } from 'react-redux';
import { AppButton } from '../../common';
import { Text } from '../../components';
import { BUTTON_TYPE } from '../../config/Constants';
import { UserUtil } from '../../DataUtils';
import { getUser } from '../../ducks/auth/selectors';
import { Colors, Images } from '../../theme';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';

const InviteFriends = ({ navigation }) => {
  NavigationService.setTitle(navigation, '');

  const user = useSelector(getUser);

  return (
    <>
      <View style={styles.container}>
        <Image
          source={Images.images.inviteFriend}
          style={styles.image}
          resizeMode="contain"
        />

        <View>
          <Text style={styles.heading}>{strings('app.invite_friends')}</Text>

          <Text style={styles.text}>
            {strings('app.invite_discount_detail')}
          </Text>
        </View>

        <Text style={styles.text}>
          {strings('app.invite_share_motivation')}
        </Text>
      </View>

      <View style={styles.buttons}>
        <AppButton
          type={BUTTON_TYPE.GREEN_BORDER}
          title={UserUtil.inviteCode(user)}
        />
        <AppButton
          title={strings('app.share_link')}
          onPress={() =>
            Share.share(
              {
                title: 'BizAd',
                message: `Following is your referral code from BizAd. ${UserUtil.inviteCode(
                  user
                )} Please enter this code while signing up to BizAd. Thank you. BizAd Team`,
              },
              {
                dialogTitle: 'Share BizAd With friends',
                tintColor: Colors.white,
                subject: 'subject',
              }
            )
          }
        />
      </View>
    </>
  );
};

export default InviteFriends;

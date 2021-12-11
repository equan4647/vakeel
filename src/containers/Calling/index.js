import React from 'react';
import { View } from 'react-native';
import { AppStyles, Images } from '../../theme';
import { Image, ButtonView, Text } from '../../components';
import styles from './styles';
import { NavigationService, DataHandler, Util } from '../../utils';
import { strings } from '../../utils/i18n';

const Calling = ({ navigation, route }) => {
  NavigationService.hideHeader(navigation);
  const onCallDone = route.params?.onCallDone ?? Util.DoNothing;

  const onMutePress = () => {};
  const onSpeakerPress = () => {};
  const onCallEndPress = () => {
    NavigationService.goBack();
    setTimeout(() => {
      DataHandler.getCompletedModalRef().show({
        data: {
          userImage: Images.dummyImages.dummyProfilePic,
          name: 'Garry Fielder',
          time: '20 Oct, 2020, 11:54 AM',
        },
        title: strings('app.session_completed'),
        onPress: () => {
          DataHandler.getTipModalRef().show();
          DataHandler.getCompletedModalRef().hide();
          onCallDone();
        },
      });
    }, 50);
  };

  return (
    <View style={[AppStyles.container, AppStyles.contentContainerStyle2]}>
      <View style={styles.userDetail}>
        <Image style={styles.userImage} source={Images.icons.callUser} />
        <Text style={styles.username}>Mohsen Salehi</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <ButtonView onPress={onMutePress}>
          <Image source={Images.icons.mute} />
        </ButtonView>

        <ButtonView onPress={onCallEndPress}>
          <Image source={Images.icons.hangUp} />
        </ButtonView>

        <ButtonView onPress={onSpeakerPress}>
          <Image source={Images.icons.speaker} />
        </ButtonView>
      </View>
    </View>
  );
};

export default Calling;

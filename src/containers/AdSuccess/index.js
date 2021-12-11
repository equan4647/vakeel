import { View } from 'react-native';
import React from 'react';

import { SuccessHeader, SuccessButtons, AppButton } from '../../common';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';

const AdSuccess = ({ navigation, route }) => {
  // set header title
  // NavigationService.setTitle(navigation, '');

  const addDays = route.params?.addDays ?? false;

  const id = route.params?.id;

  React.useEffect(() => {
    navigation.setOptions({ title: '', headerLeft: null });
  });

  const onDonePress = () => {
    //NavigationService.popToTop();
    NavigationService.pop();
  };
  const onPreviewAddPress = () => {
    NavigationService.replace('AdvertismentDetail', {
      isMyAds: true,
      // showCross: true,
      id,
    });
  };

  return (
    <View style={[AppStyles.container, styles.container]}>
      <SuccessHeader
        containerStyle={styles.successHeader}
        description={
          addDays
            ? strings('app.your_payment_made_shortly_days')
            : strings('app.your_payment_made_shortly')
        }
      />
      {addDays ? (
        <AppButton title={strings('app.done')} onPress={onDonePress} />
      ) : (
        <SuccessButtons
          titleBtnOne={strings('app.view_ad')}
          titleBtnTwo={strings('app.done')}
          onPressBtnOne={onPreviewAddPress}
          onPressBtnTwo={onDonePress}
        />
      )}
    </View>
  );
};
export default AdSuccess;

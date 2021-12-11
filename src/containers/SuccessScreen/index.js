import { useBackHandler } from '@react-native-community/hooks';
import { View } from 'react-native';
import React from 'react';

import { SuccessHeader, SuccessButtons } from '../../common';
import { AppStyles } from '../../theme';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { NavigationService } from '../../utils';

const SuccessScreen = ({ navigation, route }) => {
  const classifiedId = route?.params?.classifiedId ?? 0;
  const isEdit = route?.params?.isEdit ?? false;

  React.useEffect(() => {
    navigation.setOptions({ title: '', headerLeft: null });
  });

  useBackHandler(() => {
    onDonePress();
  });

  const onDonePress = () => {
    if (isEdit) {
      NavigationService.navigate('ClassifiedDetail');
    } else {
      NavigationService.navigate('Classified');
    }
  };
  const onPreviewAddPress = () => {
    if (isEdit) {
      NavigationService.navigate('ClassifiedDetail');
    } else {
      NavigationService.navigate('Classified');
      NavigationService.push('ClassifiedDetail', {
        classifiedId: classifiedId,
      });
    }
  };

  const description = isEdit
    ? strings('app.ad_update_message')
    : strings('app.ad_will_posted_shortly');

  return (
    <View style={[AppStyles.container, styles.container]}>
      <SuccessHeader
        containerStyle={styles.successHeader}
        description={description}
      />

      <SuccessButtons
        titleBtnOne={strings('app.done')}
        titleBtnTwo={strings('app.preview_ad')}
        onPressBtnOne={onDonePress}
        onPressBtnTwo={onPreviewAddPress}
      />
    </View>
  );
};
export default SuccessScreen;

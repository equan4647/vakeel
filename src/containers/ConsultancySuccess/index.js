import React from 'react';
import { View } from 'react-native';
import { SuccessButtons, SuccessHeader } from '../../common';
import { Text } from '../../components';
import { AppStyles } from '../../theme';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';

const TopicSuccess = ({ navigation }) => {
  NavigationService.hideHeader(navigation);
  return (
    <View style={[AppStyles.container, AppStyles.contentContainerStyle2]}>
      <View style={styles.content}>
        <SuccessHeader
          description={strings('app.your_payment_has_been_made')}
        />

        <View style={styles.topicNameContainer}>
          <Text style={styles.topic}>Air Pollution</Text>
          <Text>12 Dec, 2020, 3:00 PM</Text>
        </View>

        <Text>{strings('app.your_calendar_has_been_updated')}</Text>
      </View>

      <SuccessButtons
        titleBtnOne={strings('app.view_consultancy')}
        titleBtnTwo={strings('app.done')}
        onPressBtnOne={() =>
          NavigationService.reset('ConsultancyDetail', { viewableOnly: true })
        }
        onPressBtnTwo={NavigationService.pop}
      />
    </View>
  );
};
export default TopicSuccess;

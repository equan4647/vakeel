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
          description={strings('app.your_topic_has_been_published')}
        />

        <View style={styles.topicNameContainer}>
          <Text style={styles.topic}>Air Pollution</Text>
          <Text>12 Dec, 2020, 3:00 PM</Text>
        </View>
      </View>

      <SuccessButtons
        titleBtnOne={strings('app.view_topic')}
        titleBtnTwo={strings('app.done')}
        onPressBtnOne={() =>
          NavigationService.navigate('ViewTopic', { isMine: true })
        }
        onPressBtnTwo={NavigationService.pop}
      />
    </View>
  );
};
export default TopicSuccess;

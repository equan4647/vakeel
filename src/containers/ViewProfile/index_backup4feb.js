import React from 'react';
import { ScrollView } from 'react-native';

import {
  HorizontalTitle,
  SellerDetailCard,
  TopicsCarousel,
} from '../../common';
import { TopicSeller } from '../../data/sellerDetailCard';
import { NavigationService } from '../../utils';
import { TopicsData } from '../../data/topics';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';

const ViewProfile = ({ navigation }) => {
  const navigateToEdit = () => NavigationService.navigate('EditProfile');
  NavigationService.setOptionsHeader(navigation, '', {
    [strings('app.edit_profile')]: navigateToEdit,
  });

  return (
    <>
      <ScrollView style={AppStyles.flex}>
        <SellerDetailCard {...TopicSeller} style={styles.content} />

        <HorizontalTitle
          title={strings('app.my_topics')}
          rightTitle={strings('app.see_all')}
          containerStyle={styles.content}
          barStyle={styles.content}
          bar
          onPress={() =>
            NavigationService.navigate('SeeAllTopics', {
              title: strings('app.topics'),
            })
          }
        />

        <TopicsCarousel
          data={TopicsData.list}
          style={styles.listStyle}
          contentContainerStyle={styles.listContainerStyle}
          onItemPress={() =>
            NavigationService.push('ViewTopic', { isMine: true })
          }
        />
      </ScrollView>
    </>
  );
};

export default ViewProfile;

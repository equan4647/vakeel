import React from 'react';
import { ScrollView } from 'react-native';

import {
  HorizontalTitle,
  ContactButtonBar,
  SellerDetailCard,
  TopicsCarousel,
  RatingList,
} from '../../common';
import { TopicSeller } from '../../data/sellerDetailCard';
import { NavigationService, Util } from '../../utils';
import { TopicsData } from '../../data/topics';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import { CHAT_ROLE } from '../../config/Constants';

const options = {
  [strings('app.report_this_user')]: Util.alertUserReported,
};

const TopicPublisher = ({ navigation }) => {
  NavigationService.setOptionsHeader(navigation, '', options, 0);

  return (
    <>
      <ScrollView style={AppStyles.flex}>
        <SellerDetailCard {...TopicSeller} style={styles.content} />

        <HorizontalTitle
          title={strings('app.topics')}
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
        />

        {/* rating======== */}
        <HorizontalTitle
          title={strings('app.rating_and_reviews')}
          barStyle={styles.content}
          containerStyle={styles.content}
          rightTitle={strings('app.see_all')}
          onPress={() => NavigationService.navigate('RatingsAndReviews')}
          bar
        />
        <RatingList containerStyle={styles.ratingContainer} bounces={false} />
      </ScrollView>
      <ContactButtonBar onChat={() => {}} />
    </>
  );
};

export default TopicPublisher;

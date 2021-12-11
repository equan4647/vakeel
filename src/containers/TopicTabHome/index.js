import React from 'react';
import { ScrollView } from 'react-native';
import {
  ActionButton,
  HorizontalTitle,
  SearchInput,
  GridCategories,
  TopicsCarousel,
  TopicsList,
  NotificationIcon,
} from '../../common';
import { CATEGORY_SCREEN_PARAMS } from '../../config/Constants';
import { AppStyles } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { TopicCategories } from '../../data/Categories';
import { TopicsData } from '../../data/topics';

const renderBellIcon = () => <NotificationIcon />;
const TopicTabHome = ({ navigation }) => {
  // header
  NavigationService.setHeader(navigation, '', renderBellIcon);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={AppStyles.flex}>
        <SearchInput style={styles.searchInput} onPress={Util.DoNothing} />

        <HorizontalTitle
          title={strings('app.popular_categories')}
          leftTextStyle={AppStyles.subHeadLeftText}
          rightTitle={strings('app.see_all')}
          containerStyle={styles.headingContainer}
          onPress={Util.DoNothing}
        />

        <GridCategories
          data={TopicCategories.horizontal}
          style={styles.categoriesList}
          contentContainerStyle={styles.listContainer}
          {...CATEGORY_SCREEN_PARAMS.SEARCH_TOPICS}
        />

        <HorizontalTitle
          title={strings('app.recently_added_ads_Caps')}
          leftTextStyle={AppStyles.subHeadLeftText}
          rightTitle={strings('app.see_all')}
          containerStyle={styles.headingContainer}
          onPress={() =>
            NavigationService.navigate('SeeAllTopics', {
              title: strings('app.recently_added_ads'),
            })
          }
        />

        <TopicsCarousel
          contentContainerStyle={styles.listContainer}
          data={TopicsData.grid}
        />

        <HorizontalTitle
          title={strings('app.most_trending_Caps')}
          leftTextStyle={AppStyles.subHeadLeftText}
          rightTitle={strings('app.see_all')}
          containerStyle={styles.headingContainer}
          onPress={() =>
            NavigationService.navigate('SeeAllTopics', {
              title: strings('app.most_trending'),
            })
          }
        />

        <TopicsList
          contentContainerStyle={[styles.bottom]}
          data={TopicsData.list}
        />
      </ScrollView>
      <ActionButton
        type="add"
        onPress={() =>
          NavigationService.navigate('CreateTopic', {}, 'TopicAddStack')
        }
      />
    </>
  );
};

export default TopicTabHome;

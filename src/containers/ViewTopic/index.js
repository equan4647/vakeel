import React from 'react';
import { View } from 'react-native';

import {
  FavoriteButton,
  Swiper,
  AdAuthor,
  ParallaxScrollView,
  BottomButton,
  HorizontalTitle,
  HeaderRightImage,
} from '../../common';

import { topicDetail } from '../../data/topicDetail';
import { NavigationService, Util } from '../../utils';
import { AppStyles, Images } from '../../theme';
import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import styles from './styles';

const OverView = ({ title, category, viewsCount, date }) => {
  return (
    <View style={styles.overview}>
      <Text type="bold">{category}</Text>
      <Text style={styles.title}>{title}</Text>

      <View style={AppStyles.spreadRowAligned}>
        <Text size="size_14">
          {strings('app.views')} {viewsCount}
        </Text>

        <Text size="size_14">{date}</Text>
      </View>
    </View>
  );
};

const Description = React.memo(({ description }) => (
  <>
    <HorizontalTitle
      title={strings('app.description')}
      barStyle={styles.barStyle}
      bar
    />
    <Text style={styles.description}>{description}</Text>
  </>
));

const editTopic = () =>
  NavigationService.navigate('CreateTopic', { isEdit: true });
const editOptions = { [strings('app.edit')]: editTopic };

const reportTopic = () =>
  NavigationService.navigate('Report', {
    title: strings('app.report_topic'),
  });
const reportOptions = { [strings('app.report')]: reportTopic };

export default ({ data = topicDetail, navigation, route }) => {
  const isMine = route.params?.isMine ?? false;
  // hide header
  NavigationService.hideHeader(navigation);

  const onPressMore = () => {
    Util.showMoreOptions(isMine ? editOptions : reportOptions, isMine ? -1 : 0);
  };

  const headerRight = () => (
    <View style={AppStyles.rowAligned}>
      <FavoriteButton circle favorite />
      <HeaderRightImage
        img={Images.icons.moreObaqueBG}
        activeOpacity={0.7}
        style={styles.threeDots}
        onPress={onPressMore}
      />
    </View>
  );

  const naviagteToAuthor = () => {
    Util.DoNothing();
    // NavigationService.navigate(isMine ? 'ViewProfile' : 'TopicPublisher');
  };

  return (
    <>
      <ParallaxScrollView headerRight={headerRight} transparentBack={false}>
        <Swiper data={swiperDa} />

        <View style={styles.container}>
          <OverView {...data} />

          <AdAuthor data={authorData} onPress={naviagteToAuthor} />

          <Description description={data.description} />
        </View>
      </ParallaxScrollView>

      {isMine ? null : (
        <BottomButton
          title={strings('app.chat_with_author')}
          onPress={navigateToChat}
        />
      )}
    </>
  );
};

function navigateToChat() {
  Util.DoNothing();
  // NavigationService.navigate(
  //   'Chat',
  //   { chatRole: CHAT_ROLE.TOPIC_VIEWER }
  // 'ConsultancyStack'
  // );
}

const authorData = {
    name: 'Talha Ashraf',
    created_at: new Date(),
    avatar:
      'https://cubixco.s3.us-west-2.amazonaws.com/prcuxuekqpkoicixru.tmp/uploads/7689bc38-e986-421e-af69-2a99a70e93cf.jpeg',
  },
  swiperDa = [
    'https://cubixco.s3.us-west-2.amazonaws.com/prcuxuehn7kpfej8pt.tmp/uploads/1d0be44e-c124-4232-835b-15d221c406ee.png',
  ];

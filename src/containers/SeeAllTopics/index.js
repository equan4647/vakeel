import React from 'react';

import { TopicsList } from '../../common';
import { TopicsData } from '../../data/topics';
import { NavigationService } from '../../utils';

const SeeAllTopics = ({ navigation, route }) => {
  NavigationService.setHeader(navigation, route.params?.title);

  return <TopicsList data={TopicsData.list} itemProps={{ isMine: true }} />;
};
export default SeeAllTopics;

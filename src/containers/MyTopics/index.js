import React from 'react';

import { TopicsList } from '../../common';
import { AppStyles } from '../../theme';
import styles from './styles';
import { TopicsData } from '../../data/topics';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';

const SeeAllTopics = ({ navigation, route }) => {
  NavigationService.setHeader(navigation, strings('app.my_topics'));

  return <TopicsList data={TopicsData.list} itemProps={{ isMine: true }} />;
};
export default SeeAllTopics;

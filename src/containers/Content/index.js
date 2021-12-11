import React from 'react';
import { ScrollView } from 'react-native';
import HTML from 'react-native-render-html';

import { Metrics, AppStyles } from '../../theme';
import { NavigationService } from '../../utils';
import { dummyContent } from '../../data';
const Content = props => {
  const { title } = props.route.params;

  NavigationService.setTitle(props.navigation, title);

  return (
    <ScrollView
      style={AppStyles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={AppStyles.contentContainerStyle2}
    >
      <HTML
        source={{ html: dummyContent }}
        imagesMaxWidth={Metrics.screenWidth}
      />
    </ScrollView>
  );
};

export default Content;

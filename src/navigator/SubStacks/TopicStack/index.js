import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions } from '../../config';
import {
  SearchedTopics,
  TopicTabHome,
  ViewCategories,
} from '../../../containers';

enableScreens();
const TopicStack = createStackNavigator();

export default props => (
  <TopicStack.Navigator {...{ screenOptions }}>
    <TopicStack.Screen name="TopicHome" component={TopicTabHome} />
    <TopicStack.Screen name="SearchedTopics" component={SearchedTopics} />
    <TopicStack.Screen name="ViewCategories" component={ViewCategories} />
  </TopicStack.Navigator>
);

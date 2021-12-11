import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions } from '../../config';
import {
  CreateTopic,
  TopicEditor,
  SelectCoverPhoto,
  UploadPhoto,
  TopicSuccess,
  ViewTopic,
} from '../../../containers';

enableScreens();
const TopicAddStack = createStackNavigator();

export default () => (
  <TopicAddStack.Navigator {...{ screenOptions }}>
    <TopicAddStack.Screen name="CreateTopic" component={CreateTopic} />
    <TopicAddStack.Screen name="UploadPhoto" component={UploadPhoto} />
    <TopicAddStack.Screen
      name="SelectCoverPhoto"
      component={SelectCoverPhoto}
    />
    <TopicAddStack.Screen name="TopicEditor" component={TopicEditor} />
    <TopicAddStack.Screen name="TopicSuccess" component={TopicSuccess} />
    <TopicAddStack.Screen name="ViewTopic" component={ViewTopic} />
  </TopicAddStack.Navigator>
);

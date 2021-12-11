import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions } from '../../config';
import {
  ClassifiedTabHome,
  SearchedClassified,
  ViewCategories,
  ViewSubCategories,
} from '../../../containers';

enableScreens();
const ClassifiedStack = createStackNavigator();

export default props => (
  <ClassifiedStack.Navigator {...{ screenOptions }}>
    <ClassifiedStack.Screen
      name="ClassifiedHome"
      component={ClassifiedTabHome}
    />
    <ClassifiedStack.Screen
      name="SearchedClassified"
      component={SearchedClassified}
    />
    <ClassifiedStack.Screen name="ViewCategories" component={ViewCategories} />
    <ClassifiedStack.Screen
      name="ViewSubCategories"
      component={ViewSubCategories}
    />
  </ClassifiedStack.Navigator>
);

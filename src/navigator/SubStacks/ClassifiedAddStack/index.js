import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { screenOptions } from '../../config';
import {
  AddClassifiedDetail,
  CalssifiedCategory,
  ConfirmLocation,
  CurrentLocationMap,
  HelpWanted,
  OTPVerification,
  ReviewDetails,
  SelectCoverPhoto,
  SetPrice,
  SuccessScreen,
  UploadPhoto,
  ViewCategories,
  ViewSubCategories,
  EditPhone,
} from '../../../containers';

enableScreens();
const ClassifiedAddStack = createStackNavigator();

export default () => (
  <ClassifiedAddStack.Navigator {...{ screenOptions }}>
    <ClassifiedAddStack.Screen
      name="CalssifiedCategory"
      component={CalssifiedCategory}
    />
    <ClassifiedAddStack.Screen
      name="ViewCategories"
      component={ViewCategories}
    />
    <ClassifiedAddStack.Screen
      name="ViewSubCategories"
      component={ViewSubCategories}
    />
    <ClassifiedAddStack.Screen
      name="ConfirmLocation"
      component={ConfirmLocation}
    />
    <ClassifiedAddStack.Screen
      name="AddClassifiedDetail"
      component={AddClassifiedDetail}
    />
    <ClassifiedAddStack.Screen name="UploadPhoto" component={UploadPhoto} />
    <ClassifiedAddStack.Screen
      name="SelectCoverPhoto"
      component={SelectCoverPhoto}
    />
    <ClassifiedAddStack.Screen name="SetPrice" component={SetPrice} />

    <ClassifiedAddStack.Screen name="ReviewDetails" component={ReviewDetails} />
    <ClassifiedAddStack.Screen
      name="OTPVerification"
      component={OTPVerification}
    />
    <ClassifiedAddStack.Screen
      options={{ gestureEnabled: false }}
      name="SuccessScreen"
      component={SuccessScreen}
    />
    <ClassifiedAddStack.Screen
      name="CurrentLocationMap"
      component={CurrentLocationMap}
    />
    <ClassifiedAddStack.Screen name="HelpWanted" component={HelpWanted} />
    <ClassifiedAddStack.Screen name="EditPhone" component={EditPhone} />
  </ClassifiedAddStack.Navigator>
);

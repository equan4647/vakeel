import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import { hideHeaderOptions, screenOptions } from '../../config';
import {
  ConsultancyDetail,
  ConsultancySuccess,
  ScheduleConsultancy,
  TopicPublisher,
} from '../../../containers';
import { PaymentMethodStack } from '..';
import { TipPaymentModal } from '../../../modals';
import { DataHandler } from '../../../utils';

enableScreens();
const ConsultancyStack = createStackNavigator();

export default props => (
  <>
    <ConsultancyStack.Navigator {...{ screenOptions }}>
      <ConsultancyStack.Screen
        name="ConsultancyDetail"
        component={ConsultancyDetail}
      />
      <ConsultancyStack.Screen
        name="ScheduleConsultancy"
        component={ScheduleConsultancy}
      />
      <ConsultancyStack.Screen
        name="TopicPublisher"
        component={TopicPublisher}
      />
      <ConsultancyStack.Screen
        name="PaymentMethodStack"
        component={PaymentMethodStack}
        options={hideHeaderOptions}
      />
      <ConsultancyStack.Screen
        name="ConsultancySuccess"
        component={ConsultancySuccess}
      />
    </ConsultancyStack.Navigator>
    <TipPaymentModal ref={ref => DataHandler.setTipModalRef(ref)} />
  </>
);

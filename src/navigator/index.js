import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';

import {
  ViewProduct,
  ViewCategories,
  ViewSubCategories,
  UploadPhoto,
  SelectCoverPhoto,
  ReviewDetails,
  ClassifiedPublisher,
  SearchScreen,
  Report,
  Review,
  MyCart,
  MyClassifieds,
  DeliveryDetails,
  MyDeliveries,
  MyOrders,
  OrderDetail,
  ResturantDetail,
  RatingsAndReviews,
  ViewBuyingProduct,
  LocationSearch,
  Favourities,
  CalssifiedCategory,
  ViewCurrentDelivery,
  CurrentLocationMap,
  SeeAllClassifieds,
  Publisher,
  SeeAllBuyingProducts,
  FiltersClassified,
  FiltersBuying,
  SeeAllFood,
  FoodOrderInProgress,
  Chat,
  SeeAllTopics,
  ViewTopic,
  ViewService,
  FilterService,
  MapViewFullScreen,
  MyTopics,
  CreateTopic,
  Notifications,
  ClassifiedDetail,
  Messages,
  Settings,
  TopicPublisher,
  FiltersTopic,
  Calling,
  ViewProfile,
  EditProfile,
  SeeAllServices,
  ServiceBookingDetails,
  FiltersFood,
  SideMenuPrefrence,
  EditEducation,
  EditMedicalInfo,
  EditEmploymentInfo,
  EditRecreationalActivities,
  InviteFriends,
  Content,
  EditPhone,
  FiltersRadius,
  ReportAd,
  AdvertismentDetail,
  FoodOrderDetail,
  ChangePassword,
} from '../containers';

import { NavigationService } from '../utils';
import {
  screenOptions,
  modalOptions,
  transitionSpecSearch,
  modalStackOptions,
  hideHeaderOptions,
  transitionSpecCall,
} from './config';
import {
  ClassifiedAddStack,
  BuyingCartStack,
  AdvertismentDaysAddStack,
  AdvertismentStack,
  LocationSearchStack,
  AddDeliveryStack,
  PaymentMethodStack,
  AdvertismentAddStack,
  FoodCartStack,
  AddressStack,
  TopicAddStack,
  BookingAppointmentStack,
  SearchHistoryStack,
  ConsultancyStack,
  CalendarStack,
  AuthStack,
} from './SubStacks';
import Drawer from './Drawer';
import { useSelector } from 'react-redux';
import { authSelectors } from '../ducks/auth';
import { Linking } from 'react-native';
// import { isGuest } from '../ducks/auth/selectors';

enableScreens();

const RootStack = createStackNavigator();
const Stack = createStackNavigator();

const AppStack = () => {
  // const userExists = false; //useSelector(isGuest) ? false : true;
  const initialRouteName = 'Dashboard';
  return (
    <Stack.Navigator {...{ screenOptions, initialRouteName }}>
      <Stack.Screen
        name="ServiceBookingDetails"
        component={ServiceBookingDetails}
      />

      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditPhone" component={EditPhone} />
      <Stack.Screen name="ViewProfile" component={ViewProfile} />
      <Stack.Screen name="EditEducation" component={EditEducation} />
      <Stack.Screen name="EditMedicalInfo" component={EditMedicalInfo} />
      <Stack.Screen name="EditEmploymentInfo" component={EditEmploymentInfo} />
      <Stack.Screen
        name="EditRecreationalActivities"
        component={EditRecreationalActivities}
      />

      <Stack.Screen
        name="SideMenuPrefrence"
        component={SideMenuPrefrence}
        options={hideHeaderOptions}
      />

      <Stack.Screen
        name="ClassifiedAddStack"
        component={ClassifiedAddStack}
        options={modalStackOptions}
      />

      <Stack.Screen
        name="LocationSearchStack"
        component={LocationSearchStack}
        options={modalStackOptions}
      />

      <Stack.Screen
        name="AdvertismentStack"
        component={AdvertismentStack}
        options={hideHeaderOptions}
      />

      <Stack.Screen
        name="SearchHistoryStack"
        component={SearchHistoryStack}
        options={hideHeaderOptions}
      />

      <Stack.Screen
        name="CalendarStack"
        component={CalendarStack}
        options={hideHeaderOptions}
      />

      <Stack.Screen
        name="AdvertismentAddStack"
        component={AdvertismentAddStack}
        options={modalStackOptions}
      />

      <Stack.Screen
        name="BookingAppointmentStack"
        component={BookingAppointmentStack}
        options={modalStackOptions}
      />

      <Stack.Screen
        name="AddDeliveryStack"
        component={AddDeliveryStack}
        options={modalStackOptions}
      />

      <Stack.Screen
        name="AdvertismentDaysAddStack"
        component={AdvertismentDaysAddStack}
        options={modalStackOptions}
      />

      <Stack.Screen
        name="BuyingCartStack"
        component={BuyingCartStack}
        options={modalStackOptions}
      />

      <Stack.Screen
        name="FoodCartStack"
        component={FoodCartStack}
        options={modalStackOptions}
      />

      <Stack.Screen
        name="TopicAddStack"
        component={TopicAddStack}
        options={modalStackOptions}
      />

      <Stack.Screen name="Dashboard" component={Drawer} />

      <Stack.Screen name="ClassifiedDetail" component={ClassifiedDetail} />
      <Stack.Screen name="AdvertismentDetail" component={AdvertismentDetail} />
      <Stack.Screen name="MapViewFullScreen" component={MapViewFullScreen} />

      <Stack.Screen name="ViewProduct" component={ViewProduct} />
      <Stack.Screen name="ViewBuyingProduct" component={ViewBuyingProduct} />
      <Stack.Screen name="ViewTopic" component={ViewTopic} />
      <Stack.Screen name="ResturantDetail" component={ResturantDetail} />
      <Stack.Screen name="ViewService" component={ViewService} />

      <Stack.Screen name="ViewCategories" component={ViewCategories} />
      <Stack.Screen name="ViewSubCategories" component={ViewSubCategories} />

      <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
      <Stack.Screen name="SelectCoverPhoto" component={SelectCoverPhoto} />

      <Stack.Screen name="ReviewDetails" component={ReviewDetails} />

      <Stack.Screen
        name="ClassifiedPublisher"
        component={ClassifiedPublisher}
      />
      <Stack.Screen name="TopicPublisher" component={TopicPublisher} />
      <Stack.Screen name="Publisher" component={Publisher} />

      <Stack.Screen name="Report" component={Report} />
      <Stack.Screen name="ReportAd" component={ReportAd} />
      <Stack.Screen name="Review" component={Review} />
      <Stack.Screen name="Favourities" component={Favourities} />

      <Stack.Screen name="DeliveryDetails" component={DeliveryDetails} />
      <Stack.Screen name="MyDeliveries" component={MyDeliveries} />
      <Stack.Screen
        name="ViewCurrentDelivery"
        component={ViewCurrentDelivery}
      />
      <Stack.Screen name="MyClassifieds" component={MyClassifieds} />
      <Stack.Screen name="MyTopics" component={MyTopics} />
      <Stack.Screen name="MyOrders" component={MyOrders} />

      <Stack.Screen name="CreateTopic" component={CreateTopic} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <RootStack.Screen name="FoodOrderDetail" component={FoodOrderDetail} />
      <Stack.Screen name="RatingsAndReviews" component={RatingsAndReviews} />
      <Stack.Screen name="CalssifiedCategory" component={CalssifiedCategory} />
      <Stack.Screen name="CurrentLocationMap" component={CurrentLocationMap} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen name="SeeAllClassifieds" component={SeeAllClassifieds} />
      <Stack.Screen
        name="SeeAllBuyingProducts"
        component={SeeAllBuyingProducts}
      />
      <Stack.Screen name="SeeAllTopics" component={SeeAllTopics} />
      <Stack.Screen name="SeeAllFood" component={SeeAllFood} />
      <Stack.Screen name="SeeAllServices" component={SeeAllServices} />

      <Stack.Screen
        name="PaymentMethodStack"
        component={PaymentMethodStack}
        options={hideHeaderOptions}
      />
      <Stack.Screen
        name="AddressStack"
        component={AddressStack}
        options={hideHeaderOptions}
      />
      <Stack.Screen
        name="AddressModal"
        component={AddressStack}
        options={modalStackOptions}
      />

      <RootStack.Screen name="Chat" component={Chat} />
      <RootStack.Screen name="Content" component={Content} />
      <RootStack.Screen name="InviteFriends" component={InviteFriends} />
    </Stack.Navigator>
  );
};

const App = () => {
  const userExists = useSelector(authSelectors.getUser)?._id ?? false;

  const _deepLinking = () => {
    // If the app is already open, the app is foregrounded and a Linking event is fired
    Linking.addEventListener('url', event => {
      _handleOpenURL(event.url);
    });

    // If the app is not already open, it is opened and the url is passed in as the initialURL
    Linking.getInitialURL()
      .then(url => {
        _handleOpenURL(url);
      })
      .catch(err => {
        console.warn('Deep-Linking Error', err);
      });
  };

  const _handleOpenURL = url => {
    if (url) {
      if (userExists) {
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];

        if (url.includes('classified_share')) {
          NavigationService.navigate('ClassifiedDetail', { classifiedId: id });
        } else if (url.includes('advertisement_share')) {
          NavigationService.navigate('AdvertismentDetail', { id });
        }
      }
    }
  };

  React.useEffect(_deepLinking);

  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    >
      <RootStack.Navigator mode="modal" screenOptions={modalOptions}>
        <RootStack.Screen
          name="Main"
          component={AppStack}
          options={{
            headerShown: false,
            animationEnabled: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <RootStack.Screen
          name="SearchScreen"
          component={SearchScreen}
          options={{ transitionSpec: transitionSpecSearch }}
        />
        <RootStack.Screen
          name="Calling"
          component={Calling}
          options={transitionSpecCall}
        />
        <RootStack.Screen name="LocationSearch" component={LocationSearch} />
        <RootStack.Screen name="MyCart" component={MyCart} />
        <RootStack.Screen
          name="FoodOrderInProgress"
          component={FoodOrderInProgress}
        />
        <RootStack.Screen
          name="FiltersClassified"
          component={FiltersClassified}
        />
        <RootStack.Screen name="FiltersBuying" component={FiltersBuying} />
        <RootStack.Screen name="FiltersTopic" component={FiltersTopic} />
        <RootStack.Screen name="FiltersFood" component={FiltersFood} />
        <RootStack.Screen name="FilterService" component={FilterService} />
        <RootStack.Screen name="FiltersRadius" component={FiltersRadius} />
        <RootStack.Screen
          name="ConsultancyStack"
          component={ConsultancyStack}
          options={modalStackOptions}
        />
        <RootStack.Screen
          name="PaymentMethodModal"
          component={PaymentMethodStack}
          options={modalStackOptions}
        />
        <RootStack.Screen
          name="AuthModal"
          component={AuthStack}
          options={modalStackOptions}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// const config = {
//   screens: {
//     Main: {
//       initialRouteName: 'Dashboard',
//       screens: {
//         Settings: 'settings',
//         ClassifiedDetail: 'share/classified/:classifiedId',
//       },
//     },
//     Profile: 'user',
//   },
// };

// const linking = {
//   prefixes: ['bizad://'],
//   config,
// };

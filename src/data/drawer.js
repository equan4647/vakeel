import { Images } from '../theme';
import { ClassifiedUtil } from '../DataUtils';

export const userDrawer = [
  {
    name: 'My Classifieds',
    route: 'MyClassifieds',
    image: Images.drawer.classified,
    onPress: () => {
      ClassifiedUtil.navigateToMyClassified();
    },
  },
  {
    name: 'Orders',
    route: 'MyOrders',
    image: Images.drawer.orders,
    params: { fromMenu: true },
  },
  {
    name: 'Deliveries',
    route: 'MyDeliveries',
    image: Images.drawer.deliveries,
  },
  {
    name: 'Service History',
    stack: 'SearchHistoryStack',
    route: 'ServiceHistory',
    image: Images.drawer.service,
  },
  {
    name: 'Calendar',
    stack: 'CalendarStack',
    route: 'Calendar',
    image: Images.drawer.calendar,
  },
  {
    name: 'Favorites',
    route: 'Favourities',
    image: Images.drawer.favorite,
  },
  {
    name: 'Payment Method',
    stack: 'PaymentMethodStack',
    route: 'PaymentMethod',
    params: { fromMenu: true },
    image: Images.drawer.wallet,
  },
  {
    name: 'Advertising',
    route: 'AdvertismentStack',
    image: Images.drawer.advertising,
  },
  {
    name: 'Addresses',
    stack: 'AddressStack',
    route: 'AddressScreen',
    params: { isMine: true },
    image: Images.drawer.addresses,
  },
  {
    name: 'Messages',
    route: 'Messages',
    image: Images.drawer.messages,
  },
  {
    name: 'Settings',
    route: 'Settings',
    image: Images.drawer.settings,
  },
];

export const guestDrawer = [
  {
    name: 'Advertising',
    route: 'AdvertismentStack',
    image: Images.drawer.advertising,
  },
  {
    name: 'Settings',
    route: 'Settings',
    image: Images.drawer.settings,
  },
];

export const darwerFooter = [
  {
    name: 'Become a Bringer',
    route: 'MyClassifieds',
  },
  {
    name: 'Create Boomin Account',
    route: 'MyClassifieds',
  },
  {
    name: 'Logout',
    route: 'MyClassifieds',
  },
];

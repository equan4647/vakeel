import { ORDER_STATUS } from '../config/Constants';
import { Images } from '../theme';

const deliveries = [
  {
    orderId: '11789658',
    time: '26 Jun, 2020, 6:00 PM',
    pickUpLocation: '81 Greenleaf Ave Staten Island, NY',
    dropoffLocation: '72 Greenleaf Ave Staten Island, NY',
    status: ORDER_STATUS.IN_PROGRESS,
    vehicleNumber: 'ABD-9942',
    vehicleTitle: 'Van/Car',
    vehicleImage: Images.vehicles.van,
    bringerImage: Images.dummyImages.dummyProfilePic,
    bringerName: 'Garry Fielder',
    bringerCharges: '78.99',
    bringerRating: 4,
    details:
      'Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudant ium, totam rem aperiam',
    paymentMethod: '**** **** **** 6356',
  },
  {
    orderId: '11789659',
    time: '26 Jun, 2020, 6:00 PM',
    pickUpLocation: '81 Greenleaf Ave Staten Island, NY',
    dropoffLocation: '72 Greenleaf Ave Staten Island, NY',
    status: ORDER_STATUS.COMPLETED,
    vehicleNumber: 'ABD-9942',
    vehicleTitle: 'Van/Car',
    vehicleImage: Images.vehicles.van,
    bringerImage: Images.dummyImages.dummyProfilePic,
    bringerName: 'Garry Fielder',
    bringerCharges: '78.99',
    bringerRating: 4,
    details:
      'Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudant ium, totam rem aperiam',
    paymentMethod: '**** **** **** 6356',
    reviewd: false,
  },
  {
    orderId: '11789660',
    time: '26 Jun, 2020, 6:00 PM',
    pickUpLocation: '81 Greenleaf Ave Staten Island, NY',
    dropoffLocation: '72 Greenleaf Ave Staten Island, NY',
    status: ORDER_STATUS.COMPLETED,
    vehicleNumber: 'ABD-9942',
    vehicleTitle: 'Van/Car',
    vehicleImage: Images.vehicles.van,
    bringerImage: Images.dummyImages.dummyProfilePic,
    bringerName: 'Garry Fielder',
    bringerCharges: '78.99',
    bringerRating: 4,
    details:
      'Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudant ium, totam rem aperiam',
    paymentMethod: '**** **** **** 6356',
    reviewd: true,
    rating: 3,
  },
  {
    orderId: '11789661',
    time: '26 Jun, 2020, 6:00 PM',
    pickUpLocation: '81 Greenleaf Ave Staten Island, NY',
    dropoffLocation: '72 Greenleaf Ave Staten Island, NY',
    status: ORDER_STATUS.CANCELLED,
    vehicleNumber: 'ABD-9942',
    vehicleTitle: 'Van/Car',
    vehicleImage: Images.vehicles.van,
    bringerImage: Images.dummyImages.dummyProfilePic,
    bringerName: 'Garry Fielder',
    bringerCharges: '78.99',
    bringerRating: 4,
    details:
      'Sed ut perspiciatis unde omnis iste natus sit voluptatem accusantium doloremque laudant ium, totam rem aperiam',
    paymentMethod: '**** **** **** 6356',
  },
];

export default deliveries;

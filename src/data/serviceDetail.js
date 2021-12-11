import { Images } from '../theme';

export const serviceDetail = {
  type: 'Repairing',
  title: 'Car Suspension Repairing',
  price: '120.00',
  rating: 250,
  location: 'Long Island',
  time: '1 hr service time',
  isFavorite: true,

  images: [
    Images.dummyImages.carimg8,
    Images.dummyImages.carimg9,
    Images.dummyImages.cartItem3,
    Images.dummyImages.cartItem4,
  ],
  description:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa ',
  seller: {
    name: 'Garry Fielder',
    memberSince: 'June 2018',
    image: Images.dummyImages.dummyProfilePic,
  },
  details: [
    { name: 'MONDAY', value: '11:00 AM - 9:00 PM' },
    { name: 'TUESDAY', value: '11:00 AM - 9:00 PM' },
    { name: 'WEDNESDAY', value: '11:00 AM - 9:00 PM' },
    { name: 'THURSDAY', value: '11:00 AM - 9:00 PM' },
    { name: 'FRIDAY', value: '11:00 AM - 9:00 PM' },
    { name: 'SATURDAY', value: '11:00 AM - 9:00 PM' },
    { name: 'SUNDAY', value: '11:00 AM - 9:00 PM' },
  ],
};

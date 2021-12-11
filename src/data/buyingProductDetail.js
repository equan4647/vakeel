import { Images } from '../theme';

export const productDetail = {
  name: 'Yellow Sneakers Shoes',
  price: '89.90',
  rating: 250,
  location: 'Long Island',
  time: 'Today',
  isFavorite: true,

  images: [
    Images.dummyImages.cartItem5,
    Images.dummyImages.cartItem1,
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
    { name: 'BRAND', value: 'Nike' },
    { name: 'MATERIAL', value: 'Sweat' },
    { name: 'CATEGORY', value: 'Shoes' },
    { name: 'CONDITION', value: 'New' },
  ],
};

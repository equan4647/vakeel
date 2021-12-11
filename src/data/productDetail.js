import { Images } from '../theme';

export const productDetail = {
  name: 'Audi A3 S-Line 2016',
  price: '$60000',
  location: 'Long Island',
  time: 'Today',
  isFavorite: true,
  make: 'Audi',
  model: 'A8',
  year: '2016',
  kms_driven: '17000 km',
  fuel: 'Gasoline',
  condition: 'New',
  registered_in: 'New York',
  images: [
    Images.dummyImages.dummyCarLarge,
    Images.dummyImages.dummyCarLarge,
    Images.dummyImages.dummyCarLarge,
    Images.dummyImages.dummyCarLarge,
    Images.dummyImages.dummyCarLarge,
    Images.dummyImages.dummyCarLarge,
  ],
  description:
    'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa ',
  seller: {
    name: 'Garry Fielder',
    memberSince: 'June 2018',
    image: Images.dummyImages.dummyProfilePic,
  },
  details: [
    { name: 'MAKE', value: 'Audi' },
    { name: 'MODEL', value: 'A8' },
    { name: 'YEAR', value: '2016' },
    { name: 'KMS DRIVEN', value: '17000 km' },
    { name: 'FUEL', value: 'Gasoline' },
    { name: 'CONDITION', value: 'New' },
    { name: 'REGISTERED IN', value: 'New York' },
  ],
};

import { Images } from '../theme';

export default [
  {
    vendor: 'Kim’s Accessories',
    items: [
      {
        image: Images.dummyImages.cartItem1,
        name: 'Floral Sling Bag',
        color: '#c59052',
        quantity: 1,
        price: 12.99,
        productID: 1,
      },

      {
        image: Images.dummyImages.cartItem2,
        name: 'Nike Shoes',
        color: '#c59052',
        size: 32,
        quantity: 1,
        price: 12.99,
        productID: 2,
      },
    ],
  },

  {
    vendor: 'Mira’s Boutique',
    items: [
      {
        image: Images.dummyImages.cartItem3,
        name: 'Floral Sleeveless Dress',
        color: '#fff',
        size: 32,
        quantity: 1,
        price: 12.99,
        productID: 3,
      },

      {
        image: Images.dummyImages.cartItem4,
        name: 'Beige And Black Hat ',
        color: '#c59052',
        quantity: 1,
        price: 12.99,
        productID: 4,
      },
    ],
  },
];

export const foodCart = {
  restaurantName: 'New York Burgers',
  estTime: '30 mins',
  items: [
    {
      image: Images.dummyImages.burger1small,
      name: 'Whooper',
      desc: 'Whopper Burger with chees a…',
      color: '#c59052',
      quantity: 1,
      price: 12.99,
      productID: 1,
    },

    {
      image: Images.dummyImages.burger2small,
      name: 'A Box Deal',
      desc: '2 Whopper Burger with chees a…',
      color: '#c59052',
      size: 32,
      quantity: 1,
      price: 12.99,
      productID: 2,
    },
  ],
};
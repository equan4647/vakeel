import { Images } from '../theme';

const resturantDetail = {
  title: 'New York Burgers',
  tags: ['Burgers', 'Fast food', 'American'],
  time: '20 mins',
  avgRating: 2,
  ratingCount: 250,
  image: Images.dummyImages.foodItem3,
  categories: [
    {
      id: 1,
      title: 'Deals',
      items: [
        {
          id: 1,
          title: 'A Box Deal',
          descrption: '2 Whopper Burger with chees and a drink',
          price: '$15',
          image: Images.dummyImages.burger1small,
        },
        {
          id: 2,
          title: '2 Box Deal',
          descrption: '4 Whopper Burger with chees and 4 drinks',
          price: '$28',
          image: Images.dummyImages.burger1small,
        },
        {
          id: 3,
          title: 'A Box Deal',
          descrption: '2 Whopper Burger with chees and a drink',
          price: '$30',
          image: Images.dummyImages.burger1small,
        },
      ],
    },
    {
      id: 2,
      title: 'Whooper Fest',
      items: [
        {
          id: 1,
          title: 'Whooper',
          descrption: '2 Whopper Burger with chees and a drink',
          price: '$15',
          image: Images.dummyImages.burger1small,
        },
        {
          id: 2,
          title: 'Whooper Chees',
          descrption: '4 Whopper Burger with chees and 4 drinks',
          price: '$28',
          image: Images.dummyImages.burger1small,
        },
      ],
    },
    {
      id: 2,
      title: 'BBQ',
      items: [
        {
          id: 1,
          title: 'BBQ1',
          descrption: '2 Whopper Burger with chees and a drink',
          price: '$15',
          image: Images.dummyImages.burger1small,
        },
        {
          id: 2,
          title: 'BBQ2',
          descrption: '4 Whopper Burger with chees and 4 drinks',
          price: '$28',
          image: Images.dummyImages.burger1small,
        },
        {
          id: 3,
          title: 'BBQ3',
          descrption: '2 Whopper Burger with chees and a drink',
          price: '$30',
          image: Images.dummyImages.burger1small,
        },
      ],
    },
    {
      id: 3,
      title: 'Grilled Fest',
      items: [
        {
          id: 1,
          title: 'Grilled',
          descrption: '2 Whopper Burger with chees and a drink',
          price: '$15',
          image: Images.dummyImages.burger1small,
        },
        {
          id: 2,
          title: 'Grilled Chees',
          descrption: '4 Whopper Burger with chees and 4 drinks',
          price: '$28',
          image: Images.dummyImages.burger1small,
        },
        {
          id: 3,
          title: 'Grilled Beef',
          descrption: '2 Whopper Burger with chees and a drink',
          price: '$30',
          image: Images.dummyImages.burger1small,
        },
      ],
    },
    {
      id: 4,
      title: 'Side Orders',
      items: [
        {
          id: 1,
          title: 'Side Order 1',
          descrption: '2 Whopper Burger with chees and a drink',
          price: '$15',
          image: Images.dummyImages.burger1small,
        },
        {
          id: 2,
          title: 'Side Order 2',
          descrption: '4 Whopper Burger with chees and 4 drinks',
          price: '$28',
          image: Images.dummyImages.burger1small,
        },
        {
          id: 3,
          title: 'Side Order 3',
          descrption: '2 Whopper Burger with chees and a drink',
          price: '$30',
          image: Images.dummyImages.burger1small,
        },
      ],
    },
  ],
};

export default resturantDetail;

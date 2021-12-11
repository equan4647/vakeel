import React from 'react';

import { FoodList } from '../../common';
import { NavigationService } from '../../utils';

const SearchedFood = ({ navigation, route }) => {
  const title = route.params?.title ?? '';
  const identifier = route.params?.identifier ?? '';
  const payload = route.params?.payload ?? {};
  const hideSorting = route.params?.hideSorting ?? false;

  NavigationService.setHeader(navigation, title);

  return <FoodList {...{ identifier, payload, hideSorting }} />;
};

export default SearchedFood;

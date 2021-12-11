import React from 'react';

import { NavigationService } from '../../utils';
import { BuyingList } from '../../common';

const SeeAllBuyingProducts = ({ navigation, route }) => {
  // get product attributes
  const title = route.params?.title ?? '';
  const identifier = route.params?.identifier ?? '';
  const payload = route.params?.payload ?? {};
  const hideSorting = route.params?.hideSorting ?? false;

  // set header
  NavigationService.setHeader(navigation, title);

  return <BuyingList {...{ payload, identifier, hideSorting }} />;
};

export default SeeAllBuyingProducts;

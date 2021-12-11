import React from 'react';

import { API_CLASSIFIED_LIST } from '../../config/WebService';
import { NavigationService } from '../../utils';
import { AdsList } from '../../common';

const SeeAllClassifieds = ({ navigation, route }) => {
  // get product attributes
  const title = route.params?.title ?? '';
  const identifier = route.params?.identifier ?? '';
  const payload = route.params?.payload ?? {};
  const url = route.params?.url ?? API_CLASSIFIED_LIST;
  const hideSorting = route?.params?.hideSorting ?? false;
  const hideFilters = route?.params?.hideFilters ?? false;
  const addLocationRadius = route?.params?.addLocationRadius ?? true;

  // set header
  NavigationService.setHeader(navigation, title);

  return (
    <AdsList
      {...{
        payload,
        identifier,
        url,
        hideSorting,
        hideFilters,
        addLocationRadius,
      }}
    />
  );
};

export default SeeAllClassifieds;

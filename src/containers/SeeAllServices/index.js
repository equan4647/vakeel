import React from 'react';

import { serviceData2 } from '../../data/serviceData';
import { NavigationService } from '../../utils';
import { ServiceList } from '../../common';
import { API_SERVICES_LIST_CATEGORIES } from '../../config/WebService';

const SeeAllServices = ({ navigation, route }) => {
  const title = route.params?.title ?? '';
  const identifier = route.params?.identifier ?? '';
  const payload = route.params?.payload ?? {};
  const url = route.params?.url ?? API_SERVICES_LIST_CATEGORIES;
  const hideSorting = route?.params?.hideSorting ?? false;
  const hideFilters = route?.params?.hideFilters ?? false;
  const addLocationRadius = route?.params?.addLocationRadius ?? true;

  NavigationService.setHeader(navigation, title);

  return (
    <ServiceList
      // data={serviceData2}
      // payload={{ category_id: category._id }}
      // identifier={`${category._id}`}
      // url={API_SERVICES_LIST_CATEGORIES}
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

export default SeeAllServices;

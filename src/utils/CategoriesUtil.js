import {
  API_MARKETPLACE_CATEGORIES_LIST,
  API_CLASSIFIED_CATEGORIES,
  API_SERVICES_CATEGORIES,
} from '../config/WebService';
import { MODULE, IDENTIFIERS } from '../config/Constants';
import { NavigationService } from '../utils';
import { strings } from './i18n';

function getCategoryName(item) {
  return item?.title ?? '';
}

function getCategoryImage(item) {
  return item?.icon ?? item?.image ?? '';
}

function getCategoriesTabs(item) {
  const subCategories = item?.child_categories ?? [];
  return [{ _id: 'ALL', title: strings('app.all') }, ...subCategories];
}

function viewCategoriesInfo(module) {
  const navigationTitle =
    module === MODULE.SERVICE
      ? strings('app.service_categories')
      : strings('app.more_categories');

  if (module === MODULE.BUYING) {
    return {
      navigationTitle,
      identifier: IDENTIFIERS.ALL_CATEGORIES_MARKETPLACE,
      url: API_MARKETPLACE_CATEGORIES_LIST,
      payload: {},
    };
  }

  if (module === MODULE.CLASSIFIED) {
    return {
      navigationTitle,
      identifier: IDENTIFIERS.ALL_CATEGORIES_CLASSIFIED,
      url: API_CLASSIFIED_CATEGORIES,
      payload: {},
    };
  }

  if (module === MODULE.SERVICE) {
    return {
      navigationTitle,
      identifier: IDENTIFIERS.ALL_CATEGORIES_SERVICES,
      url: API_SERVICES_CATEGORIES,
      payload: {},
    };
  }

  return {
    navigationTitle,
    identifier: IDENTIFIERS.ALL_CATEGORIES_MARKETPLACE,
    url: API_MARKETPLACE_CATEGORIES_LIST,
    payload: {},
  };
  /*
    if (module === MODULE.BUYING) {
    return { navigationTitle };
  }
  */
}

function navigateCategoryItem(item, module, extraParams = {}) {
  if (module === MODULE.BUYING) {
    NavigationService.navigate('SearchedBuyingCats', { item });
  }
  if (module === MODULE.SERVICE) {
    NavigationService.navigate('SearchedServiceCats', { item });
  }
  if (module === MODULE.CLASSIFIED) {
    NavigationService.navigate('ViewSubCategories', {
      categoryItem: item,
      module,
      ...extraParams,
    });
  }
}

function getSubCategories(item, isAddClassified = false) {
  const subCategories = item?.children ?? [];
  if (isAddClassified) {
    return subCategories;
  }
  const viewAll = {
    id: item.id,
    isParentCategory: true,
    title: getCategoryName(item),
  };
  return [...subCategories, viewAll];
}

export default {
  getCategoryName,
  getCategoryImage,
  getCategoriesTabs,
  getSubCategories,
  viewCategoriesInfo,
  navigateCategoryItem,
};

import {
  API_SEARCH_TAGS,
  API_CLASSIFIED_SEARCH_TAGS,
  API_SERVICES_SEARCH_TAGS,
  API_SEARCH_FOOD,
} from '../config/WebService';
import { MODULE, CLASSIFIED_TAG_TYPE } from '../config/Constants';

function getAutoSuggestUrl(identifier) {
  switch (identifier) {
    case MODULE.BUYING:
      return API_SEARCH_TAGS;

    case MODULE.CLASSIFIED:
      return API_CLASSIFIED_SEARCH_TAGS;

    case MODULE.SERVICE:
      return API_SERVICES_SEARCH_TAGS;

    case MODULE.FOOD:
      return API_SEARCH_FOOD;

    default:
      return API_SEARCH_TAGS;
  }
}

function getAutoSuggestData(identifier, response) {
  switch (identifier) {
    case MODULE.SERVICE:
    case MODULE.FOOD:
    case MODULE.BUYING:
      return getBuyingData(response);

    case MODULE.CLASSIFIED:
      return getClassifiedData(response);

    default:
      return [];
  }
}

function getBuyingData(response) {
  const dataArray = response?.data ?? [];
  const autoSuggestList = dataArray.map(item => {
    return { title: item };
  });
  return autoSuggestList;
}

function getClassifiedData(response) {
  // auto suggest list
  const autoSuggestList = [];

  // get arrays
  const category = response?.data?.category ?? [];
  const subCategory = response?.data?.subCategory ?? [];
  const tags = response?.data?.tags ?? [];

  // set data category
  category.map(item => {
    autoSuggestList.push({
      title: item?.title ?? '',
      info: item,
      type: CLASSIFIED_TAG_TYPE.CATEGORY,
    });
  });

  // set data sub-category
  subCategory.map(item => {
    autoSuggestList.push({
      title: item?.title ?? '',
      info: item,
      type: CLASSIFIED_TAG_TYPE.SUB_CATEGORY,
    });
  });

  // set data tags
  tags.map(item => {
    autoSuggestList.push({
      title: item?.tag ?? '',
      type: CLASSIFIED_TAG_TYPE.TAG,
    });
  });

  // return auto suggest list
  return autoSuggestList;
}

function getAutoSuggestPayload(identifier, payload) {
  const { keyword } = payload;
  switch (identifier) {
    case MODULE.SERVICE:
    case MODULE.BUYING:
      return payload;

    case MODULE.FOOD:
    case MODULE.CLASSIFIED: {
      return { search: keyword };
    }

    default:
      return API_SEARCH_TAGS;
  }
}

export default {
  getAutoSuggestUrl,
  getAutoSuggestData,
  getBuyingData,
  getClassifiedData,
  getAutoSuggestPayload,
};

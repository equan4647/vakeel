import moment from 'moment';
import _ from 'lodash';

import {
  FORM_TYPE,
  KEYBOARD_TYPE,
  CLASSIFIED_FILTER_ATTRIBUTE,
  FILTER,
  DATE_FORMAT,
  DATE_FORMAT_FILTER_CLASSIFIED,
  IDENTIFIERS,
  SHARE_MODULE_TYPE,
  NOTIFICATION_IDENTIFIERS,
} from '../config/Constants';
import {
  AppUtil,
  DataHandler,
  NavigationService,
  Util,
  CCFieldFormatter,
} from '../utils';
import { API_MY_CLASSIFIED } from '../config/WebService';
import { CLASSIFIED_SORTING } from '../data/searchFilters';
import { CLASSIFIED_TAG_TYPE } from '../config/Constants';
import ChatHelper from '../ChatUtil/ChatHelper';
import { strings } from '../utils/i18n';
import { UserUtil } from '../DataUtils';

import { categoriesActions } from '../ducks/categories';

function title(data) {
  return data?.title ?? '';
}

function coverImage(data) {
  if (Util.isNotEmpty(data.images)) {
    let converIndex = _.findIndex(data.images, ['is_cover', 1]);
    if (converIndex === -1) {
      converIndex = -1;
    }
    return data?.images[converIndex]?.image ?? '';
  }
  return '';
}

function address(data) {
  let addressString = data?.address ?? '';
  addressString = String(addressString).replace('،', ',');
  return addressString;
}

function createdAt(data) {
  return data?.created_at ?? '';
}

function createdAtFormat(data) {
  return data.created_at ? moment(data.created_at).fromNow() : '';
}

function classifedAttributes(data) {
  return data?.attributes ?? [];
}

function isFavourite(data) {
  return data.like_products && Util.isNotEmpty(data.like_products)
    ? true
    : false;
}

function price(data, format = true) {
  const priceVal = data?.price ?? 0;
  return format ? AppUtil.formatPriceWithoutDecimal(priceVal) : priceVal;
}

function getClassifiedFormAttributes(data) {
  let titleClassifed = '';
  let descriptionClassified = '';
  const attributes_value = [];

  for (const [key, value] of Object.entries(data)) {
    //console.log('typeof value', typeof value);
    if (key === 'title') {
      titleClassifed = value;
    } else if (key === 'description') {
      descriptionClassified = value;
    } else if (value && typeof value === 'string') {
      attributes_value.push({ id: key, value: value });
    } else if (value && typeof value === 'object') {
      attributes_value.push({ id: key, value: value?.value ?? '' });
    }
  }

  return {
    title: titleClassifed,
    description: descriptionClassified,
    attributes_value,
  };
}

function classifiedAddForm() {
  // set default values
  const classifiedInfo = DataHandler.getClassifiedAddInfo();

  //console.log('classifiedInfo', classifiedInfo);

  const attributes = classifiedInfo?.attributes ?? [];
  const attributes_value = classifiedInfo?.attributes_value ?? [];
  const adTitle = classifiedInfo?.title ?? '';
  const adDescription = classifiedInfo?.description ?? '';

  // set default array
  const formArray = [];

  // set obejcts for getting values
  const attributesObject = _.keyBy(attributes, 'id');
  const attributesValueObject = _.keyBy(attributes_value, 'id');

  // add dynamic attributes of form
  attributes.map((item, index) => {
    // set default attributes
    const itemObject = {
      id: item.id || `${index}`,
      formType: item.type || FORM_TYPE.INPUT,
      name: `${item.id}` || `${index}`,
      title: item.title || `${index}`,
      required: item.is_required ? true : false,
      data: item.values || [],
      customPlaceholder: item.custom_placeholder || item.title || `${index}`,
      showCharCount:
        item.show_character_count && item.max_characters ? true : false,
      multiline: item.multiline ? true : false,
    };

    // set default values
    const attributeExists = item.id && attributesValueObject[item.id];
    const isDropDownTag =
      item.type === FORM_TYPE.DROPDOWN || item.type === FORM_TYPE.TAGS;

    if (attributeExists && isDropDownTag) {
      const selectedValue = attributesValueObject[item.id]?.value ?? '';
      const allValueObjects = attributesObject[item.id]?.values ?? [];
      const selectedObject = _.find(allValueObjects, { value: selectedValue });
      itemObject.defaultValue = selectedObject;
      //const defaultValue = {id:attObj};
    } else if (attributeExists && !isDropDownTag) {
      console.log(
        'attributesValueObject[item.id]',
        attributesValueObject[item.id]
      );
      const selectedValue = attributesValueObject[item.id]?.value ?? '';
      itemObject.defaultValue = selectedValue;
    }

    // set max_characters
    if (item.max_characters) {
      itemObject.maxLength = item.max_characters;
    }

    // set keyboardtype
    if (item.keyboardtype && item.keyboardtype === KEYBOARD_TYPE.NUMBER) {
      itemObject.keyboardType = 'number-pad';
      //itemObject.formatValueChange =
      itemObject.formatValueChange = CCFieldFormatter.removeNonNumber;
    } else if (item.keyboardtype && item.keyboardtype === KEYBOARD_TYPE.EMAIL) {
      itemObject.keyboardType = 'email-address';
    }
    if (item.min && item.max) {
      itemObject.min = item.min;
      itemObject.max = item.max;
    }

    // add item to array
    formArray.push(itemObject);
  });

  // add title
  formArray.push({
    id: 'title',
    formType: FORM_TYPE.INPUT,
    name: 'title',
    required: true,
    title: strings('app.ad_title'),
    showCharCount: true,
    maxLength: 70,
    defaultValue: adTitle,
  });

  // add description
  formArray.push({
    id: 'description',
    formType: FORM_TYPE.INPUT,
    name: 'description',
    hint: strings('app.type_in_important_feature_of_item'),
    title: strings('app.ad_describe'),
    required: true,
    customTitle: strings('app.describe_your_item'),
    showCharCount: true,
    maxLength: 4096,
    multiline: true,
    defaultValue: adDescription,
  });

  // return array
  return formArray;
}

function openClassifedDetail(data) {
  const lastCategorySelected =
    DataHandler.getClassifiedAddInfo()?.category_id || '';
  if (lastCategorySelected !== data.id) {
    DataHandler.resetClassifiedAdInfo({
      category_id: data.id,
      attributes: data?.attributes ?? [],
    });
  }
  NavigationService.navigate('AddClassifiedDetail');
}

function openClassifedSerachSubCategory(data) {
  const item = data.isParentCategory
    ? { title: data.title, info: data, type: CLASSIFIED_TAG_TYPE.CATEGORY }
    : { title: data.title, info: data, type: CLASSIFIED_TAG_TYPE.SUB_CATEGORY };

  NavigationService.navigate('SearchedClassified', {
    item,
  });
}

//FILTER

/*
data: [
        { id: 1, value: strings('app.recent') },
        { id: 2, value: strings('app.old_newest') },
        { id: 3, value: strings('app.high_to_low_price') },
        { id: 4, value: strings('app.low_to_high_price') },
      ],
*/

function getDefaultValuesFilter(formInputs) {
  const defaultValues = {};
  formInputs.map((item, index) => {
    const { name, formType, leftInputProps, rightInputProps } = item;
    if (Util.isNotEmpty(leftInputProps) && Util.isNotEmpty(rightInputProps)) {
      defaultValues[leftInputProps.name] = '';
      defaultValues[rightInputProps.name] = '';
    } else if (formType === FORM_TYPE.MULTISLIDER) {
      defaultValues[name] = [];
    } else if (
      formType === FORM_TYPE.SNGLESLIDER ||
      formType === FORM_TYPE.DATE_PICKER ||
      formType === FORM_TYPE.DATE_RANGE ||
      formType === FORM_TYPE.INPUT
    ) {
      defaultValues[name] = '';
    } else if (formType === FORM_TYPE.TAGS || formType === FORM_TYPE.DROPDOWN) {
      defaultValues[name] = {};
    }
  });
  return defaultValues;
}

function filtersClassified(attributes, hideSorting, filtersApplied) {
  const formArray = [];
  // add sorting object
  if (hideSorting === false) {
    formArray.push({
      title: strings('app.sorting'),
      name: CLASSIFIED_FILTER_ATTRIBUTE.SORTING,
      id: CLASSIFIED_FILTER_ATTRIBUTE.SORTING,
      itemTitleKey: 'title',
      data: CLASSIFIED_SORTING,
      formType: FORM_TYPE.TAGS,
      defaultValue: filtersApplied[CLASSIFIED_FILTER_ATTRIBUTE.SORTING] || {},
    });
  }

  // add price and date range
  formArray.push({
    title: strings('app.price_range_in_usd'),
    name: CLASSIFIED_FILTER_ATTRIBUTE.PRICE_RANGE,
    id: CLASSIFIED_FILTER_ATTRIBUTE.PRICE_RANGE,
    min: FILTER.MINIMUM_PRICE_CLASSIFIED,
    max: FILTER.MAXIMUM_PRICE_CLASSIFIED,
    maxPlus: true,
    step: 1000,
    formType: FORM_TYPE.MULTISLIDER,
    defaultValue: filtersApplied[CLASSIFIED_FILTER_ATTRIBUTE.PRICE_RANGE] || [],
    //isRangeSlider: false,
  });
  formArray.push({
    isFilter: true,
    heading: strings('app.add_date_range'),
    leftInputProps: {
      name: CLASSIFIED_FILTER_ATTRIBUTE.START_DATE,
      defaultValue:
        filtersApplied[CLASSIFIED_FILTER_ATTRIBUTE.START_DATE] || '',
      extraProps: { maximumDate: new Date() },
    },
    rightInputProps: {
      name: CLASSIFIED_FILTER_ATTRIBUTE.END_DATE,
      defaultValue: filtersApplied[CLASSIFIED_FILTER_ATTRIBUTE.END_DATE] || '',
      extraProps: { maximumDate: new Date() },
    },
    formType: FORM_TYPE.DATE_RANGE,

    //isRangeSlider: false,
  });

  attributes.map((item, index) => {
    if (item.type === FORM_TYPE.DROPDOWN || item.type === FORM_TYPE.TAGS) {
      formArray.push({
        title: item?.title ?? '',
        name: `${item.id}` || `${index}`,
        id: item.id || index,
        data: item.values || [],
        formType: item.type,
        defaultValue: filtersApplied[item.id] || {},
      });
    } else if (
      item.type === FORM_TYPE.INPUT &&
      item.min &&
      item.min !== null &&
      item.max &&
      item.max !== null
    ) {
      const min = Number(item.min);
      let max = Number(item.max);
      formArray.push({
        title: item?.title ?? '',
        name: `${item.id}` || `${index}`,
        id: item.id || index,
        min: min,
        max: max,
        formType: FORM_TYPE.MULTISLIDER,
        defaultValue: filtersApplied[item.id] || [],
      });
    }
  });

  /*
  {
      heading: strings('app.search_near_by'),
      rightTitle: strings('app.miles'),
      name: CLASSIFIED_FILTER_ATTRIBUTE.RADIUS,
      id: CLASSIFIED_FILTER_ATTRIBUTE.RADIUS,
      min: 1,
      max: 100,
      step: 1,
      formType: FORM_TYPE.SNGLESLIDER,
    },
  */

  return formArray;
}

function classifiedFilterValues(data, attributes) {
  console.log('attributes', attributes);
  const attributesObject = _.keyBy(attributes, 'id');
  const filter_attributes = [];
  let priceRange = '';

  let sort = {};
  let startDate = '';
  let endDate = '';

  /*
  else if (key === CLASSIFIED_FILTER_ATTRIBUTE.RADIUS) {
    radius = value;
  }
  let radius = 1;
  */

  for (const [key, value] of Object.entries(data)) {
    if (value && Util.isNotEmpty(value)) {
      if (key === CLASSIFIED_FILTER_ATTRIBUTE.SORTING) {
        sort = value?.value?.sort;
      } else if (key === CLASSIFIED_FILTER_ATTRIBUTE.PRICE_RANGE) {
        if (
          value[0] !== FILTER.MINIMUM_PRICE_CLASSIFIED ||
          value[1] !== FILTER.MAXIMUM_PRICE_CLASSIFIED
        ) {
          const min = value[0];
          const max =
            value[1] !== FILTER.MAXIMUM_PRICE_CLASSIFIED
              ? value[1]
              : FILTER.MAXIMUM_PRICE_CLASSIFIED_PLUS;
          priceRange = `${min}-${max}`;
        }
      } else if (key === CLASSIFIED_FILTER_ATTRIBUTE.START_DATE) {
        startDate = value;
      } else if (key === CLASSIFIED_FILTER_ATTRIBUTE.END_DATE) {
        endDate = value;
      } else {
        const attObj = attributesObject[key];
        console.log('attObj', attributesObject);
        console.log('key', key);
        if (
          attObj.formType === FORM_TYPE.TAGS ||
          attObj.formType === FORM_TYPE.DROPDOWN
        ) {
          if (value && value.value) {
            filter_attributes.push({
              id: key,
              value: value?.value ?? '',
              type: 'default',
            });
          }
        } else if (attObj.formType === FORM_TYPE.MULTISLIDER) {
          if (
            Util.isNotEmpty(value) &&
            (attObj.min != value[0] || attObj.max != value[1])
          ) {
            filter_attributes.push({
              id: key,
              value: `${value[0]}-${value[1]}`,
              type: 'range',
            });
          }
        }
      }
    }
  }

  let filtersCount = 0;
  const filtersPayload = {};

  // add attributes filters
  if (filter_attributes.length > 0) {
    filtersCount += filter_attributes.length;
    filtersPayload.filter_attributes = JSON.stringify(filter_attributes);
  }

  // add price range
  if (Util.isNotEmpty(priceRange)) {
    filtersCount += 1;
    filtersPayload.price = priceRange;
  }

  // add sort
  if (Util.isNotEmpty(sort)) {
    filtersCount += 1;
    for (let keySort in sort) {
      sort[keySort] = `${sort[keySort]}`;
      //alert( p[key] );
    }
    filtersPayload.sort = JSON.stringify(sort);
  }

  // add start and end date
  if (startDate !== '' || endDate !== '') {
    const minDate =
      startDate !== '' ? startDate : FILTER.MINIMUM_DATE_CLASSIFIED;
    const maxDate = endDate !== '' ? endDate : FILTER.MAXIMUM_DATE_CLASSIFIED;
    filtersCount += 1;
    filtersPayload.date_range = `${Util.formatDate(
      minDate,
      DATE_FORMAT,
      DATE_FORMAT_FILTER_CLASSIFIED
    )}-${Util.formatDate(maxDate, DATE_FORMAT, DATE_FORMAT_FILTER_CLASSIFIED)}`;
  }

  return { filtersPayload, filtersCount };
}

function imagesList(data) {
  return data?.images?.flatMap(item => item?.image ?? '') ?? [''];
}

function location(data) {
  return data?.address ?? '';
}

function description(data) {
  return data?.description ?? '';
}

function getUser(data) {
  return data?.user ?? {};
}

function getSearchItemInfo(searchItem) {
  switch (searchItem.type) {
    case CLASSIFIED_TAG_TYPE.CATEGORY: {
      return {
        title: searchItem.title,
        payload: { search_category: searchItem.info.id, is_parent: 1 },
        attributes: [],
      };
    }
    case CLASSIFIED_TAG_TYPE.SUB_CATEGORY: {
      return {
        title: searchItem.title,
        payload: { search_category: searchItem.info.id },
        attributes: searchItem?.info?.attributes ?? [],
      };
    }
    default: {
      return {
        title: searchItem.title,
        payload: { search: searchItem.title },
        attributes: searchItem?.attributes ?? [],
      };
    }
  }
}

function getUserId(data) {
  return data?.user_id ?? 0;
}

function editClassified(classifiedItem) {
  const { categories } = DataHandler.getStore().getState();
  const category_id = classifiedItem.category_id;
  const categoryIdentifier = `${IDENTIFIERS.SUB_CATEGORY_CLASSIFIED}_${category_id}`;
  const editCategory = categories[categoryIdentifier] || [];
  if (Util.isEmpty(editCategory)) {
    DataHandler.getTopLoaderRef().show();
    DataHandler.getStore().dispatch(
      categoriesActions.requestCategoryDetail(
        category_id,
        categoryIdentifier,
        (success, data) => {
          DataHandler.getTopLoaderRef().hide();
          if (success) {
            setCategoryAttributesEdit(classifiedItem, data);
          } else {
          }
        }
      )
    );
  } else {
    setCategoryAttributesEdit(classifiedItem, editCategory);
  }
}

function setCategoryAttributesEdit(classifiedItem, editCategory) {
  const categoryAttributes = editCategory?.attributes ?? [];
  const { images, attributes } = classifiedItem;

  // set images Array
  const imagesArray = Util.isNotEmpty(images)
    ? images.map(item => {
        return {
          url: item?.image ?? '',
          is_cover: item?.is_cover ?? 0,
          is_local: 0,
        };
      })
    : [];

  // set attributes array
  const attributesArray = Util.isNotEmpty(attributes)
    ? attributes.map(item => {
        return {
          id: item?.pivot?.attribute_id ?? 0,
          value: item?.pivot?.value ?? '',
        };
      })
    : [];

  // set classified edit item
  const updateClassifiedItem = {
    attributes: categoryAttributes,
    images: imagesArray,
    attributes_value: attributesArray,
    category_id: classifiedItem?.category_id ?? 0,
    title: classifiedItem?.title ?? '',
    description: classifiedItem?.description ?? '',
    price: `${classifiedItem?.price ?? 0}`,
    latitude: classifiedItem.latitude ? Number(classifiedItem.latitude) : 0,
    longitude: classifiedItem.longitude ? Number(classifiedItem.longitude) : 0,
    status: classifiedItem?.status ?? 1,
    address: classifiedItem?.address ?? '',
    id: classifiedItem?.id ?? 0,
  };

  // set info object
  DataHandler.setClassifiedAdInfo(updateClassifiedItem);

  // open classified detail
  NavigationService.navigate(
    'AddClassifiedDetail',
    { isEdit: true },
    'ClassifiedAddStack'
  );
}

function shareClassified(classifiedId) {
  // const shareUrl = `${CLASSIFIED_SHARE}${classifiedId}`;
  AppUtil.share(
    AppUtil.getShareURL(SHARE_MODULE_TYPE.CLASSIFIED, classifiedId)
  );
}

function callUserClassifed(user) {
  const phoneNumber = UserUtil.fullPhoneNumber(user);
  AppUtil.call(phoneNumber);
}

function messageUserClassifed(user) {
  const phoneNumber = UserUtil.fullPhoneNumber(user);
  AppUtil.message(phoneNumber);
}

function chatUserClassifed(user) {
  //console.log('chat with user', user);
  //const rocketChatUsername = UserUtil.getRocketChatUserName(user);
  ChatHelper.getRoomNameAndNavigate(user);

  //const currentRocketChatUserName = ChatHelper.getRocketChatUserName();

  //console.log('rocketChatUsername', rocketChatUsername);
  //console.log('currentRocketChatUserName', currentRocketChatUserName);
  /*
  const rocketChatUsername = UserUtil.getRocketChatUserName(user);

  //rocketChatUsername bizad-undefined6061b40d00a50566eff1ca76

  console.log('rocketChatUsername', rocketChatUsername);

  ChatHelper.navigateToChat(
    'classfieid-30',
    'bizad-undefined6061b40d00a50566eff1ca76',
    {
      classifeidId: 1,
    }
  );
  */

  /*
  navigateToChat(
    'classfieid-30',
    'bizad-undefined6061b30600a50566eff1ca74',
    { classifeidId: 1 }
  );
  */
  //ChatHelper.navigateToUserChat(user);
}

function navigateToMyClassified() {
  const sort = { ...FILTER.SORT.RECENT.sort };
  sort.createdAt = `${sort.createdAt}`;

  NavigationService.closeDrawer();
  NavigationService.navigate('SeeAllClassifieds', {
    title: strings('app.my_classifieds'),
    identifier: IDENTIFIERS.MY_CLASSIFIED,
    payload: { sort: JSON.stringify(sort) },
    url: API_MY_CLASSIFIED,
    hideFilters: true,
  });
}

function getLat(data) {
  return data?.latitude ?? 0;
}

function getLong(data) {
  return data?.longitude ?? 0;
}

function showFavourite(data) {
  const classifedUserId = data?.user?._id ?? '0';
  const currentUserId =
    DataHandler.getStore().getState()?.auth?.data?._id ?? '0';

  return classifedUserId !== currentUserId;
}

function isClassifiedNotification(identifier) {
  const {} = NOTIFICATION_IDENTIFIERS;
  return [].includes(identifier);
}

export default {
  title,
  coverImage,
  address,
  getLat,
  getLong,
  createdAt,
  showFavourite,
  createdAtFormat,
  isFavourite,
  description,
  price,
  getClassifiedFormAttributes,
  classifiedAddForm,
  imagesList,
  openClassifedDetail,
  openClassifedSerachSubCategory,
  filtersClassified,
  classifiedFilterValues,
  location,
  classifedAttributes,
  getUser,
  getSearchItemInfo,
  callUserClassifed,
  chatUserClassifed,
  messageUserClassifed,
  getDefaultValuesFilter,
  getUserId,
  editClassified,
  shareClassified,
  navigateToMyClassified,
  isClassifiedNotification,
};

/*
function editClassified(classifiedItem) {
  const { categories } = DataHandler.getStore().getState();
  const allCategories = categories[IDENTIFIERS.ALL_CATEGORIES_CLASSIFIED] || [];
  if (Util.isEmpty(allCategories)) {
    DataHandler.getTopLoaderRef().show();
    categoriesActions.getAllCategoriesClasified((success, data) => {
      DataHandler.getTopLoaderRef().hide();
      if (success) {
        setCategoryAttributesEdit(classifiedItem, data);
      } else {
      }
    });
  } else {
    setCategoryAttributesEdit(classifiedItem, allCategories);
  }
}

function setCategoryAttributesEdit(classifiedItem, categories) {
  const category_id = classifiedItem.category_id;

  let attributes = [];
  if (categories.length > 0) {
    const catgeoryObj = _(categories)
      .thru(function (coll) {
        return _.union(coll, _.map(coll, 'children') || []);
      })
      .flatten()
      .find({ id: category_id });
    if (
      Util.isNotEmpty(catgeoryObj) &&
      Util.isNotEmpty(catgeoryObj.attributes)
    ) {
      attributes = catgeoryObj.attributes;
    }
  }

  DataHandler.setClassifiedAdInfo({ ...classifiedItem, attributes });
  NavigationService.navigate('AddClassifiedDetail', {}, 'ClassifiedAddStack');
}
*/

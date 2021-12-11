import { useForm } from 'react-hook-form';
import { ScrollView, Keyboard } from 'react-native';
import React from 'react';

import {
  Tags,
  MultiSlider,
  BottomButton,
  StarRatingController,
} from '../../common';

import { useInputProps } from '../../utils/CustomHooks';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import { FILTER, RATING_TYPE, STAR_SIZE } from '../../config/Constants';
import styles from './styles';
import { SERVICES_SORTING } from '../../data/searchFilters';

const FilterService = ({ navigation, route }) => {
  const onApply = route.params?.onApply;
  const defaultValues = route.params?.filterSelectedValues ?? {};

  // set form hooks
  const formObj = useForm({
    defaultValues: defaultValues,
  });

  // const tagsProps = useInputProps(formObj, 'tags');
  const sortingProps = useInputProps(formObj, 'sorting');
  const priceRangeProps = useInputProps(formObj, 'price_range');
  const rating_limit = useInputProps(formObj, 'rating_limit');

  //submit
  const submit = formObj.handleSubmit(values => {
    Keyboard.dismiss();
    setTimeout(() => {
      const val = formObj.getValues();
      onApply?.(val);
      NavigationService.pop();
    }, 100);
  });

  const onClearPress = () => {
    formObj.reset({ sorting: {}, price_range: [], rating_limit: 0 });
  };

  // set title
  NavigationService.setFilterHeader(
    navigation,
    strings('app.filter'),
    onClearPress
  );

  return (
    <>
      <ScrollView
        style={[AppStyles.container]}
        contentContainerStyle={AppStyles.contentContainerStyle}
        keyboardShouldPersistTaps="handled"
      >
        {/* <Tags title="Select Category" data={serviceCategory} {...tagsProps} /> */}

        <Tags
          title={strings('app.sorting')}
          data={SERVICES_SORTING}
          defaultValue={defaultValues?.tags ?? {}}
          {...sortingProps}
        />
        <MultiSlider
          min={FILTER.MINIMUM_PRICE_SERVICES}
          max={FILTER.MAXIMUM_PRICE_SERVICES}
          step={1000}
          title={strings('app.price_range_in_usd')}
          defaultValue={defaultValues?.price_range ?? []}
          maxPlus
          {...priceRangeProps}
        />

        {/* <HorizontalTitle title={strings('app.service_provider_rating')} /> */}
        {/* <StarRating
          style={styles.ratingHeading}
          type={RATING_TYPE.RATING_INPUT_WITH_TEXT}
          rating={4}
          size={STAR_SIZE.LARGE}
          {...rating_limit}
        /> */}
        <StarRatingController
          style={styles.ratingHeading}
          type={RATING_TYPE.RATING_INPUT_WITH_TEXT}
          // rating={4}
          title={strings('app.service_provider_rating')}
          titleStyle={styles.ratingHeading}
          size={STAR_SIZE.LARGE}
          {...rating_limit}
          defaultValue={0}
        />
      </ScrollView>

      <BottomButton onPress={submit} title={strings('app.apply_filter')} />
    </>
  );
};

export default FilterService;

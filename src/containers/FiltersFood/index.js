import React from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, ScrollView } from 'react-native';
import { Controller } from 'react-hook-form';

import { useInputProps } from '../../utils/CustomHooks';
import {
  BottomButton,
  StarRating,
  MultiSelectionCheckboxController,
  PriceSelection,
} from '../../common';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';
import { IDENTIFIERS, RATING_TYPE, STAR_SIZE } from '../../config/Constants';

import { API_GET_CUISINES } from '../../config/WebService';

const FiltersFood = ({ navigation, route }) => {
  const onApply = route.params?.onApply;
  const hideSorting = route?.params?.hideSorting ?? false;
  const defaultValues = route.params?.filterSelectedValues ?? {};

  // set form hooks
  const formObj = useForm({
    defaultValues: defaultValues,
  });

  const ratingProps = useInputProps(formObj, 'rating'),
    cusinesProps = useInputProps(formObj, 'cusines'),
    priceProps = useInputProps(formObj, 'price');

  //submit
  const submit = formObj.handleSubmit(values => {
    console.log({ values });
    Keyboard.dismiss();
    setTimeout(() => {
      const val = formObj.getValues();
      onApply?.(val);
      NavigationService.pop();
    }, 100);
  });

  const onClearPress = () =>
    formObj.reset(
      hideSorting ? { cusines: [] } : { rating: 0, cusines: [], price: [] }
    );

  // set title
  NavigationService.setFilterHeader(
    navigation,
    strings('app.filter'),
    onClearPress
  );

  return (
    <>
      <ScrollView
        style={AppStyles.container}
        contentContainerStyle={AppStyles.contentContainerStyle}
        keyboardShouldPersistTaps="handled"
      >
        <Controller
          {...priceProps}
          defaultValue={[]}
          render={({ onChange, value }) => (
            <PriceSelection
              value={value}
              title={strings('app.price_range_usd')}
              onSelection={onChange}
              contentContainerStyle={styles.priceRangeContainer}
            />
          )}
        />

        {hideSorting ? null : (
          <Controller
            {...ratingProps}
            render={({ onChange, value }) => (
              <StarRating
                title={strings('app.rating')}
                onPress={onChange}
                rating={value}
                titleStyle={styles.ratingHeading}
                size={STAR_SIZE.LARGE}
                type={RATING_TYPE.RATING_INPUT_WITH_TEXT}
              />
            )}
          />
        )}

        <MultiSelectionCheckboxController
          title="Cuisines"
          componentProps={{
            idKey: '_id',
            api: API_GET_CUISINES,
            identifier: IDENTIFIERS.CUISINES,
          }}
          {...cusinesProps}
        />
      </ScrollView>
      <BottomButton onPress={submit} title={strings('app.apply_filter')} />
    </>
  );
};

export default FiltersFood;

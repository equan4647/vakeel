import { useForm } from 'react-hook-form';
import { ScrollView, Keyboard } from 'react-native';
import React from 'react';

import { Tags, MultiSlider, BottomButton } from '../../common';
import { BUYING_SORTING } from '../../data/searchFilters';
import { useInputProps } from '../../utils/CustomHooks';
import { NavigationService } from '../../utils';
import { FILTER } from '../../config/Constants';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';

const FiltersBuying = ({ navigation, route }) => {
  const onApply = route.params?.onApply;
  const hideSorting = route?.params?.hideSorting ?? false;
  const defaultValues = route.params?.filterSelectedValues ?? {};

  const formObj = useForm({ defaultValues });
  const tagsProps = useInputProps(formObj, 'tags');
  const priceRangeProps = useInputProps(formObj, 'price_range');

  const onClearPress = () => formObj.reset({ tags: {}, price_range: [] });
  const submit = formObj.handleSubmit(values => {
    Keyboard.dismiss();
    setTimeout(() => {
      const val = formObj.getValues();
      onApply?.(val);
      NavigationService.pop();
    }, 100);
  });

  NavigationService.setFilterHeader(
    navigation,
    strings('app.filter'),
    onClearPress
  );

  return (
    <>
      <ScrollView
        style={AppStyles.container}
        keyboardShouldPersistTaps="handled"
      >
        {hideSorting ? null : (
          <Tags
            title={strings('app.sorting')}
            data={BUYING_SORTING}
            defaultValue={defaultValues?.tags ?? {}}
            {...tagsProps}
          />
        )}

        <MultiSlider
          min={FILTER.MINIMUM_PRICE_BUYING}
          max={FILTER.MAXIMUM_PRICE_BUYING}
          title={strings('app.price_range_in_usd')}
          defaultValue={defaultValues?.price_range ?? []}
          maxPlus
          {...priceRangeProps}
        />
      </ScrollView>
      <BottomButton onPress={submit} title={strings('app.apply_filter')} />
    </>
  );
};

export default FiltersBuying;

import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import React from 'react';

import { BottomButton, SingleSlider } from '../../common';
import { useInputProps } from '../../utils/CustomHooks';
import { FILTER } from '../../config/Constants';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';

const FiltersRadius = ({ navigation, route }) => {
  const radius = route?.params?.radius ?? FILTER.DEFAULT_RADIUS;
  const onSelect = route?.params?.onSelect ?? undefined;
  const formObj = useForm({ radius });
  const radiusProps = useInputProps(formObj, 'radius');
  const onClearPress = () => formObj.reset({ radius: FILTER.DEFAULT_RADIUS });

  const submit = formObj.handleSubmit(values => {
    // select radius
    if (onSelect) {
      onSelect(
        Array.isArray(values.radius) ? values.radius?.[0] : values.radius
      );
    }
    //pop screen
    NavigationService.pop();
  });

  NavigationService.setFilterHeader(
    navigation,
    strings('app.filter'),
    onClearPress
  );

  return (
    <>
      <View style={AppStyles.container}>
        <SingleSlider
          min={FILTER.MINIMUM_RADIUS}
          max={FILTER.MAXIMUM_RADIUS}
          step={1}
          defaultValue={radius}
          heading={strings('app.search_near_by')}
          rightTitle={strings('app.miles')}
          {...radiusProps}
        />
      </View>
      <BottomButton onPress={submit} title={strings('app.apply_filter')} />
    </>
  );
};

export default FiltersRadius;

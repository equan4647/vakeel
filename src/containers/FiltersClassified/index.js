import React from 'react';

import { NavigationService } from '../../utils';
import { ClassifiedUtil } from '../../DataUtils';
import { FormGenerator } from '../../common';
import { strings } from '../../utils/i18n';

const FiltersClassified = ({ navigation, route }) => {
  const onSelect = route.params?.onSelect ?? undefined;
  const attributes = route.params?.attributes ?? [];
  const hideSorting = route?.params?.hideSorting ?? false;
  const filtersApplied = route?.params?.filtersApplied ?? {};
  const formGeneratorRef = React.useRef();

  const formArray = React.useMemo(
    () =>
      ClassifiedUtil.filtersClassified(attributes, hideSorting, filtersApplied),
    []
  );

  const onClearPress = () => {
    if (formGeneratorRef.current) {
      formGeneratorRef.current.resetForm();
    }
  };

  const onSubmitForm = (data, formInputs) => {
    NavigationService.pop();

    const {
      filtersPayload,
      filtersCount,
    } = ClassifiedUtil.classifiedFilterValues(data, formInputs);

    if (onSelect) {
      onSelect({ filtersApplied: data, filtersPayload, filtersCount });
    }
  };

  NavigationService.setFilterHeader(
    navigation,
    strings('app.filter'),
    onClearPress
  );

  return (
    <>
      <FormGenerator
        buttonText={strings('app.apply_filter')}
        formInputs={formArray}
        onSubmitForm={onSubmitForm}
        ref={formGeneratorRef}
        isFilter
      />
    </>
  );
};

export default FiltersClassified;

import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollView, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import React from 'react';

import {
  TextInput,
  Tags,
  BottomButton,
  SelectionInput,
  MultiSlider,
  SingleSlider,
  DateRange,
} from '../../common';
import { Validation } from '../../utils/ValidationUtil';
import { ClassifiedUtil } from '../../DataUtils';
import { useInputProps } from '../../utils/CustomHooks';
import { FORM_TYPE } from '../../config/Constants';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';
import styles from './styles';

const FormGenerator = (
  { formInputs, buttonText, onSubmitForm, isFilter },
  forwardedRef
) => {
  // set default values and validations
  const defaultValues = {};
  const validations = {};
  formInputs.map((item, index) => {
    const { name, title, formType, required } = item;
    defaultValues[name] = item.defaultValue;
    if (required) {
      const requiredType =
        formType === FORM_TYPE.TAGS || formType === FORM_TYPE.DROPDOWN
          ? 'required_select'
          : 'required';
      const valueType =
        formType === FORM_TYPE.TAGS || formType === FORM_TYPE.DROPDOWN
          ? 'object'
          : 'string';
      if (item.min && item.max) {
        validations[name] = Validation.numeric_range(title, item.max, item.min);
      } else {
        validations[name] = Validation.required(title, requiredType, valueType);
      }
    }
  });

  // const set form object
  const formObj = useForm({
    resolver: yupResolver(yup.object().shape(validations)),
    defaultValues: defaultValues,
  });

  // show and hide functions for ref
  React.useImperativeHandle(forwardedRef, () => ({
    resetForm: () => {
      const defaultValuesFilters = ClassifiedUtil.getDefaultValuesFilter(
        formInputs
      );
      formObj.reset(defaultValuesFilters);
    },
  }));

  // set custom hooks
  const customHookArray = [];
  formInputs.map((item, index) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    if (item.formType === FORM_TYPE.DATE_RANGE) {
      const { leftInputProps, rightInputProps } = item;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const customHookLeft = useInputProps(formObj, leftInputProps.name);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const customHookRight = useInputProps(formObj, rightInputProps.name);
      customHookArray[index] = {
        leftInputProps: { ...leftInputProps, ...customHookLeft },
        rightInputProps: { ...rightInputProps, ...customHookRight },
      };
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      customHookArray[index] = useInputProps(formObj, item.name);
    }
  });

  //submit
  const submit = formObj.handleSubmit(data => {
    Keyboard.dismiss();
    setTimeout(() => {
      if (isFilter) {
        onSubmitForm(formObj.getValues(), formInputs);
      } else {
        onSubmitForm(formObj.getValues());
      }
    }, 200);

    // if (isFilter) {
    //   onSubmitForm(data, formInputs);
    // } else {
    //   setTimeout(() => {
    //     onSubmitForm(formObj.getValues());
    //   }, 200);
    // }
  });

  return (
    <>
      <ScrollView
        style={AppStyles.container}
        contentContainerStyle={styles.contentContainerStyle}
        keyboardShouldPersistTaps="handled"
      >
        {formInputs.map((item, index) => {
          const { formType, name, nextFocusIndex, id, ...rest } = item;
          const hookFormProps = customHookArray[index];
          if (formType === FORM_TYPE.TAGS) {
            return (
              <Tags
                key={id}
                itemTitleKey="value"
                {...rest}
                {...hookFormProps}
              />
            );
          } else if (formType === FORM_TYPE.MULTISLIDER) {
            return <MultiSlider key={id} {...rest} {...hookFormProps} />;
          } else if (formType === FORM_TYPE.SNGLESLIDER) {
            return <SingleSlider key={id} {...rest} {...hookFormProps} />;
          } else if (formType === FORM_TYPE.DATE_RANGE) {
            return <DateRange key={id} {...rest} {...hookFormProps} />;
          } else if (formType === FORM_TYPE.DROPDOWN) {
            return (
              <SelectionInput
                hideSearch={true}
                key={id}
                titleKey="value"
                {...rest}
                {...hookFormProps}
              />
            );
          } else if (formType === FORM_TYPE.INPUT) {
            return (
              <TextInput
                key={id}
                topSpaceLarge
                returnKeyType="default"
                {...rest}
                {...hookFormProps}
              />
            );
          }
          return null;
        })}
      </ScrollView>
      <BottomButton onPress={submit} title={buttonText} />
    </>
  );
};

FormGenerator.propTypes = {
  formInputs: PropTypes.array.isRequired,
  buttonText: PropTypes.string,
  onSubmitForm: PropTypes.func.isRequired,
  isFilter: PropTypes.bool,
};
FormGenerator.defaultProps = {
  buttonText: strings('app.next'),
  isFilter: false,
};

export default React.forwardRef(FormGenerator);

//export default FormGenerator;

/*
if (nextFocusIndex) {
  hookFormProps.nextFocusRef =
    customHookArray[nextFocusIndex].forwardRef;
} 
*/

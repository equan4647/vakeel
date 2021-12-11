import { yupResolver } from '@hookform/resolvers/yup';
import { View, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import React from 'react';

import {
  NavigationService,
  ValidationUtil,
  AppUtil,
  DataHandler,
} from '../../utils';
import { useInputProps } from '../../utils/CustomHooks';
import { BottomButton, TextInput } from '../../common';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';

export default ({ navigation }) => {
  NavigationService.setTitle(navigation, strings('app.set_a_price'));

  const classifiedInfo = DataHandler.getClassifiedAddInfo();

  console.log({ classifiedInfo });

  const initialValues = {
    price: Math.abs(Number(classifiedInfo?.price)).toString() ?? '',
  };
  const formObj = useForm({
    resolver: yupResolver(ValidationUtil.setPrice),
    defaultValues: initialValues,
  });

  const setPriceDataHandler = price => {
    const newPrice = AppUtil.removeFormatNumber(price);
    DataHandler.setClassifiedAdInfo({ price: newPrice });
  };

  const setPriceProps = useInputProps(formObj, 'price');
  //submit
  const submit = formObj.handleSubmit(data => {
    // set price
    setPriceDataHandler(data.price);

    // send to confirm location
    Keyboard.dismiss();
    NavigationService.navigate('ConfirmLocation');
  });

  return (
    <>
      <View style={AppStyles.container}>
        <TextInput
          title={strings('app.price')}
          isPrice
          maxLength={12}
          onSubmit={submit}
          keyboardType="numeric"
          onChangeCustom={setPriceDataHandler}
          {...setPriceProps}
        />
      </View>
      <BottomButton title={strings('app.next')} onPress={submit} />
    </>
  );
};

//hint={strings('app.price_instruction')}
//renderLeft={() => <Text style={AppStyles.leftInputTextStyle}>$</Text>}

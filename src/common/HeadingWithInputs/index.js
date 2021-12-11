import React from 'react';
import { View, TextInput } from 'react-native';

import { Text } from '../../components';
import { HorizontalTitle } from '../../common';
import { Colors } from '../../theme';
import styles from './styles';

const CustomTextInput = ({ value }) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor={Colors.black}
      keyboardType="number-pad"
      value={value.toString()}
    />
  );
};

export default ({ heading, textValue }) => {
  return (
    <>
      <HorizontalTitle title={heading} container={styles.headingContainer} />
      <View style={styles.textInputsContainer}>
        <CustomTextInput value={textValue[0]} />
        <Text style={styles.separatorTextStyle}>-</Text>
        <CustomTextInput value={textValue[1]} />
      </View>
    </>
  );
};

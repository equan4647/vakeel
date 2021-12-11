import { Controller } from 'react-hook-form';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { HorizontalTitle, InputError } from '../../common';
import { Text, ButtonView } from '../../components';
import { AppStyles } from '../../theme';
import styles from './styles';

const TagItem = ({ item, onPress, isSelected, itemTitleKey }) => {
  const style = isSelected
    ? styles.tagItemSelectedContainer
    : styles.tagItemUnselectedContainer;
  const textStyle = isSelected
    ? styles.tagItemSelectedTextStyle
    : styles.tagItemUnselectedTextStyle;
  return (
    <ButtonView
      onPress={() => onPress(item)}
      style={[styles.itemContainer, style]}
      enableClick
    >
      <Text style={textStyle}>{item[itemTitleKey]}</Text>
    </ButtonView>
  );
};

const Tags = props => {
  const {
    containerStyle,
    data,
    defaultValue,
    title,
    required,
    error,
    itemTitleKey,
    horizontalTitleStyle,
    ...rest
  } = props;

  // render error
  const renderError = () => {
    return <InputError error={error} />;
  };

  return (
    <>
      <Controller
        render={({ onChange, value }) => (
          <View style={containerStyle}>
            <HorizontalTitle
              title={`${title}${required ? `*` : ''}`}
              containerStyle={[AppStyles.horizontalTitle, horizontalTitleStyle]}
            />
            <View style={styles.tagListContainer}>
              {data.map((item, index) => {
                return (
                  <TagItem
                    key={index.toString()}
                    item={item}
                    index={index}
                    onPress={onChange}
                    isSelected={item.id === value.id}
                    itemTitleKey={itemTitleKey}
                  />
                );
              })}
            </View>
          </View>
        )}
        defaultValue={defaultValue}
        {...rest}
      />
      {renderError()}
    </>
  );
};

Tags.propTypes = {
  containerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  horizontalTitleStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  data: PropTypes.array,
  defaultValue: PropTypes.any,
  title: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.object,
  itemTitleKey: PropTypes.string,
};

Tags.defaultProps = {
  horizontalTitleStyle: {},
  containerStyle: {},
  data: [],
  defaultValue: '',
  required: false,
  error: undefined,
  itemTitleKey: 'title',
};

export default Tags;

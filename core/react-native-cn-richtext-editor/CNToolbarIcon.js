import React, { Component } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Text,
  StyleSheet,
} from 'react-native';

export const CNToolbarIcon = props => {
  const {
    size,
    backgroundColor,
    color,
    iconStyles,
    toolTypeText,
    iconComponent,
    onStyleKeyPress,
    selectedColor,
    selectedStyles,
    selectedTag,
    buttonTypes,
    selectedBackgroundColor,
  } = props;
  let colorCondition = '';
  let backgroundColorCondition = '';
  if (buttonTypes === 'style') {
    backgroundColorCondition =
      selectedStyles.indexOf(toolTypeText) >= 0
        ? selectedBackgroundColor
        : backgroundColor;
    colorCondition =
      selectedStyles.indexOf(toolTypeText) >= 0 ? selectedColor : color;
  } else if (buttonTypes === 'tag') {
    backgroundColorCondition =
      selectedTag === toolTypeText ? selectedBackgroundColor : backgroundColor;
    colorCondition = selectedTag === toolTypeText ? selectedColor : color;
  }
  const MyView = toolTypeText === 'image' ? View : TouchableWithoutFeedback;
  return (
    <MyView
      onPress={() => {
        onStyleKeyPress(toolTypeText);
      }}
    >
      <View
        style={[
          iconStyles,
          {
            backgroundColor: backgroundColorCondition,
            padding: 10,
          },
        ]}
      >
        {React.cloneElement(iconComponent, {
          size,
          tintColor: colorCondition,
          style: [
            {
              fontSize: size,
              tintColor: colorCondition,
            },
            iconComponent.props.style || {},
          ],
        })}
      </View>
    </MyView>
  );
};

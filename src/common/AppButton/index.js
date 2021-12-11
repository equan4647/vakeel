import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text as TextRN, ViewPropTypes } from 'react-native';

import { Text, Image, ButtonView } from '../../components';
import { BUTTON_TYPE } from '../../config/Constants';
import styles from './styles';
import { Colors, Metrics } from '../../theme';
import { Util } from '../../utils';

const Title = React.memo(props => {
  var titleColor = Colors.white;
  if (props.type === BUTTON_TYPE.GREEN_BORDER) {
    titleColor = Colors.primary;
  }

  return props.title ? (
    <Text
      style={[
        styles.titleTextStyle,
        { color: titleColor },
        props.titleTextStyle,
      ]}
    >
      {props.title}
    </Text>
  ) : null;
});

const Logo = React.memo(props => {
  const _style = { marginRight: props.title ? Metrics.ratio(9) : 0 };
  return props.image ? <Image source={props.image} style={_style} /> : null;
});

const AppButton = props => {
  const {
    type,
    container,
    title,
    titleTextStyle,
    image,
    onPress,
    loading,
    spinnerColor,
    ...rest
  } = props;
  const getButtonColorStyle = () => {
    if (type === BUTTON_TYPE.GRAY_BORDER) {
      return {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.lightBlueGrey,
      };
    } else if (type === BUTTON_TYPE.BLACK) {
      return { backgroundColor: Colors.black };
    } else if (type === BUTTON_TYPE.GREEN_BORDER) {
      return {
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.primary,
      };
    } else {
      return { backgroundColor: Colors.primary };
    }
  };

  const buttonColor = getButtonColorStyle();
  const extra = loading ? { disabled: true, ...rest } : rest;
  return (
    <ButtonView
      style={[styles.container, buttonColor, container]}
      {...{ onPress, ...extra }}
    >
      {loading ? (
        <ActivityIndicator size="small" color={spinnerColor} />
      ) : (
        <>
          <Logo {...{ title, image }} />
          <Title {...props} />
        </>
      )}
    </ButtonView>
  );
};
AppButton.propTypes = {
  type: PropTypes.oneOf(Object.values(BUTTON_TYPE)),
  container: ViewPropTypes.style,
  title: PropTypes.string,
  titleTextStyle: TextRN.propTypes.style,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onPress: PropTypes.func,
  loading: PropTypes.bool,
  spinnerColor: PropTypes.bool,
};
AppButton.defaultProps = {
  onPress: Util.DoNothing,
  loading: false,
  spinnerColor: Colors.white,
};
export default AppButton;

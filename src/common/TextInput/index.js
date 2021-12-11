import { TextInput as Input, View } from 'react-native';
import { Controller } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { ButtonView, Text, Image } from '../../components';
import { Colors, Fonts, Images } from '../../theme';
import AppStyles from '../../theme/AppStyles';
import { strings } from '../../utils/i18n';
import { InputError } from '../../common';
import { AppUtil } from '../../utils';
import styles from './styles';

const TextInput = props => {
  // destruct props
  const {
    control,
    name,
    forwardRef,
    title,
    defaultValue,
    nextFocusRef,
    error,
    customPlaceholder,
    renderLeft,
    renderRight,
    required,
    showCharCount,
    maxLength,
    onPress,
    hint,
    onSubmit,
    multiline,
    multlineStyle,
    containerStyle,
    dropdownKey,
    formatValue,
    arrowDown,
    textAlign,
    setMultlineStyle,
    showTitle,
    customTitle,
    bottomSpaceLarge,
    topSpaceLarge,
    formatValueChange,
    disablePress,
    secureTextEntry,
    isPrice,
    onChangeCustom,
    isRightArrow,
    editable,
    ...rest
  } = props;

  // set state focus
  const [isFocused, setFocus] = useState(false);

  useEffect(() => {
    if (secureTextEntry) {
      forwardRef?.current?.setNativeProps({
        style: { fontFamily: Fonts.type.semiBold },
      });
    }
  }, [forwardRef, secureTextEntry]);

  // render input
  const renderInput = ({ onChange, onBlur: _onBlur, value }) => {
    // input events
    const onChangeText = textInputValue => {
      if (formatValueChange) {
        onChange(formatValueChange(textInputValue));
      } else {
        onChange(textInputValue);
      }
      if (onChangeCustom) {
        onChangeCustom(textInputValue);
      }
    };
    const onBlur = () => {
      _onBlur();
      setFocus(false);
    };
    const onFocus = () => {
      setFocus(true);
    };

    const onSubmitEditing = () => {
      if (nextFocusRef) {
        nextFocusRef.current.focus();
      }
    };

    // set placeholder text
    const placeholder = onPress
      ? `${strings('app.select')} ${title}`
      : `${strings('app.enter')} ${title}`;

    const opacity = disablePress || editable === false ? 0.55 : 1;

    // set input value for dropdown
    const inputValue = dropdownKey ? value?.[dropdownKey] ?? '' : value;

    // custom style

    const customStyleMulti =
      multiline && setMultlineStyle
        ? { ...multlineStyle, opacity }
        : { opacity };
    // render input

    return (
      <Input
        style={[styles.input, customStyleMulti, { textAlign }]}
        placeholderTextColor={Colors.placeholder}
        placeholder={customPlaceholder || placeholder}
        value={
          formatValue
            ? formatValue(inputValue)
            : isPrice
            ? AppUtil.formatPriceInput(inputValue)
            : `${inputValue}`
        }
        ref={forwardRef}
        returnKeyType={onSubmit ? 'done' : 'next'}
        onSubmitEditing={onSubmit || onSubmitEditing}
        editable={_.isUndefined(editable) ? (onPress ? false : true) : editable}
        pointerEvents={onPress ? 'none' : 'auto'}
        selection={onPress ? { start: 0, end: 0 } : undefined}
        autoCapitalize="none"
        autoCorrect={false}
        {...{
          secureTextEntry,
          maxLength,
          onChangeText,
          onBlur,
          onFocus,
          multiline,
        }}
        {...rest}
      />
    );
  };

  // render Character Count
  const renderCharacterCount = value => {
    if (showCharCount) {
      return (
        <Text color={Colors.primary} style={styles.title}>
          {`${value?.length ?? 0}/${maxLength}`}
        </Text>
      );
    }
    return null;
  };

  //render title
  const renderTitle = () => {
    return (
      <Text style={styles.title}>{`${customTitle || title}${
        required ? '*' : ''
      }`}</Text>
    );
  };

  // render title Container
  const renderTitleContainer = controlllerProps => {
    if (showTitle) {
      return (
        <View style={AppStyles.spreadRowAligned}>
          {renderTitle()}
          {renderCharacterCount(controlllerProps.value)}
        </View>
      );
    }
    return null;
  };

  const renderLeftInput = () => {
    if (renderLeft) {
      return renderLeft();
    }
    if (isPrice) {
      return <Text style={AppStyles.leftInputTextStyle}>$</Text>;
    }
    return null;
  };

  const renderRightInput = () => {
    if (renderRight) {
      return renderRight();
    } else if (onPress && arrowDown) {
      return (
        <Image
          source={
            isRightArrow ? Images.icons.arrowRight : Images.icons.arrowDown
          }
          style={styles.arrowStyle}
        />
      );
    }
    return null;
  };

  // render input container
  const renderInputContainer = controlllerProps => {
    // set border color
    let borderColor = Colors.lightBlueGrey;
    if (error) {
      borderColor = Colors.errorInput;
    } else if (isFocused) {
      borderColor = Colors.primary;
    }

    // set view tag
    const TagView = onPress && disablePress === false ? ButtonView : View;
    const opacity = disablePress || editable === false ? 0.55 : 1;

    return (
      <TagView
        style={[styles.inputContainer, { borderColor, opacity }]}
        onPress={() => {
          onPress(controlllerProps.onChange, controlllerProps.value);
        }}
      >
        {renderLeftInput()}
        {renderInput(controlllerProps)}
        {renderRightInput()}
      </TagView>
    );
  };

  // render Hint
  const renderHint = () => {
    if (hint) {
      return <Text style={styles.hint}>{hint}</Text>;
    }
    return null;
  };

  // render error
  const renderError = () => {
    return <InputError error={error} />;
  };

  // render input controller
  const renderController = controlllerProps => {
    let customStyle = bottomSpaceLarge ? styles.bottomSpace : {};
    if (topSpaceLarge) {
      customStyle = styles.topSpace;
    }
    return (
      <View style={[AppStyles.flex1, customStyle, containerStyle]}>
        {renderTitleContainer(controlllerProps)}
        {renderInputContainer(controlllerProps)}
        {renderError()}
        {renderHint()}
      </View>
    );
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={renderController}
    />
  );
};

TextInput.propTypes = {
  containerStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  multlineStyle: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  required: PropTypes.bool,
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  forwardRef: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  customPlaceholder: PropTypes.string,
  onChangeCustom: PropTypes.func,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  nextFocusRef: PropTypes.object,
  error: PropTypes.object,
  onPress: PropTypes.func,
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  showCharCount: PropTypes.bool,
  maxLength: PropTypes.number,
  hint: PropTypes.string,
  onSubmit: PropTypes.func,
  multiline: PropTypes.bool,
  dropdownKey: PropTypes.string,
  formatValue: PropTypes.func,
  formatValueChange: PropTypes.func,
  arrowDown: PropTypes.bool,
  setMultlineStyle: PropTypes.bool,
  textAlign: PropTypes.string,
  showTitle: PropTypes.bool,
  customTitle: PropTypes.string,
  bottomSpaceLarge: PropTypes.bool,
  topSpaceLarge: PropTypes.bool,
  disablePress: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  isPrice: PropTypes.bool,
  isRightArrow: PropTypes.bool,
  editable: PropTypes.bool,
};
TextInput.defaultProps = {
  containerStyle: {},
  multlineStyle: styles.multline,
  setMultlineStyle: true,
  required: false,
  error: undefined,
  defaultValue: '',
  nextFocusRef: undefined,
  onChangeCustom: undefined,
  formatValueChange: undefined,
  onPress: undefined,
  customPlaceholder: '',
  renderLeft: undefined,
  renderRight: undefined,
  showCharCount: false,
  maxLength: 10000,
  hint: '',
  onSubmit: undefined,
  multiline: false,
  dropdownKey: '',
  formatValue: undefined,
  arrowDown: true,
  textAlign: 'left',
  showTitle: true,
  customTitle: '',
  bottomSpaceLarge: false,
  topSpaceLarge: false,
  disablePress: false,
  secureTextEntry: false,
  isPrice: false,
  isRightArrow: false,
};

export default TextInput;

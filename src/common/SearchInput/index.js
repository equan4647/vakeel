import { View, Image, TextInput, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Colors, Images, Metrics } from '../../theme';
import { NavigationService, Util } from '../../utils';
import { ButtonView } from '../../components';
import { strings } from '../../utils/i18n';
import styles from './styles';

const Back = ({ withClose }) =>
  withClose ? (
    <ButtonView onPress={NavigationService.pop} hitSlop={Metrics.hitSlop}>
      <Image source={Images.icons.cross} style={styles.back} />
    </ButtonView>
  ) : null;

const SearchInput = props => {
  const {
    onPress,
    image,
    placeholder,
    style,
    clearButton,
    isHeader,
    onSearch,
    value,
    onClear,
    withClose,
    customImageProps,
    forwardRef,
    onSubmit,
    ...rest
  } = props;

  const Container = onPress ? ButtonView : View;
  const containerProps = onPress ? { onPress } : {};
  const HeaderWrapper = isHeader ? View : React.Fragment;
  const HeaderWrapperProps = isHeader ? { style: styles.headerWrapper } : {};

  return (
    <HeaderWrapper {...HeaderWrapperProps}>
      <Back {...props} />

      <Container style={[styles.container, style]} {...containerProps}>
        <ButtonView
          onPress={
            isHeader && !withClose ? NavigationService.goBack : Util.DoNothing
          }
          hitSlop={Metrics.hitSlop}
        >
          <Image
            source={
              image ??
              (isHeader && !withClose
                ? Images.icons.backImage
                : Images.icons.search)
            }
            style={styles.image}
            {...customImageProps}
          />
        </ButtonView>

        <TextInput
          placeholderTextColor={Colors.placeholder}
          editable={onPress ? false : true}
          pointerEvents={onPress ? 'none' : 'auto'}
          ref={forwardRef}
          returnKeyType="search"
          {...{ placeholder, value, ...rest }}
          onChangeText={onSearch}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={onSubmit}
          style={styles.input}
          enablesReturnKeyAutomatically
          selectTextOnFocus
        />

        {clearButton && value?.length ? (
          <ButtonView hitSlop={Metrics.hitSlop} onPress={onClear}>
            <Image source={Images.icons.cross} />
          </ButtonView>
        ) : null}
      </Container>
    </HeaderWrapper>
  );
};

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  onSearch: PropTypes.func,
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  clearButton: PropTypes.bool,
  isHeader: PropTypes.bool,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withClose: PropTypes.bool,
  customImageProps: PropTypes.object,
  forwardRef: PropTypes.any,
};
SearchInput.defaultProps = {
  placeholder: strings('app.search_placeholder'),
  isHeader: false,
  clearButton: false,
  withClose: false,
  customImageProps: {},
  value: '',
  forwardRef: undefined,
};

export default React.memo(
  SearchInput,
  (prevProps, nextProps) => prevProps.value === nextProps.value
);

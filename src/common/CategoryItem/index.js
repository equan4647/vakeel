import React, { useCallback } from 'react';
import { Image, View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { Fonts, Images, Metrics } from '../../theme';
import styles from './styles';
import { ButtonView, Text } from '../../components';
import { CATEGORY_DISPLAY } from '../../config/Constants';
const getCircleSize = type => {
  switch (type) {
    case CATEGORY_DISPLAY.GRID_LARGE:
      return styles.gridCircleLarge;
    case CATEGORY_DISPLAY.GRID:
      return styles.gridCircle;
    case CATEGORY_DISPLAY.LIST:
      return styles.listCircle;
  }
};

const getContainerStyle = type => {
  switch (type) {
    case CATEGORY_DISPLAY.GRID_LARGE:
      return styles.gridLargeContainer;
    case CATEGORY_DISPLAY.GRID:
      return styles.gridContainer;
    case CATEGORY_DISPLAY.LIST:
      return styles.listContainer;
  }
};

const ImageCircle = React.memo(props => {
  const { type, subType, image, backgroundColor } = props;
  const circleSize = useCallback(() => getCircleSize(type), [type]);
  return subType ? null : (
    <View style={[styles.circleCenter, circleSize(), { backgroundColor }]}>
      <Image source={image} />
    </View>
  );
});

const CategoryItem = props => {
  const { type, name, containerStyle, onPressItem, subType } = props;
  const isList = useCallback(() => type === 'list', [type]);
  const _containerStyle = useCallback(() => getContainerStyle(type), [type]);
  const specificStyles =
    type === 'grid' ? styles.textGrid : { fontSize: Fonts.size.size_16 };

  const textProps = isList()
    ? { numberOfLines: 1, textAlign: 'left', style: specificStyles }
    : { numberOfLines: 2, textAlign: 'center', style: specificStyles };

  return (
    <ButtonView
      style={[_containerStyle(), containerStyle]}
      onPress={() => onPressItem(name)}
    >
      <ImageCircle {...props} />

      <View
        style={
          isList()
            ? [styles.content, { marginLeft: subType ? 0 : Metrics.ratio(10) }]
            : {}
        }
      >
        <Text {...textProps}>{name}</Text>

        {isList() ? <Image source={Images.icons.arrowRight} /> : null}
      </View>
    </ButtonView>
  );
};

CategoryItem.propTypes = {
  type: PropTypes.oneOf(['grid', 'list', 'gridLarge']),
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subType: PropTypes.bool,
  containerStyle: ViewPropTypes.style,
  onPressItem: PropTypes.func,
};
CategoryItem.defaultProps = {
  type: 'grid',
  subType: false,
};
export default React.memo(CategoryItem);

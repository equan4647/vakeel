import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text, Image, ButtonView } from '../../../components';
import { Colors, Images } from '../../../theme';
import styles from './styles';

const Item = ({ data, onItemSelected, index, isSelected }) => {
  // get data
  const { title, id, isAvailable } = data;

  // set tag view
  const TagView = isAvailable ? ButtonView : View;

  // set attributes
  const textColor = isAvailable ? 'black' : 'veryLightPink';
  const textFont = isAvailable ? 'semiBold' : 'regular';
  const backgroundColor = isAvailable ? Colors.primary : Colors.whiteFour;

  return (
    <>
      {index !== 0 ? <View style={styles.line} /> : null}

      <TagView
        style={styles.container}
        onPress={() => {
          onItemSelected(data);
        }}
      >
        <View
          style={[
            styles.circle,
            {
              backgroundColor: backgroundColor,
            },
          ]}
        />
        <Text
          style={styles.title}
          type={textFont}
          size="size_16"
          color={textColor}
        >
          {title}
        </Text>

        {isSelected ? <Image source={Images.icons.selected} /> : null}
      </TagView>
    </>
  );
};

Item.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
};
Item.defaultProps = { isSelected: false };

export default React.memo(Item);

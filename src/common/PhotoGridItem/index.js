import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Image, ImageViewHttpBackground } from '../../components';
import { ADD_PRODUCT_ITEM_TYPE } from '../../config/Constants';
import { Images, Metrics } from '../../theme';
import styles from './styles';

export const PhotoGridItem = ({ data, onPress, type, index }) => {
  const buttonImage =
    type === ADD_PRODUCT_ITEM_TYPE.REMOVABLE
      ? Images.icons.remove
      : data.is_cover
      ? Images.icons.selectedImage
      : Images.icons.unselectedImage;

  return (
    <ImageViewHttpBackground
      url={data.url}
      width={Metrics.imageAddWidth}
      height={Metrics.imageAddHeight}
      borderRadius={25}
    >
      <ButtonView
        onPress={() => onPress(index, data)}
        style={styles.buttonView}
        hitSlop={Metrics.hitSlop}
      >
        <Image source={buttonImage} />
      </ButtonView>
    </ImageViewHttpBackground>
  );
};
PhotoGridItem.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};
PhotoGridItem.defaultProps = {
  onPress: () => {},
};

// export default React.memo(PhotoGridItem, (prevProps, nextProps) => {
//   return prevProps.data === nextProps.data;
// });

export default PhotoGridItem;

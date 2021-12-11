import PropTypes from 'prop-types';
import React from 'react';

import { Text, ButtonView, ImageViewHttpRound } from '../../../components';
import { CategoriesUtil, NavigationService } from '../../../utils';
import { MODULE } from '../../../config/Constants';
import { strings } from '../../../utils/i18n';
import { Images } from '../../../theme';
import styles from './styles';

const Item = ({ item, isMore }) => {
  const categoryImage = isMore
    ? Images.images.moreCategories
    : CategoriesUtil.getCategoryImage(item);
  const categoryName = isMore
    ? strings('app.more_categories')
    : CategoriesUtil.getCategoryName(item);

  return (
    <ButtonView
      style={styles.gridContainer}
      onPress={() => {
        if (isMore) {
          NavigationService.navigate('ViewCategories', {
            _module: MODULE.CLASSIFIED,
            extraPropsClick: { isAddClassified: true },
          });
        } else {
          CategoriesUtil.navigateCategoryItem(item, MODULE.CLASSIFIED, {
            isAddClassified: true,
          });
        }
      }}
    >
      <ImageViewHttpRound
        url={categoryImage}
        size={80}
        isLocal={isMore}
        borderWidth={0}
      />
      <Text numberOfLines={2} textAlign="center" style={styles.textGrid}>
        {categoryName}
      </Text>
    </ButtonView>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
  isMore: PropTypes.bool,
};
Item.defaultProps = {
  isMore: false,
};

export default React.memo(Item, (prevProps, nextProps) => {
  return prevProps.item === nextProps.item;
});

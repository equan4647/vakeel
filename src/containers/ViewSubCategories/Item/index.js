import PropTypes from 'prop-types';
import React from 'react';

import { NavigationService, CategoriesUtil, DataHandler } from '../../../utils';
import { Text, Image, ButtonView } from '../../../components';
import { ClassifiedUtil } from '../../../DataUtils';
import { strings } from '../../../utils/i18n';
import { Images } from '../../../theme';
import styles from './styles';

const Item = ({ data, isAddClassified }) => {
  return (
    <ButtonView
      style={styles.itemContainer}
      onPress={() => {
        if (isAddClassified) {
          ClassifiedUtil.openClassifedDetail(data);
        } else {
          ClassifiedUtil.openClassifedSerachSubCategory(data);
        }
      }}
    >
      <Text size="size_16">
        {data.isParentCategory
          ? strings('app.view_all')
          : CategoriesUtil.getCategoryName(data)}
      </Text>
      <Image source={Images.icons.forwardArrow} />
    </ButtonView>
  );
};

Item.propTypes = {
  data: PropTypes.object.isRequired,
  isAddClassified: PropTypes.bool,
};
Item.defaultProps = { isAddClassified: false };

export default React.memo(Item, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});

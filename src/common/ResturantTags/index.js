import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { Text } from '../../components';
import styles from './styles';
import { FOOD_COST_LEVEL_LIMIT } from '../../config/Constants';
import { FoodUtil } from '../../DataUtils';
import _ from 'lodash';
import { AppStyles } from '../../theme';

const ResturantTags = ({ data }) => (
  <View style={styles.tagsContainer}>
    {_.range(FOOD_COST_LEVEL_LIMIT).map(num => (
      <Text size="size_14" key={num} color={FoodUtil.getDollarColor(data, num)}>
        $
      </Text>
    ))}

    {FoodUtil.cuisinesAssociated(data).map((item, i) => (
      <View style={AppStyles.rowAligned}>
        <View style={styles.circle} />

        <Text key={i} size="size_14">
          {FoodUtil.getCuisineName(item)}
        </Text>
      </View>
    ))}
  </View>
);

ResturantTags.propTypes = {
  data: PropTypes.object.isRequired,
};
ResturantTags.defaultProps = { data: {} };

export default React.memo(ResturantTags);

import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { strings } from '../../utils/i18n';
import { Text } from '../../components';
import { Util } from '../../utils';
import styles from './styles';

const ProductDetails = ({
  data,
  attributeName,
  attributeValue,
  attributeValueKey,
  attributeValue2,
}) => {
  if (Util.isEmpty(data)) {
    return (
      <Text style={styles.emptyText} size="size_16">
        {strings('app.no_details_found')}
      </Text>
    );
  }

  return data.map((item, index) => {
    return (
      <View style={styles.productDetailsContainer} key={index.toString()}>
        <Text style={styles.productTitleText}>
          {item?.[attributeName].toUpperCase() ?? ''}
        </Text>

        <Text style={styles.productValueText}>
          {attributeValueKey !== '' && item[attributeValueKey]
            ? item?.[attributeValueKey]?.[attributeValue] ?? ''
            : attributeValue2
            ? `${item?.[attributeValue]} - ${item?.[attributeValue2]}`
            : item?.[attributeValue] ?? ''}
        </Text>
      </View>
    );
  });
};

ProductDetails.propTypes = {
  data: PropTypes.array.isRequired,
  attributeName: PropTypes.string,
  attributeValue: PropTypes.string,
  attributeValueKey: PropTypes.string,
};
ProductDetails.defaultProps = {
  attributeName: 'attribute_name',
  attributeValue: 'attribute_value',
  attributeValueKey: '',
};

export default React.memo(ProductDetails, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data;
});

import { ScrollView } from 'react-native';
import React from 'react';

import { ProductUtil } from '../../DataUtils';
import { SelectAttributeProduct } from '..';
import styles from './styles';

const AttributesProductBuying = ({
  productAttributesInfo,
  attributeSelectd,
  setAttributeSelected,
}) => {
  const {
    productAttributesObject,
    attributesArray,
    attributesObject,
  } = productAttributesInfo;

  if (attributesArray.length) {
    return (
      <ScrollView
        style={styles.container}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
      >
        {attributesArray.map(item => {
          const { itemsData, selectedObject } = ProductUtil.singleAttributeInfo(
            attributesObject,
            attributeSelectd,
            item
          );

          return (
            <SelectAttributeProduct
              title={item}
              data={itemsData}
              onSelect={itemSelected => {
                const matchAttribute = ProductUtil.getSelectedAttribute(
                  itemSelected,
                  item,
                  attributeSelectd,
                  productAttributesObject
                );
                setAttributeSelected(matchAttribute);
              }}
              value={selectedObject}
            />
          );
        })}
      </ScrollView>
    );
  } else {
    return null;
  }
};

AttributesProductBuying.propTypes = {};
AttributesProductBuying.defaultProps = {};

export default AttributesProductBuying;

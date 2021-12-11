import { View, Pressable } from 'react-native';
import Swiper from 'react-native-swiper';
import React, { useState, useRef } from 'react';

import { Colors, Metrics } from '../../theme';
import { ParallaxImage } from '../../common';
import { DataHandler } from '../../utils';
import styles from './styles';

export default props => {
  const swiperRef = useRef();

  const _renderPagination = (index, total) => {
    // set total and index
    const totalItems = total > 7 ? 7 : total;
    let itemIndex = index;
    if (total > 7 && index >= 3) {
      const difference = total - index;
      if (difference > 4) {
        itemIndex = 3;
      } else {
        itemIndex = totalItems - difference;
      }
    }

    // set items of dots
    const items = [];
    for (let i = 0; i < totalItems; i += 1) {
      const difference = i - itemIndex;
      const size = 7 - Math.abs(difference);
      const opacity = difference === 0 ? 1 : 0.5;
      const customStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: Colors.white,
        marginRight: 3,
        opacity: opacity,
      };
      items.push(<View style={customStyle} key={i} />);
    }

    // return pagination
    return total < 2 ? null : (
      <View style={styles.paginationContainer}>{items}</View>
    );
  };

  const { data } = props;

  const _renderItem = (item, index) => {
    return (
      <Pressable
        onPress={() => {
          DataHandler.getImageViewerModalRef().show(data, index, i => {
            swiperRef.current?.scrollTo?.(i);
          });
        }}
      >
        <ParallaxImage url={item} key={item} />
      </Pressable>
    );
  };

  return (
    <Swiper
      ref={swiperRef}
      // key={data.length}
      height={Metrics.imagesSwiperHeight}
      loop={false}
      renderPagination={_renderPagination}
    >
      {data.map(_renderItem)}
    </Swiper>
  );
};

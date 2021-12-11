import { View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import { ButtonView, Text, ImageViewHttpRound } from '../../../components';
import { NavigationService, Util } from '../../../utils';
import { ChatDataUtil } from '../../../ChatUtil';
import { AppStyles } from '../../../theme';
import { Badge } from '../../../common';
import styles from './styles';

const Item = ({ item }) => {
  const memberInfo = ChatDataUtil.getMemberInfoRoom(item);

  return (
    <ButtonView
      style={[styles.container]}
      onPress={() => {
        NavigationService.navigate('Chat', { room: item });
      }}
    >
      <ImageViewHttpRound
        url={`${memberInfo.image}`}
        size={44}
        cache="reload"
      />

      <View style={styles.detailsContainer}>
        <View style={AppStyles.spreadRowAligned}>
          <Text style={styles.name} numberOfLines={1}>
            {memberInfo.name}
          </Text>

          <Text>
            {Util.getDateFromNow(ChatDataUtil.getLastMessageDatetimeRoom(item))}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <Text numberOfLines={2} size="size_14">
            {ChatDataUtil.getLastMessageRoom(item)}
          </Text>

          <Badge
            count={ChatDataUtil.getUnreadCount(item)}
            showActualCount={false}
          />
        </View>
      </View>
    </ButtonView>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};
Item.defaultProps = {};

export default React.memo(Item, (prevProps, nextProps) => {
  return prevProps.item === nextProps.item;
});

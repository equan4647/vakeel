import React from 'react';
import { Image, View, ViewPropTypes } from 'react-native';

import { StarRating } from '../../common';
import { ButtonView, Text } from '../../components';
import { RATING_TYPE } from '../../config/Constants';
import { AppStyles, Images, Metrics } from '../../theme';
import styles from './styles';
import { FoodUtil, UserUtil } from '../../DataUtils';
import { Util } from '../../utils';

const FoodBringerInfo = props => {
  const { style, data } = props,
    isBringerEnabled = FoodUtil.isBringerEnabled(data),
    driverInfo = FoodUtil.driverObject(data);

  if (!isBringerEnabled || Util.isStatusPending(data)) {
    return null;
  }
  return (
    <View style={[AppStyles.row, style]}>
      <Image source={Images.icons.bringer} />

      <View style={styles.content}>
        <Text style={styles.bringerName}>{UserUtil.full_name(driverInfo)}</Text>

        <StarRating
          type={RATING_TYPE.RATING_WITHOUT_COUNT}
          style={styles.bringerRating}
          rating={UserUtil.getRating(driverInfo)}
        />

        {Util.isStatusInProgress(data) && (
          <Text>{FoodUtil.getDistanceAndTime(data)}</Text>
        )}
      </View>

      {Util.isStatusInProgress(data) && (
        <ButtonView
          onPress={() => FoodUtil.chatWithBringer(data)}
          hitSlop={Metrics.hitSlop}
        >
          <Image source={Images.icons.chatBubble} />
        </ButtonView>
      )}
    </View>
  );
};
FoodBringerInfo.propTypes = { style: ViewPropTypes.style };
FoodBringerInfo.defaultProps = {};
export default FoodBringerInfo;

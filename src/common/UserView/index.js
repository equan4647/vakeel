import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

import { Text, ImageViewHttpRound, ButtonView } from '../../components';
import { RATING_TYPE } from '../../config/Constants';
import { strings } from '../../utils/i18n';
import { UserUtil } from '../../DataUtils';
import { AppStyles } from '../../theme';
import { StarRating } from '..';
import styles from './styles';

const MemberSince = React.memo(({ data }) =>
  UserUtil.createdAt(data) ? (
    <Text style={styles.memberSince}>{`${strings(
      'app.memberSince'
    )} ${UserUtil.createdAt(data)}`}</Text>
  ) : null
);

const UserView = props => {
  const { data, style, rating, onRatingPress } = props;
  const MYVIEW = onRatingPress ? ButtonView : View;
  return (
    <View style={[AppStyles.rowAligned, AppStyles.flex1, style]}>
      <ImageViewHttpRound url={UserUtil.avatar(data)} />

      <View style={styles.nameContainer}>
        <Text style={styles.nameTextStyle} numberOfLines={1}>
          {UserUtil.full_name(data) || UserUtil.name(data)}
        </Text>

        {rating ? (
          <MYVIEW onPress={onRatingPress}>
            <StarRating
              rating={UserUtil.getRating(data)}
              type={RATING_TYPE.RATING_WITHOUT_COUNT}
              style={styles.rating}
            />
          </MYVIEW>
        ) : (
          <MemberSince {...{ data }} />
        )}
      </View>
    </View>
  );
};

UserView.propTypes = {
  userName: PropTypes.string,
  memberSince: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rating: PropTypes.bool,
  onRatingPress: PropTypes.func,
  style: ViewPropTypes.style,
};
UserView.defaultProps = {
  userName: '',
  rating: false,
};

export default UserView;

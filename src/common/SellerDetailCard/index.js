import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { UserProfilePicture } from '../../common';
import { DATE_PICKER_TYPE } from '../../config/Constants';
import { Text, Image } from '../../components';
import { SellerUtil } from '../../DataUtils';
import { strings } from '../../utils/i18n';
import { AppUtil } from '../../utils';
import { Images } from '../../theme';
import styles from './styles';

const SellerDetailCard = props => {
  const { data, style } = props;

  return (
    <View style={[styles.container, style]}>
      <UserProfilePicture isEdit={false} image={SellerUtil.avatar(data)} />

      <Text style={styles.name}>
        {SellerUtil.full_name(data) || SellerUtil.name(data)}
      </Text>

      {/* ============= */}
      {!_.isEmpty(SellerUtil.createdAt(data)) ? (
        <Text style={styles.lightText}>
          {strings('app.memberSince')}{' '}
          {AppUtil.getFormattedDate(
            SellerUtil.createdAt(data),
            DATE_PICKER_TYPE.DATE
          )}
        </Text>
      ) : null}
      {/* <Text style={styles.lightText}>{SellerUtil.address(data)}</Text> */}
      <View style={{ height: 16 }} />

      {/* ============= */}
      {data.hasOwnProperty('rating') ? (
        <View style={[styles.rowAligned, styles.star]}>
          <Image source={Images.icons.star} />
          <Text style={styles.iconText}>{data?.rating ?? 0}</Text>
        </View>
      ) : null}
      {/* ============= */}

      {data.hasOwnProperty('ads') ? (
        <View style={styles.rowAligned}>
          <Image source={Images.icons.ads} />
          <Text style={styles.iconText}>
            {`${data?.ads ?? 0} ${strings('app.ads')}`}
          </Text>
        </View>
      ) : null}

      {data.hasOwnProperty('topics') ? (
        <View style={styles.rowAligned}>
          <Image source={Images.icons.topicsImage} />
          <Text style={styles.iconText}>
            {`${data?.topics ?? 0} ${strings('app.topics')}`}
          </Text>
        </View>
      ) : null}
      {/* ============= */}
    </View>
  );
};

SellerDetailCard.propTypes = {
  data: PropTypes.object,
  style: ViewPropTypes.style,
};
SellerDetailCard.defaultProps = {
  data: {},
};

export default SellerDetailCard;

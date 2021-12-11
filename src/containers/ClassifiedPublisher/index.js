import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import React from 'react';

import {
  ContactButtonBar,
  AdsCarousel,
  SellerDetailCard,
  Separator,
} from '../../common';
import { SellerUtil, ClassifiedUtil } from '../../DataUtils';
import { ScrollViewApi, Loader } from '../../components';
import { IDENTIFIERS } from '../../config/Constants';
import { AppUtil, NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';

import { classifiedActions, classifiedSelectors } from '../../ducks/classified';
import { requestFlagSelectors } from '../../ducks/requestFlags';

const ClassifiedPublisher = ({ navigation, route }) => {
  // get user info
  const userInfo = route?.params?.userInfo ?? {};
  const userId = userInfo?._id ?? 0;

  // dispatch const
  const dispatch = useDispatch();

  // report user
  const reportUser = () =>
    AppUtil.doIfAuthorized(() => {
      dispatch(
        classifiedActions.requestReportUserClassified({ user_id: userId })
      );
    });

  // set header
  const options = {
    [strings('app.report_this_user')]: reportUser,
  };
  NavigationService.setOptionsHeader(navigation, '', options, 0);

  // set payload and identifier
  const payload = { limit: 5, other_acount_id: userId };
  const identifier = `${IDENTIFIERS.USER_PRODUCTS}_${userId}`;

  // get profile data
  const classifiedProfile = useSelector(
    classifiedSelectors.getClassifiedProfile(identifier)
  );
  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`USER_PROFILE_${identifier}`)
  );

  // render content
  const renderContent = () => {
    return (
      <>
        <View style={styles.content}>
          <SellerDetailCard
            data={{ ...userInfo, ads: classifiedProfile?.adsCount ?? 0 }}
          />
        </View>
        <Separator style={styles.separator} />

        <AdsCarousel
          identifier={identifier}
          headerTitle={strings('app.published_ads')}
          leftTextStyleTitle={styles.titleTextStyleCarousel}
          containerStyleTitle={styles.containerStyleTitle}
          isDetail
          rightPress={() => {
            NavigationService.navigate('SeeAllClassifieds', {
              title: `${SellerUtil.full_name(userInfo)} ${strings('app.ads')}`,
              identifier: `${IDENTIFIERS.USER_PRODUCTS_ALL}_${userId}`,
              payload: { other_acount_id: userId },
              addLocationRadius: false,
            });
          }}
        />
      </>
    );
  };

  // render scrollview
  return (
    <>
      <ScrollViewApi
        data={classifiedProfile}
        requestAction={classifiedActions.requestUserProfile}
        requestFlags={requestFlags}
        payload={payload}
        content={renderContent}
        identifier={identifier}
      />
      <ContactButtonBar
        onChat={() => ClassifiedUtil.chatUserClassifed(userInfo)}
        onMessage={() => ClassifiedUtil.messageUserClassifed(userInfo)}
        onCall={() => ClassifiedUtil.callUserClassifed(userInfo)}
      />
      <Loader type="REPORT_USER_CLASSIFIED" />
    </>
  );
};
export default ClassifiedPublisher;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ContactButtonBar,
  SellerDetailCard,
  BuyingCarousel,
  ServiceCarousel,
  Separator,
} from '../../common';
import { AppUtil, NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';
import { boominUserActions } from '../../ducks/boominUsers';
import { Loader, ScrollViewApi } from '../../components';
import { ProductUtil, UserUtil } from '../../DataUtils';
import { CAROUSEL, USER_TYPES } from '../../config/Constants';
import { requestFlagSelectors } from '../../ducks/requestFlags';
import { requestGetBoominUser } from '../../ducks/boominUsers/actions';
import { isBoominUserFetched } from '../../ducks/boominUsers/selectors';

const Publisher = ({ navigation, route }) => {
  const vendor = route.params?.vendor ?? {};

  const id = UserUtil.id(vendor);
  const dispatch = useDispatch();

  const requestReport = () =>
    AppUtil.doIfAuthorized(() =>
      dispatch(
        boominUserActions.requestReportBoominUser({
          target_id: id,
          reporter_type: USER_TYPES.BASIC,
          target_type: USER_TYPES.VENDOR,
          report_reason: '',
        })
      )
    );

  const options = { [strings('app.report_this_user')]: requestReport };
  NavigationService.setOptionsHeader(navigation, '', options, 0);

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`GET_BOOMIN_USER_vendor${id}`)
  );

  const data = useSelector(isBoominUserFetched(id));

  return (
    <>
      <ScrollViewApi
        {...{ requestFlags, data }}
        identifier={`vendor${id}`}
        payload={{ vendor_id: id, limit: CAROUSEL.ITEM_LIMIT }}
        requestAction={requestGetBoominUser}
        contentContainerStyle={{ paddingBottom: 20 }}
        content={() => (
          <>
            <SellerDetailCard data={vendor} style={styles.content} />

            <ServiceCarousel
              identifier={`vendor${id}`}
              headerTitle={strings('app.services')}
              titleTextStyle={styles.titleTextStyleCarousel}
              contentContainerStyle={styles.listContainerStyle}
              containerStyleTitle={{ marginTop: 18 }}
              style={[styles.listStyle, styles.bottom]}
              rightTitle={strings('app.see_all')}
              rightPress={() =>
                NavigationService.navigate('SeeAllServices', {
                  title: strings('app.services'),
                  identifier: `v${id}`,
                  payload: { vendor_id: id },
                })
              }
            />

            <Separator style={styles.separatorStyle} />

            <BuyingCarousel
              identifier={`vendor${id}`}
              headerTitle={strings('app.products')}
              rightTitle={strings('app.see_all')}
              headerStyle={styles.headerStyle}
              rightPress={() => {
                NavigationService.navigate('SeeAllBuyingProducts', {
                  title: strings('app.products'),
                  identifier: `v${id}`,
                  payload: { vendor_id: id },
                });
              }}
            />
          </>
        )}
      />
      <ContactButtonBar
        onChat={() => ProductUtil.onChat(vendor)}
        onCall={() => ProductUtil.onCall(vendor)}
        onMessage={() => ProductUtil.onMessage(vendor)}
      />
      <Loader type={['REPORT_BOOMIN_USER', 'GET_BOOMIN_USER']} />
    </>
  );
};

export default Publisher;

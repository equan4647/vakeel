import React from 'react';

import { ServiceHistoryList, ScrollableTabView } from '../../common';
import { IDENTIFIERS, SERVICE_ITEM_TYPE } from '../../config/Constants';
import { NavigationService } from '../../utils';
import { serviceHistory } from '../../data';
import { strings } from '../../utils/i18n';
import { AppStyles, Metrics } from '../../theme';

const ServiceHistory = ({ navigation }) => {
  NavigationService.setHeader(navigation, strings('app.service_history'));

  return (
    <ScrollableTabView
      containerStyle={AppStyles.flex}
      prerenderingSiblingsNumber={2}
      customUnderLineWidth={Metrics.screenWidth / 3 - 40}
    >
      <ServiceHistoryList
        payload={{ status: SERVICE_ITEM_TYPE.PENDING }}
        data={serviceHistory.pending}
        identifier={IDENTIFIERS.PENDING_BOOKING}
        tabLabel={strings('app.pending')}
      />
      <ServiceHistoryList
        payload={{ status: SERVICE_ITEM_TYPE.COMPLETED }}
        data={serviceHistory.completed}
        identifier={IDENTIFIERS.COMPLETED_BOOKING}
        tabLabel={strings('app.completed')}
        emptyViewText={strings('app.completed_service_empty_text')}
      />
      <ServiceHistoryList
        payload={{ status: SERVICE_ITEM_TYPE.CANCELLED }}
        data={serviceHistory.cancelled}
        identifier={IDENTIFIERS.CANCELLED_BOOKING}
        tabLabel={strings('app.cancelled')}
        emptyViewText={strings('app.cancelled_service_empty_text')}
      />
    </ScrollableTabView>
  );
};

export default ServiceHistory;

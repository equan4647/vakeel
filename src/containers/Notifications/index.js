import React from 'react';
import { useSelector } from 'react-redux';

import styles from './styles';
import Item from './Item';
import { FlatListApi } from '../../components';
import { getRequestFlag } from '../../ducks/requestFlags/selectors';
import { requestGetNotifications } from '../../ducks/notifications/actions';
import { EmptyView, Separator } from '../../common';
import { getNotificationsList } from '../../ducks/notifications/selectors';
import { strings } from '../../utils/i18n';
import { AppStyles } from '../../theme';

const Notifications = ({ route }) => {
  const identifier = route.params?.identifier;

  const requestFlags = useSelector(
      getRequestFlag(`GET_NOTIFICATIONS_${identifier}`)
    ),
    data = useSelector(getNotificationsList(identifier));

  return (
    <FlatListApi
      {...{ requestFlags, data, identifier }}
      payload={{ type: identifier }}
      requestAction={requestGetNotifications}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => <Item id={item} identifier={identifier} />}
      ItemSeparatorComponent={() => <Separator style={styles.seperator} />}
      ListEmptyComponent={
        <EmptyView
          withoutArrow
          image="notifications"
          text={strings('app.notifications_empty_text')}
          imageStyle={AppStyles.emptyViewImage}
          containerStyle={AppStyles.emptyContainerStyle}
        />
      }
    />
  );
};

export default Notifications;

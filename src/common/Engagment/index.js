import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';

import { Selection, TitleDescription } from '..';
import { strings } from '../../utils/i18n';
import { ErrorViewApi, LoaderViewApi, Text } from '../../components';
import styles from './styles';
import { advertisingActions } from '../../ducks/advertising';

const DEFAULT_STATS_DAY = 15;

const Engagment = ({ id }) => {
  const [days, setDays] = useState(DEFAULT_STATS_DAY);
  const [usersReached, setUsersReached] = useState('');
  const [usersClicked, setUsersClicked] = useState('');
  const [errMessage, setErrMessage] = useState('');

  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    requestStatistics(days);
  }, []);

  const onDaysSelect = val => {
    setDays(val.days);
    requestStatistics(val.days);
  };

  const requestStatistics = days => {
    setLoader(true);
    setErrMessage('');
    const payload = {
      days,
      advertisement_id: id,
    };
    dispatch(
      advertisingActions.requestAdvertismentStats(payload, onSuccess, onFailure)
    );
  };

  const onSuccess = data => {
    const { clicks_count, views_count } = data;
    setUsersReached(views_count);
    setUsersClicked(clicks_count);
    setLoader(false);
  };

  const onFailure = err => {
    setLoader(false);
    setErrMessage(err);
  };

  const renderLoader = () => {
    return <LoaderViewApi styles={styles.loader} />;
  };

  const renderContent = () => {
    return (
      <View style={styles.engamentDetailsContainer}>
        <TitleDescription
          containerStyle={styles.engamentDetail}
          titleTextStyle={styles.engamentDetailTitle}
          bar={false}
          title={usersReached}
          subText={strings('app.users_reached')}
        />

        <TitleDescription
          containerStyle={[styles.engamentDetail, styles.seperato2]}
          titleTextStyle={styles.engamentDetailTitle}
          bar={false}
          title={usersClicked}
          subText={strings('app.users_clicked')}
        />
      </View>
    );
  };

  const renderErrorView = () => {
    return (
      <ErrorViewApi
        errorMessage={errMessage}
        onPressRetry={() => requestStatistics(days)}
        containerStyle={styles.errorView}
      />
    );
  };

  return (
    <>
      <View style={styles.engagmentContainer}>
        <Text style={styles.engagementTitle}>
          {strings('app.engagment_caps')}
        </Text>
        <Selection onSelect={onDaysSelect} />
      </View>
      {loader && renderLoader()}
      {!loader && errMessage === '' && renderContent()}
      {errMessage !== '' && renderErrorView()}
    </>
  );
};
export default Engagment;

import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';

import {
  BottomButton,
  ConsultancyType,
  ID,
  Separator,
  TitleDescription,
  AmountRow,
  PackageDetails,
  AdAuthor,
} from '../../common';
import { Text } from '../../components';
import { ID_TYPE } from '../../config/Constants';
import { AppStyles } from '../../theme';
import { NavigationService } from '../../utils';
import { strings } from '../../utils/i18n';
import styles from './styles';
import data from '../../data/consultancyDetail';

const TopicName = React.memo(({ topicName, time }) => (
  <View style={styles.topicNameContainer}>
    <Text style={styles.topic}>{topicName}</Text>
    <Text>{time}</Text>
  </View>
));

const ConsultancyDetail = ({ navigation, route }) => {
  const viewableOnly = route.params?.viewableOnly ?? false;
  const isScheduled = route.params?.isScheduled ?? false;
  NavigationService.setCrossBackHeader(navigation, '');

  const [isCallCompleted, setCallCompleted] = useState(false);
  const onCallDone = () => setCallCompleted(true);

  const startCall = () => {
    NavigationService.navigate('Calling', { onCallDone });
  };
  const getStatus = () => {
    if (!isScheduled) {
      return;
    } else {
      return isCallCompleted ? 'completed' : 'scheduled';
    }
  };

  const onPressAuthor = () => {
    NavigationService.navigate('TopicPublisher');
  };

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={AppStyles.container}
        contentContainerStyle={styles.content}
      >
        <ID id={data.id} idType={ID_TYPE.CONSULTANCY} status={getStatus()} />

        <TopicName topicName={data.topicName} time={data.time} />

        <PackageDetails details={data.agenda} title={strings('app.agenda')} />

        <AdAuthor
          name={data.author}
          image={data.authorImage}
          title={strings('app.with')}
          containerStyle={styles.userView}
          hasRightArrow={isScheduled}
          onPress={isScheduled ? onPressAuthor : undefined}
        />

        <TitleDescription title={strings('app.consultancy_type')} />

        <ConsultancyType
          style={styles.consultancyType}
          type={data.consultancyType}
          textStyle={styles.consultancyText}
        />

        <Text style={styles.costType}>
          {data.isPaid ? strings('app.paid') : strings('app.free')}
        </Text>

        <Separator style={styles.amountSeparator} />

        <AmountRow
          style={styles.amountRow}
          title={strings('app.consultancy_fee')}
          amount={data.consultancyFee}
        />
      </ScrollView>
      {viewableOnly || isCallCompleted ? null : (
        <BottomButton
          title={isScheduled ? strings('app.join') : strings('app.accept')}
          onPressCancel={NavigationService.goBack}
          onPress={isScheduled ? startCall : route.params?.ProceedForPayment}
        />
      )}
    </>
  );
};
export default ConsultancyDetail;

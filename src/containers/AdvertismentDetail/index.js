import { View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect } from 'react';

import {
  TitleDescription,
  HorizontalTitle,
  ProgressBar,
  AppButton,
  BottomButtonContainer,
  Separator,
  Engagment,
} from '../../common';
import { NavigationService, DataHandler, AppUtil } from '../../utils';
import { BUTTON_TYPE, SHARE_MODULE_TYPE } from '../../config/Constants';
import { AppStyles, Images, Metrics } from '../../theme';
import {
  Text,
  Image,
  ImageViewHttpBackground,
  ScrollViewApi,
  ButtonView,
} from '../../components';
import { strings } from '../../utils/i18n';
import { adEngagement } from '../../data';
import styles from './styles';
import {
  advertisingActions,
  advertisingSelectors,
} from '../../ducks/advertising';
import { AdvertisingUtil } from '../../DataUtils';
import { authSelectors } from '../../ducks/auth';
import { requestFlagSelectors } from '../../ducks/requestFlags';

const AdvertismentDetail = props => {
  const { navigation, route } = props;

  const isMyAds = route?.params?.isMyAds ?? false;
  const id = route?.params?.id ?? '';

  const advertisingItem = useSelector(
    advertisingSelectors.getAdvertisementItem(id)
  );

  const requestFlags = useSelector(
    requestFlagSelectors.getRequestFlag(`GET_ADVERTISIEMENT_${id}`)
  );

  const user = useSelector(authSelectors.getUser);

  const dispatch = useDispatch();

  useEffect(() => {
    requestAddClicked();
  }, []);

  const requestAddClicked = () => {
    const { id, is_clicked } = advertisingItem;
    if (is_clicked === 0) {
      const payload = {
        user_id: user._id,
        advertisement_id: id,
      };
      dispatch(advertisingActions.requestAdvertismentClick(payload));
    }
  };

  const navigateToReport = () =>
    AppUtil.doIfAuthorized(() =>
      NavigationService.navigate('ReportAd', { item_id: id })
    );

  const editAdvertisment = () => {
    const data = DataHandler.getStore().getState().advertising.data[id];

    const image = {
      url: data.advertisement_images
        ? data.advertisement_images[0].image_link
        : '',
      is_local: 0,
    };

    // const { title, description, ref_url, phone_number } = advertisingItem;

    // const data = {
    //   title,
    //   description,
    //   ref_url,
    // };

    DataHandler.setAdvertisingInfo({ ...data, ...{ image: image } });
    // NavigationService.navigate('AdvertismentAddStack');
    NavigationService.navigate(
      'CreateAd',
      { isEdit: true },
      'AdvertismentAddStack'
    );
  };

  // NavigationService.navigate(
  //   'CreateAd',
  //   { onDeliveryAdded },
  //   'AdvertismentAddStack'
  // );

  const onShare = () =>
    AppUtil.share(AppUtil.getShareURL(SHARE_MODULE_TYPE.ADVERTISMENT, id));

  var myOptions = { Edit: editAdvertisment, Share: onShare };
  var options = {
    Share: onShare,
    [strings('app.report_this_ad')]: navigateToReport,
  };
  if (advertisingItem.user_id === user._id) {
    delete options[strings('app.report_this_ad')];
  }

  NavigationService.setOptionsHeader(
    navigation,
    '',
    isMyAds ? myOptions : options,
    isMyAds ? -1 : 1
  );

  const onEnagementPress = () => {
    DataHandler.getDropDownModalRef().show({
      onItemSelected: () => {},
      data: adEngagement,
      idKey: 'id',
      titleKey: 'title',
      selectedItem: { title: '30 Days' },
      title: strings('app.engagment'),
    });
  };

  const renderContent = () => {
    return (
      <>
        <ButtonView
          onPress={() => {
            DataHandler.getImageViewerModalRef().show(
              AdvertisingUtil.image(advertisingItem),
              0,
              () => {}
            );
          }}
        >
          <ImageViewHttpBackground
            url={AdvertisingUtil.image(advertisingItem)}
            containerStyle={styles.image}
            width={Metrics.scale(335)}
            height={Metrics.ratio(222)}
          />
        </ButtonView>

        <Text style={styles.addId}>{`${strings(
          'app.add_num'
        )} ${AdvertisingUtil.adID(advertisingItem)}`}</Text>

        <TitleDescription
          titleTextStyle={styles.productName}
          title={AdvertisingUtil.title(advertisingItem)}
          subText={AdvertisingUtil.createdAt(advertisingItem)}
        />

        <TitleDescription
          subTextStyle={styles.description}
          title={strings('app.description')}
          subText={AdvertisingUtil.description(advertisingItem)}
        />

        <TitleDescription
          renderLeft={() => {
            return (
              <Image
                source={Images.icons.locationBlack}
                style={styles.locationIconStyle}
                resizeMode="contain"
              />
            );
          }}
          title={strings('app.address')}
          subText={AdvertisingUtil.address(advertisingItem)}
          subTextStyle={styles.addressSubText}
        />

        <TitleDescription
          title={strings('app.web_url')}
          subText={AdvertisingUtil.website(advertisingItem)}
        />

        <TitleDescription
          title={strings('app.phone')}
          subText={AdvertisingUtil.phone(advertisingItem)}
        />

        {isMyAds && (
          <>
            <HorizontalTitle
              title={strings('app.posted_for')}
              rightTitle="ADD DAYS"
              rightTextStyle={styles.rightTextStyle}
              onPress={() => {
                NavigationService.navigate('AdvertismentDaysAddStack', {
                  screen: 'AdDays',
                  params: { data: advertisingItem },
                });
                // NavigationService.navigate('AdvertismentDaysAddStack', {
                //   data: advertisingItem,
                // });
              }}
              bar
              barStyle={styles.seperator}
            />

            <Text style={styles.totalDays}>{`${AdvertisingUtil.totalDays(
              advertisingItem
            )} Days`}</Text>
            <ProgressBar
              progress={AdvertisingUtil.daysProgress(advertisingItem)}
            />
            <View style={styles.daysDurationContainer}>
              <Text style={styles.durationText}>{`${AdvertisingUtil.daysSpent(
                advertisingItem
              )}`}</Text>
              <Text
                style={styles.durationText}
              >{`${AdvertisingUtil.daysRemaining(advertisingItem)}`}</Text>
            </View>

            <Separator style={styles.seperator} />
            <Engagment id={advertisingItem.id} />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <ScrollViewApi
        identifier={id}
        requestFlags={requestFlags}
        data={advertisingItem}
        payload={{ id, creator_type: 'basic' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        style={AppStyles.container}
        requestAction={advertisingActions.requestGetAdvertisment}
        content={renderContent}
      />
      {!isMyAds && (
        <BottomButtonContainer style={AppStyles.spreadRow}>
          <AppButton
            onPress={() => AppUtil.call(AdvertisingUtil.phone(advertisingItem))}
            container={styles.btn}
            type={BUTTON_TYPE.GREEN_BORDER}
            title={strings('app.call_now')}
            image={Images.icons.phone}
          />
          <AppButton
            onPress={() =>
              AppUtil.openWebUrl(AdvertisingUtil.website(advertisingItem))
            }
            container={[styles.btn, styles.seperato2]}
            type={BUTTON_TYPE.GREEN_BORDER}
            title={strings('app.visit_website')}
            image={Images.icons.website}
          />
        </BottomButtonContainer>
      )}
    </>
  );
};

export default AdvertismentDetail;
